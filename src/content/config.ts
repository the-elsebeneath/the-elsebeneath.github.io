import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";
import { title } from "process";

// May also need to update /src/types/index.d.ts when updating this file
// When updating the set of searchable collections, update collectionList in /src/pages/search.astro

const searchable = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  autodescription: z.boolean().default(true),
  draft: z.boolean().default(false),
});

const social = z.object({
  discord: z.string().optional(),
  email: z.string().optional(),
  facebook: z.string().optional(),
  github: z.string().optional(),
  instagram: z.string().optional(),
  linkedIn: z.string().optional(),
  pinterest: z.string().optional(),
  tiktok: z.string().optional(),
  website: z.string().optional(),
  youtube: z.string().optional(),
});

const about = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/about" }),
  schema: ({ image }) =>
    searchable.extend({
      image: image().optional(),
      imageAlt: z.string().default(""),
    }),
});

const authors = defineCollection({
  loader: glob({
    pattern: "**\/[^_]*.{md,mdx}",
    base: "./src/content/authors",
  }),
  schema: ({ image }) =>
    searchable.extend({
      email: z.string().optional(),
      image: image().optional(),
      imageAlt: z.string().default(""),
      social: social.optional(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**\/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    searchable.extend({
      date: z.date().optional(),
      image: image().optional(),
      imageAlt: z.string().default(""),
      author: reference("authors").optional(),
      categories: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
      complexity: z.number().default(1),
      hideToc: z.boolean().default(false),
    }),
});

const docs = defineCollection({
  loader: glob({ pattern: "**\/[^_]*.{md,mdx}", base: "./src/content/docs" }),
  schema: ({ image }) =>
    searchable.extend({
      pubDate: z.date().optional(),
      modDate: z.date().optional(),
      image: image().optional(),
      imageAlt: z.string().default(""),
      hideToc: z.boolean().default(false),
      hideNav: z.boolean().default(false),
    }),
});

const home = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/home" }),
  schema: ({ image }) =>
    z.object({
      image: image().optional(),
      imageAlt: z.string().default(""),
      title: z.string(),
      content: z.string(),
      buttons: z
        .array(
          z.object({
            label: z.string(),
            link: z.string().optional(),
          }),
        )
        .optional(),
    }),
});

const indexCards = defineCollection({
  loader: glob({
    pattern: "-index.{md,mdx}",
    base: "./src/content/index-cards",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cards: z.array(z.string()),
  }),
});

const poetry = defineCollection({
  loader: glob({ pattern: "**\/[^_]*.{md,mdx}", base: "./src/content/poetry" }),
  schema: ({ image }) =>
    searchable.extend({
      date: z.date().optional(),
      image: image().optional(),
      imageAlt: z.string().default(""),
      author: reference("authors").optional(),
    }),
});

const story = defineCollection({
  loader: glob({ pattern: "**\/[^_]*.{md,mdx}", base: "./src/content/story" }),
  schema: ({ image }) =>
    searchable.extend({
      title: z.string(),
      name: z.string(),
      description: z.string(),
      cover: image(),
      coverAlt: z.string().default(""),
      audio: z.string().url().optional(),
      readingTime: z.string().optional(),
      order: z.number(),
    }),
});

const portfolio = defineCollection({
  loader: glob({
    pattern: "-index.{md,mdx}",
    base: "./src/content/portfolio",
  }),
  schema: searchable.extend({
    projects: z.array(
      z.object({
        title: z.string(),
        github: z.string().optional(),
        technologies: z.array(z.string()).optional(),
        content: z.array(z.string()).optional(),
      }),
    ),
  }),
});

const books = defineCollection({
  loader: glob({
    pattern: "**\/[^_]*.{md,mdx}",
    base: "./src/content/books",
  }),
  schema: ({ image }) =>
    searchable.extend({
      order: z.number().optional(),
      id: z.string().optional(),
      slug: z.string().optional(),
      title: z.string(),
      description: z.string().optional(),
      image: image().optional(),
      imageAlt: z.string().default(""),
      author: reference("authors").optional(),
      readLink: z.string().optional(),
      hidden: z.boolean().default(false),
      featured: z.boolean().default(false),
      readingLevel: z
        .object({
          description: z.string().optional(),
          guide: z.string().optional(),
        })
        .optional(),
    }),
});

const educators = defineCollection({
  loader: glob({
    pattern: "**\/[^_]*.{md,mdx}",
    base: "./src/content/educators",
  }),
  schema: ({ image }) =>
    searchable.extend({
      title: z.string(),
      description: z.string().optional(),
      guideImage: image().optional(),
      heroImage: image().optional(),
    }),
});

const compass = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/compass",
  }),
  schema: z.record(
    z.string(),
    z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        slug: z.string(),
      }),
    ),
  ),
});

