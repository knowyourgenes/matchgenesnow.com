// Source of truth for the seed script (pnpm seed). Every entry is drawn from
// content.pdf - SITE 02 (matchgenesnow.com).

export type SeedHomepage = {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubhead: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  trustStrip: string[];
  howThisWorksTitle: string;
  howThisWorksBody: string;
  newsletterTitle: string;
  newsletterBody: string;
  newsletterSmallprint: string;
  footerMission: string;
};

export type SeedChip = {
  slug: string;
  label: string;
  category: string;
  order: number;
};

export type SeedRoundupItem = {
  slug: string;
  title: string;
  summary: string;
  whyItMatters: string;
  sourceNote: string;
  sourceUrl?: string;
  category: string;
  week: string;
  publishedAt: string;
  order: number;
};

export type SeedEditorsPick = {
  slug: string;
  title: string;
  deck: string;
  body: string[];
  sources: string[];
  week: string;
  publishedAt: string;
};

// Anchor week 0 ("this-week") at a stable date so re-seeds are idempotent.
// Tweak `WEEKS_BACK_FROM_NOW` to roll the archive forward later.
const THIS_WEEK_DATE = "2026-05-29T07:00:00.000Z"; // Friday 29 May 2026 07:00 UTC

function weeksAgo(n: number): string {
  const t = Date.parse(THIS_WEEK_DATE) - n * 7 * 24 * 60 * 60 * 1000;
  return new Date(t).toISOString();
}

export const homepageContent: SeedHomepage = {
  heroEyebrow: "Updated every week. Genetics news, made readable.",
  heroHeadline: "What's new in genetic science this week.",
  heroSubhead:
    "Plain-language summaries of the latest research in genetics, wellness, and preventive health - with the India angle that global science coverage usually misses. New roundup every Friday. One deeper read every week. A growing archive of everything we've covered.",
  heroPrimaryCta: "Read this week's roundup",
  heroSecondaryCta: "Get the weekly briefing by email",
  trustStrip: [
    "Every claim linked to its source",
    "No hype, no miracle cures",
    "India-aware",
    "Free, always",
  ],
  howThisWorksTitle: "How this works",
  howThisWorksBody:
    "We read the week's genetics research, regulatory news, and major science journalism, then summarise the handful of items worth your time. Each gets a plain-language explanation and a link to the original. Once a week, one story gets a deeper treatment. Everything is archived by date so you can trace how a question evolved.",
  newsletterTitle: "The week in genetics, every Friday.",
  newsletterBody:
    "Five to seven items, one deeper read, five minutes total. Plus a short note whenever new science changes an answer we gave before.",
  newsletterSmallprint: "No ads. No selling. Unsubscribe anytime.",
  footerMission:
    "A weekly, plain-language record of genetic science as it happens - sourced, India-aware, free for everyone.",
};

export const sectionChips: SeedChip[] = [
  { slug: "this-week", label: "This week", category: "this-week", order: 1 },
  { slug: "research", label: "Research", category: "research", order: 2 },
  { slug: "india-focus", label: "India focus", category: "india-focus", order: 3 },
  { slug: "explainers", label: "Explainers", category: "explainers", order: 4 },
  {
    slug: "policy-ethics",
    label: "Policy & ethics",
    category: "policy-ethics",
    order: 5,
  },
  { slug: "tools-tests", label: "Tools & tests", category: "tools-tests", order: 6 },
  { slug: "archive", label: "Archive", category: "archive", order: 7 },
];

