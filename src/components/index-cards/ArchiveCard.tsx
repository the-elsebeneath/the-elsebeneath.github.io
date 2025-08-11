import React, { useState } from "react";

// Theme configurations
const themes = {
  amber: {
    frontBg: "bg-gradient-to-br from-amber-50 to-amber-100",
    frontBorder: "border-amber-200",
    frontText: "text-amber-700",
    frontAccent: "text-amber-600",
    frontLines: "bg-amber-300",
    frontIcon: "bg-amber-200/30",
    frontInnerIcon: "bg-amber-300/50",
    frontDot: "bg-amber-500",
    backBg: "bg-gradient-to-br from-slate-50 to-slate-100",
    backBorder: "border-slate-200",
    backText: "text-slate-700",
    backAccent: "text-slate-500",
    backLines: "bg-slate-400",
    ambientRevealed: "bg-slate-400/10",
    ambientDefault: "bg-amber-400/10",
  },
  slate: {
    frontBg: "bg-gradient-to-br from-slate-50 to-slate-100",
    frontBorder: "border-slate-200",
    frontText: "text-slate-700",
    frontAccent: "text-slate-600",
    frontLines: "bg-slate-300",
    frontIcon: "bg-slate-200/30",
    frontInnerIcon: "bg-slate-300/50",
    frontDot: "bg-slate-500",
    backBg: "bg-gradient-to-br from-amber-50 to-amber-100",
    backBorder: "border-amber-200",
    backText: "text-amber-700",
    backAccent: "text-amber-600",
    backLines: "bg-amber-400",
    ambientRevealed: "bg-amber-400/10",
    ambientDefault: "bg-slate-400/10",
  },
};

export type Theme = keyof typeof themes;

// Size configurations
const sizeConfig = {
  small: {
    card: "w-64 h-40",
    text: "text-sm",
    messageText: "text-sm",
    padding: "p-4",
    icon: "w-12 h-12",
    innerIcon: "w-6 h-6",
    dot: "w-1.5 h-1.5",
    titleText: "text-xs",
    instructionText: "text-xs",
  },
  medium: {
    card: "w-80 h-56",
    text: "text-sm",
    messageText: "text-base",
    padding: "p-6",
    icon: "w-16 h-16",
    innerIcon: "w-8 h-8",
    dot: "w-2 h-2",
    titleText: "text-sm",
    instructionText: "text-sm",
  },
  large: {
    card: "w-96 h-72",
    text: "text-base",
    messageText: "text-lg",
    padding: "p-8",
    icon: "w-20 h-20",
    innerIcon: "w-10 h-10",
    dot: "w-2.5 h-2.5",
    titleText: "text-base",
    instructionText: "text-base",
  },
};

export type Size = keyof typeof sizeConfig;

