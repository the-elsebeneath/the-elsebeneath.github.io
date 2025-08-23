// EmotionalCompass.tsx

import React, { useState, useEffect } from "react";

export interface Story {
  title: string;
  description: string;
  slug: string;
}

interface Direction {
  key: string;
  label: string;
  angle: number;
  x: number;
  y: number;
}

interface EmotionalCompassProps {
  storyData: Record<string, Story[]>;
}

const directions: Direction[] = [
  { key: "north", label: "Belonging", angle: 0, x: 50, y: 15 },
  { key: "northeast", label: "Enough", angle: 45, x: 75, y: 25 },
  { key: "east", label: "Absence", angle: 90, x: 85, y: 50 },
  { key: "southeast", label: "Unspoken", angle: 135, x: 75, y: 75 },
  { key: "south", label: "Tiredness", angle: 180, x: 50, y: 85 },
  { key: "southwest", label: "Love", angle: 225, x: 25, y: 75 },
  { key: "west", label: "Lost", angle: 270, x: 15, y: 50 },
  { key: "northwest", label: "Repair", angle: 315, x: 25, y: 25 },
];

const fullLabels: Record<string, string> = {
  north: "like you don’t belong",
  northeast: "like you're not enough",
  east: "the ache of absence",
  southeast: "like words aren’t working",
  south: "tired of pretending you're okay",
  southwest: "unsure if you're loved",
  west: "like you’ve forgotten who you are",
  northwest: "like you need to fix what was said",
};

const EmotionalCompass: React.FC<EmotionalCompassProps> = ({ storyData }) => {
  const [activeDirection, setActiveDirection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const maxTilt = 10;

    const deltaX = (e.clientX - centerX) / (bounds.width / 2);
    const deltaY = (e.clientY - centerY) / (bounds.height / 2);

    setTiltX(maxTilt * deltaY * -1);
    setTiltY(maxTilt * deltaX);
  };

  const resetTilt = () => {
    setTiltX(0);
    setTiltY(0);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentStories = activeDirection
    ? storyData[activeDirection] || []
    : [];

  if (!mounted) return <div className="min-h-screen" />;

  return (
    <div className="min-h-screen">
      <section className="section-sm bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container text-center">
          <h1 className="h1 mb-4">
            The Emotional <span className="text-primary">Compass</span>
          </h1>
          <p className="text-lg mb-6">
            Choose a direction that speaks to your heart. Click on the compass
            to discover stories that understand where you are.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <div
            className="relative inline-block"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
          >
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              className="max-w-full h-auto drop-shadow-2xl transition-transform duration-300"
              style={{
                transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <defs>
                <radialGradient id="compassGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                  <stop offset="40%" stopColor="rgba(251,191,36,0.1)" />
                  <stop offset="80%" stopColor="rgba(139,69,19,0.05)" />
                  <stop offset="100%" stopColor="rgba(168,85,247,0.1)" />
                </radialGradient>
              </defs>

              {/* Compass Glow */}
              <circle
                cx="200"
                cy="200"
                className="breathe"
                r="180"
                fill="url(#compassGradient)"
                stroke="rgba(139,69,19,0.2)"
                strokeWidth="1"
              />

              <circle
                cx="200"
                cy="200"
                r="160"
                fill="none"
                stroke="rgba(139,69,19,0.15)"
                strokeWidth="1"
                strokeDasharray="5,5"
              />

              <circle
                cx="200"
                cy="200"
                r="6"
                fill="rgba(139,69,19,0.7)"
                stroke="white"
                strokeWidth="1"
              />

              {/* Directions */}
              {directions.map((direction) => {
                const isActive = activeDirection === direction.key;
                const angleRad = ((direction.angle - 90) * Math.PI) / 180;
                const pointX = 200 + 160 * Math.cos(angleRad);
                const pointY = 200 + 160 * Math.sin(angleRad);
                const lineEndX = 200 + 140 * Math.cos(angleRad);
                const lineEndY = 200 + 140 * Math.sin(angleRad);

                return (
                  <g key={direction.key}>
                    {/* Line */}
                    <line
                      x1="200"
                      y1="200"
                      x2={lineEndX}
                      y2={lineEndY}
                      stroke={
                        isActive
                          ? "rgba(168,85,247,0.6)"
                          : "rgba(139,69,19,0.3)"
                      }
                      strokeWidth={isActive ? 3 : 2}
                    />
                    {/* Dot */}
                    <circle
                      cx={pointX}
                      cy={pointY}
                      r={isActive ? 14 : 10}
                      fill={
                        isActive
                          ? "rgba(168,85,247,0.6)"
                          : "rgba(139,69,19,0.4)"
                      }
                      stroke={isActive ? "rgba(168,85,247,0.9)" : "white"}
                      strokeWidth={isActive ? 3 : 2}
                      className="cursor-pointer transition-all duration-300"
                      onClick={() =>
                        setActiveDirection(
                          activeDirection === direction.key
                            ? null
                            : direction.key,
                        )
                      }
                    />

                    {/* Label */}
                    <text
                      x={pointX}
                      y={pointY - 16}
                      textAnchor="middle"
                      fill="rgba(139,69,19,0.8)"
                      className="text-xs font-medium pointer-events-none select-none fill-[rgba(139,69,19,0.8)] dark:fill-white"
                    >
                      {direction.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Floating Label */}
            {activeDirection && (
              <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 animate-fade-in">
                <div className="glass rounded-lg px-6 py-3 max-w-xs">
                  <p className="text-center italic text-gray-800 dark:text-gray-200">
                    You're feeling...{" "}
                    <span className="font-medium">
                      {fullLabels[activeDirection]}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stories */}
      {currentStories.length > 0 && (
        <section className="section bg-theme-light">
          <div className="container">
            <div className="glass rounded-lg p-8 animate-fade-in">
              <h2 className="h2 mb-8 text-center">Stories that understand</h2>
              <div className="row">
                {currentStories.map((story, index) => (
                  <div key={story.slug} className="md:col-6 mb-6">
                    <div
                      className="glass rounded-lg p-6 h-full hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <h3 className="h4 mb-3 text-primary">{story.title}</h3>
                      <p className="text-muted mb-4 italic">
                        {story.description}
                      </p>
                      <a
                        href={`https://junothreadborne.me/story/${story.slug}`}
                        className="btn btn-outline btn-sm"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Styles */}
      <style>{`
  .emotional-compass svg {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 768px) {
    .emotional-compass svg {
      width: 320px !important;
      height: 320px !important;
    }
  }

  @media (max-width: 480px) {
    .emotional-compass svg {
      width: 280px !important;
      height: 280px !important;
    }
  }

  /* Other styles stay the same */
`}</style>
    </div>
  );
};

export default EmotionalCompass;
