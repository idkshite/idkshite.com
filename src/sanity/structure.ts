import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons";

// Document types edited as a single fixed document rather than a growable list.
export const SINGLETONS = [
  { id: "siteSettings", title: "Site Settings", icon: CogIcon },
];

const singletonIds = SINGLETONS.map((s) => s.id);

// Pins each singleton to its fixed documentId, then lists everything else as
// normal type-listings.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map((s) =>
        S.listItem()
          .id(s.id)
          .title(s.title)
          .icon(s.icon)
          .child(S.document().schemaType(s.id).documentId(s.id))
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !singletonIds.includes(item.getId() as string)
      ),
    ]);
