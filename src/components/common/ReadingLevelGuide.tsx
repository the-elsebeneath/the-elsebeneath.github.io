import React, { useState } from "react";

interface ReadingLevelGuideProps {
  emojiString: string;
  showFullGuideLink?: boolean;
  fullGuidePath?: string;
}

// Define the emoji mappings
const READING_LEVELS = {
  "🐣": {
    level: "Very Early (K–2)",
    description: "Simple sentences, great for read-alouds",
  },
  "🐥": {
    level: "Early (2–3)",
    description: "Independent readers, minimal complex vocab",
  },
  "🐦": {
    level: "Mid (3–5)",
    description: "Richer vocabulary, subtle emotional cues",
  },
  "🕊️": {
    level: "Grown-with-you (5+)",
    description: "Emotional nuance, good for kids & adults alike",
  },
  "🐉": {
    level: "Advanced/Adult",
    description: "Emotionally complex, layered meaning, poetic structure",
  },
};

const EMOTIONAL_THEMES = {
  "💫": "Wonder",
  "💔": "Grief",
  "🎭": "Identity",
  "🌀": "Growth",
  "🧶": "Connection",
  "🪞": "Introspection",
  "🌬️": "Lightness",
  "🗝️": "Discovery",
};

const ReadingLevelGuide: React.FC<ReadingLevelGuideProps> = ({
  emojiString,
  showFullGuideLink = true,
  fullGuidePath = "/reading-guide",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Parse the emoji string to find relevant items
  const parseEmojis = (str: string) => {
    const foundReadingLevel = Object.entries(READING_LEVELS).find(([emoji]) =>
      str.includes(emoji),
    );

    const foundThemes = Object.entries(EMOTIONAL_THEMES).filter(([emoji]) =>
      str.includes(emoji),
    );

    return {
      readingLevel: foundReadingLevel,
      themes: foundThemes,
    };
  };

  const { readingLevel, themes } = parseEmojis(emojiString);

  // If no recognized emojis, don't render anything
  if (!readingLevel && themes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {/* Display the emoji string prominently */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-lg" title="Reading Level & Themes">
          {emojiString}
        </span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-yellow-300 bg-yellow-300/20 px-2 py-1 rounded-full border border-yellow-300/30 cursor-pointer hover:bg-yellow-300/30 transition-all duration-200"
          title="Click to see what these emojis mean"
        >
          {isExpanded ? "Hide Guide" : "Reading Guide"}
        </button>
      </div>

      {/* Expandable explanation */}
      {isExpanded && (
        <div className="p-3 bg-black/40 rounded-lg border border-white/10 text-xs space-y-2 animate-in slide-in-from-top-1 duration-200">
          {/* Reading Level */}
          {readingLevel && (
            <div className="space-y-1">
              <p className="text-yellow-200 font-medium">Reading Level:</p>
              <div className="text-white/90 flex items-center gap-2">
                <span className="text-base">{readingLevel[0]}</span>
                <span>
                  {readingLevel[1].level}: {readingLevel[1].description}
                </span>
              </div>
            </div>
          )}

          {/* Emotional Themes */}
          {themes.length > 0 && (
            <div className="space-y-1">
              {readingLevel && (
                <div className="border-t border-white/20 pt-2" />
              )}
              <p className="text-blue-200 font-medium">
                {themes.length > 1 ? "Emotional Themes:" : "Emotional Theme:"}
              </p>
              <div className="grid grid-cols-1 gap-1 text-white/90">
                {themes.map(([emoji, meaning]) => (
                  <div key={emoji} className="flex items-center gap-2">
                    <span className="text-base">{emoji}</span>
                    <span>{meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Link to full guide */}
          {showFullGuideLink && (
            <div className="border-t border-white/20 pt-2">
              <a
                href={fullGuidePath}
                className="text-blue-300 hover:text-blue-200 transition-colors underline decoration-dotted"
              >
                📖 View complete emoji guide
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReadingLevelGuide;
