import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!visible || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    setCoords({
      x: rect.left + rect.width / 2,
      y: rect.bottom + window.scrollY,
    });
  }, [visible]);

  return (
    <>
      <span
        ref={ref}
        className="relative group cursor-help text-yellow-300 text-sm"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </span>
      {visible &&
        createPortal(
          <div
            className="fixed z-50 px-4 py-2 text-sm text-white bg-black/90 rounded-md shadow-md backdrop-blur-sm"
            style={{
              top: coords.y + 8,
              left: coords.x,
              transform: "translateX(-50%)",
              whiteSpace: "pre-wrap",
              maxWidth: "250px",
            }}
          >
            {text}
          </div>,
          document.body,
        )}
    </>
  );
}
