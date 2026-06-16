// Arc definitions for the Books page. Each book's frontmatter `arc` field
// matches one of the `key` values below. Books with no `arc` fall through to
// the final arc so nothing ever disappears from the page.

export type ArcKey = "sam-arc" | "voicekeeper" | "interludes";

export interface ArcPlaceholder {
  title: string;
  description: string;
}

export interface Arc {
  key: ArcKey;
  /** anchor id used for in-page jump links */
  id: string;
  title: string;
  tagline: string;
  /** optional "coming soon" entries shown after the real books in this arc */
  placeholders?: ArcPlaceholder[];
}

export const arcs: Arc[] = [
  {
    key: "sam-arc",
    id: "almost-still-mastery",
    title: "Almost, Still, Mastery",
    tagline: "The first Sam arc.",
  },
  {
    key: "voicekeeper",
    id: "voicekeeper-cycle",
    title: "The Voicekeeper Cycle",
    tagline: "The deeper mythos — Village, Archive, and Elsebranches.",
    placeholders: [
      {
        title: "The Elsebranches",
        description:
          "A new turn of the cycle, still taking root. Coming soon.",
      },
    ],
  },
  {
    key: "interludes",
    id: "interludes-elsewheres",
    title: "Interludes & Elsewheres",
    tagline: "Small stories, side paths, and experiments.",
  },
];

/** Arc that catches any book whose `arc` field is missing or unrecognized. */
export const fallbackArcKey: ArcKey = "interludes";