const terms = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/terms" }),
  schema: searchable,
});

const characters = defineCollection({
  loader: glob({
    pattern: "**\/[^_]*.{md,mdx}",
    base: "./src/content/characters",
  }),
  schema: ({ image }) =>
    searchable.extend({
      // Basic Character Info
      order: z.number().optional(),
      id: z.string().optional(),
      slug: z.string().optional(),
      name: z.string(),
      description: z.string().optional(),

      // Visual representation
      portrait: z.string().default("✨"), // Emoji or character representation
      portraitImage: image().optional(), // Optional actual image
      portraitImageAlt: z.string().default(""),

      // Core Character Identity
      origin: z.string(), // "The Keeper of Lost Things"

      // Essential Nature (Symbolic Inventory)
      strength: z.string(), // "Quiet Resilience"
      struggle: z.string(), // "Fear of Abandonment"

      // Silent Companion Object
      silentCompanion: z.object({
        name: z.string(),
        description: z.string(),
        icon: z.string().optional().default("✨"),
        // Optional: reference to a companions collection if you want separate companion entries
        companionRef: reference("companions").optional(),
      }),

      // Emotional Archaeology Fields
      originMoment: z.string(), // "Finding a letter never sent"
      whisperedTruth: z.string(), // "I'm afraid of being forgotten"
      whatTheyTaught: z.string(), // "That small gestures matter"
      echoesLeftBehind: z.string(), // "Organized spaces, thoughtful notes"
      emotionalElement: z.string(), // "Paper"

      // Optional extended character info
      backstory: z.string().optional(),
      relationships: z
        .array(
          z.object({
            characterRef: reference("characters"),
            relationshipType: z.string(), // "friend", "mentor", "rival", etc.
            description: z.string().optional(),
          }),
        )
        .optional(),

      // Story connections
      appearsIn: z.array(reference("books")).optional(),
      featuredIn: z.array(reference("books")).optional(),

      // Character development over time
      characterArc: z
        .object({
          startingPoint: z.string().optional(),
          growthMoments: z.array(z.string()).optional(),
          currentState: z.string().optional(),
        })
        .optional(),

      // Administrative fields (following your books pattern)
      author: reference("authors").optional(), // Creator of the character
      hidden: z.boolean().default(false),
      featured: z.boolean().default(false),

      // Character-specific metadata
      characterType: z
        .enum([
          "protagonist",
          "deuteragonist",
          "supporting",
          "mentor",
          "guide",
          "catalyst",
        ])
        .optional(),
      personalityArchetype: z.string().optional(), // "The Caregiver", "The Explorer", etc.

      // Optional reading level if character appears in specific age-targeted stories
      readingLevel: z
        .object({
          description: z.string().optional(),
          guide: z.string().optional(),
        })
        .optional(),

      // Links to external character resources
      characterSheetLink: z.string().url().optional(),
      inspirationSources: z.array(z.string()).optional(),
    }),
});

// Optional: Separate companions collection if you want detailed companion entries
const companions = defineCollection({
  loader: glob({
    pattern: "**\/[^_]*.{md,mdx}",
    base: "./src/content/companions",
  }),
  schema: ({ image }) =>
    searchable.extend({
      order: z.number().optional(),
      id: z.string().optional(),
      slug: z.string().optional(),
      name: z.string(),
      description: z.string(),

      // Visual representation
      icon: z.string().default("✨"),
      image: image().optional(),
      imageAlt: z.string().default(""),

      // Companion properties
      companionType: z
        .enum(["object", "spirit", "memory", "concept", "element"])
        .optional(),
      symbolicMeaning: z.string(),
      originStory: z.string().optional(),
      powers: z.array(z.string()).optional(),

      // Which characters this companion is associated with
      boundTo: z.array(reference("characters")),

      // Story significance
      appearsIn: z.array(reference("books")).optional(),
      significantMoments: z.array(z.string()).optional(),

      // Administrative
      author: reference("authors").optional(),
      hidden: z.boolean().default(false),
      featured: z.boolean().default(false),
    }),
});

// Export collections
export const collections = {
  about,
  authors,
  blog,
  docs,
  home,
  indexCards,
  poetry,
  story,
  portfolio,
  books,
  terms,
  educators,
  compass,
  characters,
  companions,
};
