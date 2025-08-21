import React, { useState, useEffect } from "react";
import { Image } from "astro:assets";

// TypeScript interfaces for our character data structure
interface CompanionData {
  name: string;
  description: string;
  icon?: string;
}

export interface CharacterData {
  id: string;
  name: string;
  portrait: string;
  origin: string;
  strength: string;
  struggle: string;
  companion: CompanionData;
  originMoment: string;
  whisperedTruth: string;
  whatTaught: string;
  echoesLeft: string;
  emotionalElement: string;
  backstory: string;
}

interface CharacterInterfaceProps {
  characters: CharacterData[];
  initialCharacterId?: string;
}

// Custom hooks for keyboard navigation
const useKeyboardNavigation = (onNext: () => void, onPrev: () => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev]);
};

// Tooltip component
const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({
  content,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-slate-100 text-sm rounded-lg border border-blue-500/30 whitespace-nowrap z-50 opacity-95 backdrop-blur-sm">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
        </div>
      )}
    </div>
  );
};

// Individual character tab component
const CharacterTab: React.FC<{
  character: CharacterData;
  isActive: boolean;
  onClick: () => void;
}> = ({ character, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium relative overflow-hidden ${
      isActive
        ? "bg-blue-500/30 border border-blue-400 text-blue-200"
        : "bg-slate-800/60 border border-slate-600/20 text-slate-300 hover:bg-blue-500/20 hover:border-blue-500/50"
    }`}
  >
    {isActive && (
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-pulse"></div>
    )}
    {character.name}
  </button>
);

// Inventory slot component
const InventorySlot: React.FC<{
  label: string;
  icon: string;
  content: string;
  tooltip: string;
}> = ({ label, icon, content, tooltip }) => (
  <Tooltip content={tooltip}>
    <div className="bg-slate-800/80 border border-slate-600/20 rounded-lg p-4 text-center transition-all duration-300 cursor-pointer relative overflow-hidden group hover:border-blue-500/50 hover:bg-blue-500/10">
      <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent transition-all duration-500 group-hover:left-full"></div>
      <div className="text-slate-400 text-xs mb-2">{label}</div>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-slate-100 text-sm font-medium relative z-10">
        {content}
      </div>
    </div>
  </Tooltip>
);

// Attribute row component
const AttributeRow: React.FC<{
  label: string;
  value: string;
  tooltip: string;
}> = ({ label, value, tooltip }) => (
  <Tooltip content={tooltip}>
    <div className="flex justify-between items-center py-3 border-b border-slate-600/10 transition-all duration-300 hover:bg-blue-500/5 hover:rounded cursor-pointer">
      <span className="text-slate-400 text-sm">{label}</span>
      <span className="text-slate-100 font-medium italic text-right max-w-xs">
        {value}
      </span>
    </div>
  </Tooltip>
);

// Main character interface component
const CharacterInterface: React.FC<CharacterInterfaceProps> = ({
  characters,
  initialCharacterId,
}) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (initialCharacterId) {
      const index = characters.findIndex((c) => c.id === initialCharacterId);
      return index >= 0 ? index : 0;
    }
    return 0;
  });

  const currentCharacter = characters[currentIndex];

  const nextCharacter = () => {
    setCurrentIndex((prev) => (prev + 1) % characters.length);
  };

  const prevCharacter = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + characters.length) % characters.length,
    );
  };

  const selectCharacter = (index: number) => {
    setCurrentIndex(index);
  };

  useKeyboardNavigation(nextCharacter, prevCharacter);

  if (!currentCharacter) {
    return <div className="text-slate-100">No character data available</div>;
  }

  return (
    <>
      <div className="flex min-h-screen">
        {/* Main Content (removed the sidebar) */}
        <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-slate-100 p-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-screen">
            <div className="lg:col-span-3 bg-slate-900/80 backdrop-blur-xl border border-slate-600/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="items-center text-center absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-blue-400/10 to-transparent animate-[sweep_3s_infinite]"></div>

              <p>
                <em>
                  The information below is not official Elsebeneath canon.
                </em>
              </p>
            </div>
            {/* Character Navigation */}
            <div className="lg:col-span-3 bg-slate-900/80 backdrop-blur-xl border border-slate-600/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-blue-400/10 to-transparent animate-[sweep_3s_infinite]"></div>

              <div className="flex items-center justify-center gap-8 relative z-10">
                <button
                  onClick={prevCharacter}
                  className="text-slate-400 hover:text-blue-400 text-2xl transition-colors duration-300 p-2 rounded-lg hover:bg-blue-500/10"
                >
                  ◀
                </button>

                <div className="flex flex-wrap gap-2 justify-center">
                  {characters.map((character, index) => (
                    <CharacterTab
                      key={character.id}
                      character={character}
                      isActive={index === currentIndex}
                      onClick={() => selectCharacter(index)}
                    />
                  ))}
                </div>

                <button
                  onClick={nextCharacter}
                  className="text-slate-400 hover:text-blue-400 text-2xl transition-colors duration-300 p-2 rounded-lg hover:bg-blue-500/10"
                >
                  ▶
                </button>
              </div>
            </div>

            {/* Character Portrait */}
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-600/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-radial from-blue-400/10 via-transparent to-transparent animate-[rotate_20s_linear_infinite]"></div>

              <div className="relative z-10">
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg border-2 border-blue-500/30 flex items-center justify-center text-6xl mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-400/5"></div>
                  <img
                    className="relative z-10"
                    src={currentCharacter.portrait}
                    alt={currentCharacter.name}
                  />
                </div>

                <h2 className="text-2xl font-bold text-center text-blue-200 mb-2">
                  {currentCharacter.name}
                </h2>

                <p className="text-slate-400 text-center italic">
                  {currentCharacter.origin}
                </p>

                <p className="text-slate-100 text-center italic p-6">
                  {currentCharacter.backstory}
                </p>
              </div>
            </div>

            {/* Character Details */}
            <div className="space-y-6">
              {/* Symbolic Inventory */}
              <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-600/30 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-blue-200 text-center mb-6">
                  Essential Nature
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InventorySlot
                    label="Strength"
                    icon="💪"
                    content={currentCharacter.strength}
                    tooltip="What they bring to others, often without noticing"
                  />
                  <InventorySlot
                    label="Struggle"
                    icon="🌊"
                    content={currentCharacter.struggle}
                    tooltip="What they wrestle with in silence"
                  />
                  <InventorySlot
                    label="Silent Companion"
                    icon={currentCharacter.companion.icon || "✨"}
                    content={currentCharacter.companion.name}
                    tooltip="The object that found them when they were most themselves"
                  />
                </div>
              </div>

              {/* Character Attributes */}
              <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-600/30 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-blue-200 text-center mb-6">
                  Echoes & Origins
                </h3>

                <div className="space-y-1">
                  <AttributeRow
                    label="Origin Moment"
                    value={currentCharacter.originMoment}
                    tooltip="The event that pulled them Elsebeneath"
                  />
                  <AttributeRow
                    label="Whispered Truth"
                    value={currentCharacter.whisperedTruth}
                    tooltip="What they've never said aloud"
                  />
                  <AttributeRow
                    label="What They Taught"
                    value={currentCharacter.whatTaught}
                    tooltip="A lesson they gave without realizing"
                  />
                  <AttributeRow
                    label="Echoes Left Behind"
                    value={currentCharacter.echoesLeft}
                    tooltip="The traces they leave when they're gone"
                  />
                  <AttributeRow
                    label="Emotional Element"
                    value={currentCharacter.emotionalElement}
                    tooltip="Their emotional resonance"
                  />
                </div>
              </div>
            </div>

            {/* Companion Details */}
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-600/30 rounded-2xl p-6 relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 rounded-t-2xl"></div>

              <h3 className="text-xl font-semibold text-purple-200 text-center mb-6">
                Silent Companion
              </h3>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 text-center">
                <h4 className="text-lg font-semibold text-purple-200 mb-3">
                  {currentCharacter.companion.name}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {currentCharacter.companion.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Back Button */}
      <a
        href="/books"
        className="fixed bottom-4 left-4 bg-slate-800 text-slate-100 p-3 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
        title="Back to Books"
      >
        &larr; Exit Prototype
      </a>
    </>
  );
};

// Export the main component and sample data for easy integration
export default CharacterInterface;

// Example of how to use this component:
// <CharacterInterface characters={yourCharacterData} initialCharacterId="sam" />
