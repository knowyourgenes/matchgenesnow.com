/**
 * Push seed-data.ts into the configured Sanity dataset.
 *
 * Required env vars (in .env.local or .env):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN     (Editor permissions)
 *
 * Run:  pnpm seed
 */

import { createClient } from "@sanity/client";
import { editorsPicks, homepageContent, roundupItems, sectionChips } from "./seed-data";

function loadDotEnv() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path");
    const candidates = [".env.local", ".env"];
    for (const file of candidates) {
      const p = path.join(process.cwd(), file);
      if (!fs.existsSync(p)) continue;
      const lines = fs.readFileSync(p, "utf8").split(/\r?\n/);
      for (const raw of lines) {
        const line = raw.trim();
        if (!line || line.startsWith("#")) continue;
        const eq = line.indexOf("=");
        if (eq === -1) continue;
        const key = line.slice(0, eq).trim();
        let val = line.slice(eq + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
      }
    }
  } catch {
    // best-effort
  }
}

loadDotEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

function paragraphsToBlocks(paragraphs: string[]) {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `b${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${i}`, text, marks: [] }],
  }));
}

async function run() {
  console.log(`Seeding project=${projectId} dataset=${dataset}`);

  // Drop existing roundupItem + editorsPick docs so renamed slugs don't linger.
  const oldRoundupIds = await client.fetch<string[]>(`*[_type == "roundupItem"]._id`);
  const oldPickIds = await client.fetch<string[]>(`*[_type == "editorsPick"]._id`);
  if (oldRoundupIds.length > 0) {
    console.log(`Deleting ${oldRoundupIds.length} existing roundupItem docs.`);
  }
  if (oldPickIds.length > 0) {
    console.log(`Deleting ${oldPickIds.length} existing editorsPick docs.`);
  }

  const tx = client.transaction();
  for (const id of oldRoundupIds) tx.delete(id);
  for (const id of oldPickIds) tx.delete(id);

  // Homepage singleton
  tx.createOrReplace({
    _id: "homepage.singleton",
    _type: "homepage",
    ...homepageContent,
  });

  // Section chips
  for (const c of sectionChips) {
    tx.createOrReplace({
      _id: `sectionChip.${c.slug}`,
      _type: "sectionChip",
      label: c.label,
      slug: { _type: "slug", current: c.slug },
      category: c.category,
      order: c.order,
    });
  }

  // Roundup items
  for (const r of roundupItems) {
    tx.createOrReplace({
      _id: `roundupItem.${r.slug}`,
      _type: "roundupItem",
      title: r.title,
      slug: { _type: "slug", current: r.slug },
      summary: r.summary,
      whyItMatters: r.whyItMatters,
      sourceNote: r.sourceNote,
      sourceUrl: r.sourceUrl,
      category: r.category,
      week: r.week,
      publishedAt: r.publishedAt,
      order: r.order,
    });
  }

  // Editor's picks
  for (const p of editorsPicks) {
    tx.createOrReplace({
      _id: `editorsPick.${p.slug}`,
      _type: "editorsPick",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      deck: p.deck,
      body: paragraphsToBlocks(p.body),
      sources: p.sources,
      week: p.week,
      publishedAt: p.publishedAt,
    });
  }

  const result = await tx.commit();
  console.log(`Seeded ${result.results.length} documents.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