export const ArchiveCard = ({
  className = "",
  size = "medium", // "small", "medium", "large"
  showTitle = false,
  showInstructions = false,
  customMessages = null,
  theme = "amber", // "amber", "slate", "custom"
}: {
  className?: string;
  size?: Size;
  showTitle?: boolean;
  showInstructions?: boolean;
  customMessages?: string[] | null;
  theme?: Theme;
}) => {
  const [revealed, setRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const defaultMessages = [
    "The way you held the cup that last morning, like it might remember your warmth.",
    "I wanted to tell you the moon looked different after you left.",
    "Your laugh echoed in the hallway for weeks. I kept listening for it.",
    "The words I practiced in the mirror but never said at dinner.",
    "How the silence changed shape when you weren't there to fill it.",
    "I saved your favorite song for days when missing you felt like music.",
    "The apology I wrote seventeen times but never sent.",
    "You would have loved the way the snow fell that Tuesday.",
    "I still set the table for two sometimes, just in case.",
    "The story I meant to tell you about the cat who waited by windows.",
  ];

  const messages = customMessages || defaultMessages;
  const [message, setMessage] = useState(
    () => messages[Math.floor(Math.random() * messages.length)],
  );

  const config = sizeConfig[size as Size] || sizeConfig.medium;
  const currentTheme = themes[theme as Theme] || themes.amber;

  const handleReveal = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setRevealed(true);
      setIsAnimating(false);
    }, 300);
  };

  const handleReset = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setRevealed(false);
      setIsAnimating(false);
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 300);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Optional title */}
      {showTitle && (
        <div className="text-center mb-6">
          <p
            className={`${currentTheme.frontText} ${config.titleText} opacity-60 italic`}
          >
            "For what you almost said"
          </p>
        </div>
      )}

      {/* Card container */}
      <div className="relative perspective-1000">
        <div
          className={`
            relative ${config.card} cursor-pointer transition-all duration-700 ease-out transform-style-preserve-3d
            ${revealed ? "rotate-y-180" : ""}
            ${isAnimating ? "scale-105" : "hover:scale-102"}
          `}
          onClick={revealed ? handleReset : handleReveal}
        >
          {/* Card Front */}
          <div
            className={`
              absolute inset-0 backface-hidden rounded-lg transition-all duration-500
              ${currentTheme.frontBg} ${currentTheme.frontBorder} border shadow-2xl
              ${isAnimating ? "shadow-amber-200/20" : ""}
            `}
          >
            {/* Card texture/lines */}
            <div className="absolute inset-0 opacity-20">
              {[
                ...Array(size === "small" ? 12 : size === "large" ? 16 : 14),
              ].map((_, i) => (
                <div
                  key={i}
                  className={`w-full h-px ${currentTheme.frontLines} mb-3`}
                  style={{
                    marginTop:
                      size === "small"
                        ? "8px"
                        : size === "large"
                          ? "16px"
                          : "14px",
                  }}
                />
              ))}
            </div>

            {/* Card content */}
            <div
              className={`relative h-full flex flex-col justify-between ${config.padding}`}
            >
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className={`${config.icon} mx-auto mb-4 rounded-full ${currentTheme.frontIcon} flex items-center justify-center`}
                  >
                    <div
                      className={`${config.innerIcon} rounded-full ${currentTheme.frontInnerIcon} flex items-center justify-center`}
                    >
                      <div
                        className={`${config.dot} rounded-full ${currentTheme.frontDot} animate-pulse`}
                      ></div>
                    </div>
                  </div>
                  <p
                    className={`${currentTheme.frontText} ${config.text} opacity-80`}
                  >
                    Click to reveal what was almost said
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card Back */}
          <div
            className={`
              absolute inset-0 backface-hidden rotate-y-180 rounded-lg
              ${currentTheme.backBg} ${currentTheme.backBorder} border shadow-2xl
            `}
          >
            {/* Subtle texture */}
            <div className="absolute inset-0 opacity-10">
              {[
                ...Array(size === "small" ? 12 : size === "large" ? 16 : 14),
              ].map((_, i) => (
                <div
                  key={i}
                  className={`w-full h-px ${currentTheme.backLines} mb-3`}
                  style={{
                    marginTop:
                      size === "small"
                        ? "12px"
                        : size === "large"
                          ? "16px"
                          : "14px",
                  }}
                />
              ))}
            </div>

            {/* Message content */}
            <div
              className={`relative h-full flex flex-col justify-between ${config.padding}`}
            >
              <div className="flex-1 flex items-center justify-center px-2">
                <p
                  className={`${currentTheme.backText} text-center leading-relaxed ${config.messageText} font-sans`}
                >
                  "{message}"
                </p>
              </div>

              <div
                className={`flex justify-between items-center text-xs ${currentTheme.backAccent} opacity-60`}
              >
                <span></span>
                <span>Click to return</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient effects */}
        <div className="absolute -inset-4 pointer-events-none">
          <div
            className={`
              absolute inset-0 rounded-full opacity-20 transition-all duration-700
              ${revealed ? currentTheme.ambientRevealed : currentTheme.ambientDefault}
              ${isAnimating ? "scale-110 opacity-30" : "scale-100"}
            `}
            style={{
              filter: "blur(20px)",
              animation: revealed ? "none" : "pulse 3s ease-in-out infinite",
            }}
          ></div>
        </div>
      </div>

      {/* Optional instructions */}
      {showInstructions && (
        <div className="text-center mt-6">
          <p
            className={`${currentTheme.frontText} ${config.instructionText} opacity-60`}
          >
            Each card holds what someone almost said
          </p>
          <p className={`${currentTheme.frontAccent} text-xs opacity-40 mt-1`}>
            "Some things don't want to be forgotten"
          </p>
        </div>
      )}

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
