"use client";

import ScrollingText3D from "@/app/components/ScrollingText3D";
import { useState } from "react";

export default function Sample3DText() {
  const [currentLine, setCurrentLine] = useState(0);

  const messageLines = [
    "Happy Birthday Mom!",
    "",
    "I love and miss you so much.",
    "Even though we're so far apart,",
    "I still wanted to send you a special card.",
    "",
    "Here's a song that reminds me of you",
    "when it comes on, and a photo of my new cat!",
    "",
    "Love,",
    "Lorem Ipsum",
  ];

  const handleLineChange = (index) => {
    setCurrentLine(index);
  };

  return (
    <div className="relative w-full h-screen">
      {/* 3D Scrolling Text Component - Takes full screen */}
      <ScrollingText3D
        lines={messageLines}
        autoPlay={false}
        speed={3.0}
        onLineChange={handleLineChange}
      />

      {/* Progress indicator */}
      <div className="fixed top-8 right-8 z-10">
        <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
          <p className="text-sm">
            {currentLine + 1} / {messageLines.length}
          </p>
        </div>
      </div>

      {/* Back button */}
      <div className="fixed top-8 left-8 z-10">
        <a
          href="/"
          className="inline-block px-4 py-2 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50 transition-colors"
          style={{ fontFamily: "var(--font-courgette)" }}
        >
          ← Home
        </a>
      </div>
    </div>
  );
}