export const roundupItems: SeedRoundupItem[] = [
  {
    slug: "genome-india-project-next-milestone",
    title:
      "Genome India project crosses its next milestone in cataloguing Indian genetic diversity",
    summary:
      "The national effort to map the genetic variation of India's many populations continues to expand its reference database, addressing decades of underrepresentation in global genomics.",
    whyItMatters:
      "Most genetic risk scores and wellness tests were calibrated on European data. As Indian reference data grows, those tools become far more accurate for Indian bodies - which is the difference between a result that applies to you and one that does not.",
    sourceNote:
      "Genome India project / IBDC Faridabad official updates - verify latest sample count and date",
    category: "india-focus",
    week: "this-week",
    publishedAt: weeksAgo(0),
    order: 1,
  },
  {
    slug: "lactose-tolerance-south-asia-analysis",
    title: "New analysis sharpens how lactose tolerance varies across South Asian populations",
    summary:
      "Researchers report refined estimates of how few South Asian adults carry the lactase-persistence variant, with meaningful regional variation across the subcontinent.",
    whyItMatters:
      "It reframes everyday advice. If most adults in a population do not retain the milk-digesting enzyme, blanket 'milk is healthy' messaging needs a regional rewrite - fermented dairy first, smaller portions, individual testing where it matters.",
    sourceNote:
      "Recent South Asian genome analyses (e.g. bioRxiv preprints) - confirm publication, sample size, and figures",
    category: "research",
    week: "this-week",
    publishedAt: weeksAgo(0),
    order: 2,
  },
  {
    slug: "polygenic-risk-scores-promise-and-limits",
    title: "Polygenic risk scores show promise - and clear limits - for predicting common disease",
    summary:
      "Fresh reviews find that scores summing thousands of small genetic effects can flag above-average risk for conditions like diabetes and heart disease, but remain weak predictors for any single individual.",
    whyItMatters:
      "It sets honest expectations. A high score is a reason to pay attention and act on lifestyle, not a diagnosis. Knowing the limit protects readers from both false alarm and false comfort.",
    sourceNote:
      "Recent peer-reviewed reviews on polygenic risk scores - verify journal, year, and specific claims",
    category: "research",
    week: "this-week",
    publishedAt: weeksAgo(0),
    order: 3,
  },
  {
    slug: "pharmacogenomics-mainstream-prescribing",
    title: "Pharmacogenomics edges further into mainstream prescribing abroad",
    summary:
      "More health systems are testing genes that govern drug response before starting certain psychiatric, cardiac, and pain medications, reducing months of trial and error.",
    whyItMatters:
      "India lags here. The same testing that is becoming routine elsewhere is rarely offered locally, even though variants affecting common drugs are well documented. It is a gap with a clear, affordable fix.",
    sourceNote:
      "International pharmacogenomics implementation reports - verify specifics and any India data",
    category: "tools-tests",
    week: "this-week",
    publishedAt: weeksAgo(0),
    order: 4,
  },
  {
    slug: "dpdp-act-genetic-data-handling",
    title: "India's data protection framework continues to shape how genetic data must be handled",
    summary:
      "Implementation of the Digital Personal Data Protection Act keeps clarifying obligations for companies that process sensitive personal data, including genetic information.",
    whyItMatters:
      "Your DNA is the most personal data you generate. How it is stored, who can access it, and your right to delete it all hinge on this evolving framework. Readers considering a test should track it.",
    sourceNote:
      "DPDP Act 2023 implementation updates - verify current status and any genetic-data specifics",
    category: "policy-ethics",
    week: "this-week",
    publishedAt: weeksAgo(0),
    order: 5,
  },
  {
    slug: "ancient-dna-rewriting-india-ancestry",
    title: "Ancient-DNA research keeps rewriting the story of who Indians descend from",
    summary:
      "Ongoing work on ancestral North and South Indian components, drawing on ancient genomes, continues to add nuance to a long-contested history of migration and mixing.",
    whyItMatters:
      "It replaces loaded colonial-era categories with evidence. Almost every modern Indian is a continuous blend rather than a clean type - a finding that quietly corrects a lot of inherited assumptions.",
    sourceNote:
      "Ancient-DNA studies (e.g. David Reich lab and collaborators) - verify latest papers and claims",
    category: "research",
    week: "this-week",
    publishedAt: weeksAgo(0),
    order: 6,
  },
];

