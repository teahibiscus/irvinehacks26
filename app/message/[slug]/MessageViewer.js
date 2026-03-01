"use client";

import { useState } from "react";
import Image from "next/image";

export default function MessageViewer({ message }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10" />
      
      {/* Main container */}
      <div className="max-w-4xl w-full">
        {/* Receiver greeting */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-courgette)" }}>
            Dear {message.receiver},
          </h1>
          <p className="text-lg opacity-70">You've received a special message</p>
        </div>

        {/* Postcard container with flip effect */}
        <div 
          className="relative w-full mx-auto cursor-pointer"
          style={{ 
            perspective: "1500px",
            maxWidth: "800px",
            aspectRatio: "3 / 2"
          }}
          onClick={handleFlip}
        >
          <div 
            className="relative w-full h-full transition-transform duration-700"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
            }}
          >
            {/* Front of card - Image */}
            <div 
              className="absolute inset-0 rounded-xl shadow-2xl overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden"
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={message.image}
                  alt="Postcard"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-xl"
                />
                {/* Tap to flip hint */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm">
                  Tap to read message →
                </div>
              </div>
            </div>

            {/* Back of card - Message */}
            <div 
              className="absolute inset-0 rounded-xl shadow-2xl overflow-hidden bg-white"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)"
              }}
            >
              <div 
                className="w-full h-full p-12 flex flex-col"
                style={{
                  backgroundImage: "url('/card_side1.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                {/* Title */}
                <h2 
                  className="text-3xl mb-6 text-center"
                  style={{ fontFamily: "var(--font-courgette)" }}
                >
                  {message.title}
                </h2>

                {/* Message content */}
                <div 
                  className="flex-1 overflow-auto mb-6 no-scrollbar"
                  style={{ fontFamily: "var(--font-courgette)" }}
                >
                  <div 
                    className="text-lg leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  />
                </div>

                {/* Tap to flip back hint */}
                <div className="text-center text-sm opacity-70">
                  Tap to see image ←
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Music player */}
        {message.song && (
          <div className="mt-8 max-w-2xl mx-auto">
            <p className="text-center mb-4 text-lg" style={{ fontFamily: "var(--font-courgette)" }}>
              Listen to the song they picked for you
            </p>
            <iframe
              data-testid="embed-iframe"
              className="w-full rounded-xl shadow-lg"
              src={`https://open.spotify.com/embed/track/${message.song}?utm_source=generator`}
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        )}

        {/* Action button */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
            style={{ fontFamily: "var(--font-courgette)" }}
          >
            Send Your Own Message
          </a>
        </div>
      </div>
    </div>
  );
}
