"use client";
import { useRef } from "react";
import SmallEditor from "../smallEditor";
import { useState } from "react";

export default function Footer({ onImageSelect, spotifyRef, onSend }) {
  const fileInputRef = useRef(null);
  const [showMusicInput, setShowMusicInput] = useState(false);
  // Trigger the hidden file input when the button is clicked
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const closeMusicInput = () => {
    setShowMusicInput(false);
    // save spotify link to local storage so it can be retrieved in page.js
    const spotifyLink = spotifyRef.current?.getData();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onImageSelect) {
      // Create the temporary URL
      const previewUrl = URL.createObjectURL(file);

      onImageSelect(file, previewUrl);
    }
  };
  return (
    <div className="footer-blur with-background">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <div
        className={`w-full max-w-[400px] px-8 pb-4 transition-all duration-300 ${
          showMusicInput ? "block opacity-100" : "hidden opacity-0"
        }`}
      >
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg p-2 shadow-xl">
          <SmallEditor ref={spotifyRef} placeholder="Paste Spotify Link..." />
        </div>
        <button
          onClick={() => setShowMusicInput(false)}
          className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Close Music Input
        </button>
      </div>
      {/* Content container */}
      <div
        className="content"
        style={{ justifyContent: "flex-end", padding: "15px 75px" }}
      >
        {/* Button Container */}
        <div className="relative flex h-[50px]" style={{ gap: "20px" }}>
          {/* Upload Button - positioned at x=990 in 1290px container */}
          <button
            onClick={handleUploadClick}
            className="group relative overflow-hidden transition-all"
            style={{
              width: "80px",
              height: "50px",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background:
                "linear-gradient(90deg, rgba(156, 205, 248, 0.1) 0%, rgba(156, 205, 248, 0.1) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%)",
              backdropFilter: "blur(17.84px)",
              boxShadow:
                "0px 2px 4px 0px rgba(0,0,0,0.25), -1.858px -1.732px 12px -8px rgba(156,205,248,0.15)",
            }}
            aria-label="Upload"
          >
            <img
              src="https://www.figma.com/api/mcp/asset/c52bdff9-f286-49aa-a868-507d5c7a3ae5"
              alt="Upload"
              style={{
                position: "absolute",
                left: "25px",
                top: "10px",
                width: "30px",
                height: "30px",
              }}
            />
            {/* Default state */}
            <div
              className="absolute inset-[-1px] pointer-events-none rounded-[inherit] transition-shadow duration-200 group-hover:opacity-0 group-active:opacity-0"
              style={{
                boxShadow:
                  "inset 0px -1px 4px 0px #9ccdf8, inset 2.676px 2.494px 11.52px 0px rgba(156,205,248,0), inset 1.747px 1.628px 5.76px 0px rgba(255,255,255,0)",
              }}
            />
            {/* Hover state */}
            <div
              className="absolute inset-[-1px] pointer-events-none rounded-[inherit] transition-shadow duration-200 opacity-0 group-hover:opacity-100 group-active:opacity-0"
              style={{
                boxShadow:
                  "inset 0px 5px 5px 5px rgba(255,255,255,0.5), inset 0px -1px 4px 0px #9ccdf8, inset 2.676px 2.494px 11.52px 0px rgba(156,205,248,0), inset 1.747px 1.628px 5.76px 0px rgba(255,255,255,0)",
              }}
            />
            {/* Clicked/Active state */}
            <div
              className="absolute inset-[-1px] pointer-events-none rounded-[inherit] transition-shadow duration-200 opacity-0 group-active:opacity-100"
              style={{
                boxShadow:
                  "inset 0px 4px 4px 0px rgba(0,0,0,0.25), inset 0px -1px 4px 0px #9ccdf8, inset 2.676px 2.494px 11.52px 0px rgba(156,205,248,0), inset 1.747px 1.628px 5.76px 0px rgba(255,255,255,0)",
              }}
            />
          </button>

          {/* Music Button - positioned at x=1100 in 1290px container */}
          <button
            onClick={() => setShowMusicInput(!showMusicInput)}
            className="group relative overflow-hidden transition-all"
            style={{
              width: "80px",
              height: "50px",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background:
                "linear-gradient(90deg, rgba(156, 205, 248, 0.1) 0%, rgba(156, 205, 248, 0.1) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%)",
              backdropFilter: "blur(17.84px)",
              boxShadow:
                "0px 2px 4px 0px rgba(0,0,0,0.25), -1.858px -1.732px 12px -8px rgba(156,205,248,0.15)",
            }}
            aria-label="Music"
          >
            <img
              src="https://www.figma.com/api/mcp/asset/bbb43766-faf4-4bb0-9bd7-9d3813d5759a"
              alt="Music"
              style={{
                position: "absolute",
                left: "25px",
                top: "10px",
                width: "30px",
                height: "30px",
              }}
            />
            {/* Default state */}
            <div
              className="absolute inset-[-1px] pointer-events-none rounded-[inherit] transition-shadow duration-200 group-hover:opacity-0 group-active:opacity-0"
              style={{
                boxShadow:
                  "inset 0px -1px 4px 0px #9ccdf8, inset 2.676px 2.494px 11.52px 0px rgba(156,205,248,0), inset 1.747px 1.628px 5.76px 0px rgba(255,255,255,0)",
              }}
            />
            {/* Hover state */}
            <div
              className="absolute inset-[-1px] pointer-events-none rounded-[inherit] transition-shadow duration-200 opacity-0 group-hover:opacity-100 group-active:opacity-0"
              style={{
                boxShadow:
                  "inset 0px 5px 5px 5px rgba(255,255,255,0.5), inset 0px -1px 4px 0px #9ccdf8, inset 2.676px 2.494px 11.52px 0px rgba(156,205,248,0), inset 1.747px 1.628px 5.76px 0px rgba(255,255,255,0)",
              }}
            />
            {/* Clicked/Active state */}
            <div
              className="absolute inset-[-1px] pointer-events-none rounded-[inherit] transition-shadow duration-200 opacity-0 group-active:opacity-100"
              style={{
                boxShadow:
                  "inset 0px 4px 4px 0px rgba(0,0,0,0.25), inset 0px -1px 4px 0px #9ccdf8, inset 2.676px 2.494px 11.52px 0px rgba(156,205,248,0), inset 1.747px 1.628px 5.76px 0px rgba(255,255,255,0)",
              }}
            />
          </button>

          {/* Send Button - positioned at x=1210 in 1290px container */}
          <button
            onClick={onSend}
            className="group relative overflow-hidden transition-all"
            style={{
              width: "80px",
              height: "50px",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background:
                "linear-gradient(90deg, rgba(156, 205, 248, 0.1) 0%, rgba(156, 205, 248, 0.1) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%)",
              backdropFilter: "blur(17.84px)",
              boxShadow:
                "0px 2px 4px 0px rgba(0,0,0,0.25), -1.858px -1.732px 12px -8px rgba(156,205,248,0.15)",
            }}
            aria-label="Send"
          >
            <img
              src="https://www.figma.com/api/mcp/asset/4fcec93e-e1f5-4cd9-841c-accddaf16480"
              alt="Send"
              style={{
                position: "absolute",
                left: "25px",
                top: "10px",
                width: "30px",
                height: "30px",
              }}
            />
            {/* Default state */}
            <div
              className="absolute inset-[-1px] pointer-events-none rounded-[inherit] transition-shadow duration-200 group-hover:opacity-0 group-active:opacity-0"
              style={{
                boxShadow:
                  "inset 0px -1px 4px 0px #9ccdf8, inset 2.676px 2.494px 11.52px 0px rgba(156,205,248,0), inset 1.747px 1.628px 5.76px 0px rgba(255,255,255,0)",
              }}
            />
            {/* Hover state */}
            <div
              className="absolute inset-[-1px] pointer-events-none rounded-[inherit] transition-shadow duration-200 opacity-0 group-hover:opacity-100 group-active:opacity-0"
              style={{
                boxShadow:
                  "inset 0px 5px 5px 5px rgba(255,255,255,0.5), inset 0px -1px 4px 0px #9ccdf8, inset 2.676px 2.494px 11.52px 0px rgba(156,205,248,0), inset 1.747px 1.628px 5.76px 0px rgba(255,255,255,0)",
              }}
            />
            {/* Clicked/Active state */}
            <div
              className="absolute inset-[-1px] pointer-events-none rounded-[inherit] transition-shadow duration-200 opacity-0 group-active:opacity-100"
              style={{
                boxShadow:
                  "inset 0px 4px 4px 0px rgba(0,0,0,0.25), inset 0px -1px 4px 0px #9ccdf8, inset 2.676px 2.494px 11.52px 0px rgba(156,205,248,0), inset 1.747px 1.628px 5.76px 0px rgba(255,255,255,0)",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