export const editorsPicks: SeedEditorsPick[] = [
  {
    slug: "standard-health-ranges-south-asian-bodies",
    title: "Why 'standard' health ranges may not fit the body in front of them",
    deck: "Plain-language genetics news, with the India angle global coverage usually misses. A quiet assumption sits underneath most routine health advice: that the reference ranges, the risk calculators, and the dietary guidelines printed in clinics apply equally to everyone reading them. A steadily growing body of research keeps puncturing that assumption.",
    body: [
      "A quiet assumption sits underneath most routine health advice: that the reference ranges, the risk calculators, and the dietary guidelines printed in clinics apply equally to everyone reading them. A steadily growing body of research keeps puncturing that assumption, and the people most affected are often the very ones the original tools were never built around in the first place.",
      "The story",
      "Many of the medical reference points used worldwide, from cardiovascular risk calculators to body-weight thresholds, were developed and validated largely on European-ancestry populations. When those same tools are applied unchanged to South Asian bodies, they can misjudge risk, and sometimes they misjudge it badly. Research has consistently shown, for example, that South Asians tend to develop cardiovascular disease and type 2 diabetes earlier, and at lower body weights, than the populations many standard thresholds were calibrated on. The tool gives a confident answer. The answer is just calibrated for a different body.",
      "Why it matters",
      "This is the difference between a result that genuinely applies to you and one that quietly does not, dressed up in the same official-looking number. A South Asian adult sitting comfortably at a 'normal' body-weight figure on a Western-derived chart may already be carrying the visceral fat pattern that drives metabolic risk in this population, the so-called thin-fat phenotype, where the weight looks fine but the fat is stored in the places that cause the most harm. A standard cardiovascular risk calculator may reassure someone whose real risk is arriving a full decade ahead of the schedule the calculator assumes. The tool is not broken. It was simply built for a different reference body, and used outside that context, a confident number can mislead more effectively than no number at all.",
      "The same logic runs straight through consumer genetics. Polygenic risk scores and many direct-to-consumer DNA tests were trained predominantly on European data, which means their accuracy drops when they are applied to underrepresented populations, including Indians. A risk estimate calibrated on the wrong reference group is not a precise verdict. It is, at best, an educated guess wearing a very confident decimal point. Reading it as gospel is exactly the mistake the science is warning against.",
      "The shift underway",
      "This is precisely why national efforts to catalogue Indian genetic diversity matter so much, and why this newsroom keeps returning to them. As Indian reference data grows, the tools built on it become measurably more accurate for Indian bodies, which is the entire point of the exercise. The correct response to a tool built on the wrong population is not to throw it away, but to rebuild it on the right one, and that rebuilding is actively happening across genomics right now. The gap is real, it is documented, and it is slowly closing rather than being ignored.",
      "What a reader should take from this",
      "Two practical things, and they are both things you can act on. First, if you are South Asian, it can be entirely reasonable to ask your doctor whether a particular threshold or risk score was validated for your population, and whether earlier or additional screening makes sense given the well-documented earlier onset of metabolic and cardiac conditions in South Asians. That is not being difficult. That is asking the tool to show its working. Second, treat any genetic risk result with appropriate humility about which reference data sits behind it. A number is only ever as trustworthy as the population it was calibrated on, and right now, for a great many tools, that population was not yours.",
      "The honest summary is this: the standard ranges are a starting point for a conversation, not a personalised verdict handed down from on high, and for a very large part of the world's population they were always a rough fit at best. The science is slowly correcting that imbalance, one reference database at a time, and that correction is one of the most quietly important stories in genetics today.",
      "Quick FAQ",
      "Are Western health ranges simply wrong for Indians? Not wrong, but often miscalibrated. Several thresholds were validated on other populations and can misjudge risk when applied unchanged.",
      "Should South Asians get screened earlier? Many specialists argue yes for metabolic and cardiac risk, given the documented earlier onset. Discuss appropriate timing with your doctor.",
      "Do consumer DNA tests work less well for Indians? Often, yes, because the reference databases skewed heavily European. Accuracy is steadily improving as Indian genomic data grows.",
      "What can I actually do about this now? Ask whether a threshold was validated for your population, consider earlier screening, and read genetic risk results with healthy caution.",
      "Every claim linked to its source · No hype, no miracle cures · India-aware · Free, always",
    ],
    sources: [
      "Research on South Asian cardiovascular and diabetes onset",
      "Reviews of polygenic risk score performance across ancestries",
      "Coverage of national genomic diversity initiatives",
    ],
    week: "this-week",
    publishedAt: weeksAgo(0),
  },
  {
    slug: "why-your-genetic-test-result-can-change",
    title: "Why your genetic test result can change without your DNA changing",
    deck: "A reader wrote in confused. Three years ago their ancestry report said one thing. This year, same saliva, same company, it says something noticeably different. Did the lab make a mistake? Did their DNA somehow change? Neither. What changed was everything around the DNA.",
    body: [
      "Genetic results are not direct readings of fixed facts. They are interpretations, and interpretation depends on two things that keep moving: the reference data a result is compared against, and the science used to make sense of it.",
      "The reference panel keeps growing",
      "Ancestry and risk estimates work by comparing your DNA to large databases of people whose backgrounds are known. When those databases were dominated by people of European descent, a South Asian reader might simply have been told 'South Asian' with little detail. As more people from underrepresented regions contribute their data, the comparison gets finer. The same DNA that once read as a broad region can now resolve into something far more specific. Your ancestry did not change. The map you are being placed on did.",
      "This is why South Asian readers, in particular, are seeing the biggest shifts right now. The gap in representation is closing, and refinement is the visible result.",
      "The science behind the score moves too",
      "Disease-risk estimates change for a different reason: researchers keep discovering which variants matter and by how much. A risk score built on what was known in 2021 can be revised as new studies land. A variant once flagged as concerning can be downgraded; a quiet one can turn out to matter. Responsible companies publish change logs when they update their models. It is worth reading them.",
      "What to take from this",
      "Two things. First, treat any single genetic result as a snapshot with a confidence range, not a verdict carved in stone. The honest reports show that range; look for it. Second, this is a feature, not a flaw. A result that improves as the science improves is a result you can trust more over time, not less. The discomfort of a changed number is the price of a field that is still, rapidly, getting better at reading us.",
    ],
    sources: [
      "Company reference-panel change logs",
      "Reviews on polygenic risk score calibration across ancestries",
      "Coverage of South Asian representation in genomic databases",
    ],
    week: "last-week",
    publishedAt: weeksAgo(1),
  },
  {
    slug: "caffeine-genes-and-the-afternoon-coffee-question",
    title: "Caffeine genes and the afternoon coffee question, explained",
    deck: "Half of all adults clear caffeine slowly, and for them a 2pm coffee is still circulating at midnight. The CYP1A2 gene decides which half you fall into - and the implication runs deeper than sleep.",
    body: [
      "Caffeine sensitivity is one of the most well-studied gene-environment interactions in everyday wellness. Two enzymes do most of the work. CYP1A2 metabolises caffeine in the liver; ADORA2A controls how strongly your brain feels it. The combination of variants you carry decides whether a single cup energises you or leaves you wired for hours.",
      "The CYP1A2 split",
      "Roughly half of adults carry the slow-metaboliser variant. For them, caffeine has a half-life closer to 8-10 hours instead of the textbook 4-5. A 2pm coffee can still measurably affect sleep architecture at midnight - even if you fall asleep on time, the deep-sleep windows shorten.",
      "What's less appreciated is the cardiovascular angle. Older studies linked the slow variant to elevated heart-attack risk in heavy coffee drinkers, although the effect size is debated and large recent cohorts have called some of it into question.",
      "ADORA2A and the anxiety angle",
      "Even fast metabolisers can be sensitive. ADORA2A variants change how the brain's adenosine receptors respond, which is why some people get jittery and anxious on doses that barely register for friends. This is the variant that explains the 'I had one coffee and felt my heart race' experience.",
      "Practical takeaways",
      "If afternoon coffee reliably ruins your sleep, that is your wiring telling you something useful. The fix is rarely cutting coffee entirely - it is moving caffeine before noon and reducing total daily dose. For the anxiety-prone, smaller cups and matcha or green tea often deliver the lift without the spike.",
    ],
    sources: [
      "CYP1A2 caffeine metabolism studies",
      "ADORA2A and caffeine sensitivity",
      "Caffeine and sleep architecture meta-analyses",
    ],
    week: "2-weeks-ago",
    publishedAt: weeksAgo(2),
  },
  {
    slug: "what-the-dpdp-act-means-for-your-dna-data",
    title: "What the DPDP Act means for your DNA data",
    deck: "India's Digital Personal Data Protection Act treats genetic information as sensitive personal data. The detail of how that protection works in practice is still being filled in - and it matters for anyone considering a consumer DNA test.",
    body: [
      "Genetic data is, in many ways, the most permanent form of personal information you generate. It cannot be revoked, it identifies you uniquely, and a fragment shared by a relative implicates you too. The DPDP Act, passed in 2023, recognises genetic data as a category requiring heightened consent and stricter handling.",
      "What the Act says",
      "Companies that collect genetic data must obtain clear, informed consent before processing it. They must store it securely, limit retention to what is necessary, and honour deletion requests. The fines for non-compliance are substantial enough to change behaviour, particularly for smaller direct-to-consumer testing companies.",
      "Where the gaps remain",
      "The bigger questions are still being clarified through implementation rules. What happens when a relative's test reveals information about you? How does deletion work when raw data has already been shared with research partners? Does anonymisation actually anonymise in the genetic context? These are live questions, and the answers will shape what 'taking a DNA test in India' means over the next five years.",
      "What readers should do",
      "Before testing, read the company's data policy specifically. Look for: where data is stored, who has access, retention period, what happens to your sample after analysis, and the deletion process. Companies serious about Indian compliance will surface these clearly. The ones that bury them in legal boilerplate are usually the ones to avoid.",
    ],
    sources: [
      "DPDP Act 2023 text and explanatory notes",
      "Commentary on genetic-data provisions",
      "Comparative analyses with GDPR special-category rules",
    ],
    week: "3-weeks-ago",
    publishedAt: weeksAgo(3),
  },
  {
    slug: "south-asian-heart-risk-decade-early",
    title: "South Asian heart risk: why it arrives a decade early",
    deck: "Heart disease in South Asians presents earlier, hits at lower body weights, and progresses faster than in most other populations. The genetics, the diet, and the metabolism each contribute - and the action items are clearer than the conversation usually admits.",
    body: [
      "A 45-year-old of South Asian descent has roughly the same cardiovascular risk profile as a 55-year-old of European descent at comparable BMI. The shift is well documented but rarely shows up in screening guidelines that were calibrated on the European reference population.",
      "What's behind the gap",
      "Three things stack. South Asians carry a higher burden of variants associated with insulin resistance and atherogenic lipid profiles - lower HDL, higher small-particle LDL, elevated ApoB. The body composition is also different at any given BMI, with more visceral and ectopic fat than the same BMI in other populations. And the dietary pattern - high in refined carbohydrates relative to fibre - amplifies both effects.",
      "Why screening misses it",
      "The standard cardiovascular risk calculators (Framingham, ASCVD) underestimate risk in South Asians by 25-40% in most validation studies. A 'low risk' reading from one of those calculators in a 45-year-old South Asian male means substantially more than the number suggests. Indian-calibrated risk tools exist but are not yet routinely used.",
      "What to actually do",
      "Start screening earlier - HbA1c, ApoB, lipoprotein(a), fasting insulin - from the late 30s rather than the 50s. Pay particular attention to ApoB and lipoprotein(a), both of which are increasingly recognised as better predictors than the standard LDL panel. And take family history seriously: if a parent had a cardiac event before 55, the genetic loading is real, and prevention starts earlier than the textbook recommends.",
    ],
    sources: [
      "INTERHEART South Asia substudies",
      "BiB and UK Biobank South Asian cohort analyses",
      "Indian Heart Association screening guidance",
    ],
    week: "4-weeks-ago",
    publishedAt: weeksAgo(4),
  },
];
