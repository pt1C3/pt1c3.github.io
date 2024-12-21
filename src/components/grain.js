import React from "react";

const GrainOverlay = () => {
  return (
    <>
      {/* Darker Grain Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 9998,
          mixBlendMode: "multiply", // Darken effect
          opacity: 0.2,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          style={{
            display: "block",
          }}
        >
          <filter id="dark-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6" // Higher = denser grain
              numOctaves="1"
              stitchTiles="stitch"
            />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#dark-grain)"
            fill="black"
          />
        </svg>
      </div>

      {/* Lighter Grain Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 9999, 
          mixBlendMode: "color-dodge", // Lighten effect
          opacity: 0.2,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          style={{
            display: "block",
          }}
        >
          <filter id="light-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6" // Softer grain
              numOctaves="2"
              stitchTiles="stitch"
            />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#light-grain)"
            fill="white"
          />
        </svg>
      </div>
    </>
  );
};

export default GrainOverlay;
