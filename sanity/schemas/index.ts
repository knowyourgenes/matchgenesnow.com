import type { SchemaTypeDefinition } from "sanity";
import { editorsPick } from "./editorsPick";
import { homepage } from "./homepage";
import { roundupItem } from "./roundupItem";
import { sectionChip } from "./sectionChip";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, sectionChip, roundupItem, editorsPick],
};
