"use client";
import { useRef, useState } from "react";
import SmallEditor from "../smallEditor";

export default function Footer({ onImageSelect, spotifyRef, onSend }) {
  const fileInputRef = useRef(null);
  const [showMusicInput, setShowMusicInput] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const closeMusicInput = () => {
    setShowMusicInput(false);
    const spotifyLink = spotifyRef.current?.getData();
    if (spotifyLink) {
      localStorage.setItem("spotifyLink", spotifyLink);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onImageSelect) {
      const previewUrl = URL.createObjectURL(file);
      onImageSelect(file, previewUrl);
    }
  };

  return (
    <div className="footer-blur with-background relative">
      <div
        className="content"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "15px 75px",
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Button Container */}
        <div
          className="relative flex h-[50px] items-center"
          style={{ gap: "20px" }}
        >
          {/* FLOATING MUSIC INPUT */}
          {/* This is positioned absolutely relative to the Button Container */}
          <div
            className={`absolute bottom-[70px] right-[0px] w-[350px] transition-all duration-300 transform ${
              showMusicInput
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            }`}
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-2xl flex items-center gap-2">
              <div className="flex-grow">
                <SmallEditor
                  ref={spotifyRef}
                  placeholder="Paste Spotify Link..."
                />
              </div>
              <button
                onClick={closeMusicInput}
                className="bg-[#1DB954] hover:bg-[#1ed760] text-white px-4 py-1.5 rounded-lg font-bold text-xs transition-all active:scale-95 whitespace-nowrap"
              >
                Apply
              </button>
            </div>
            {/* Small arrow/caret pointing down to the icon (optional) */}
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white/10 mx-auto mt-[-1px] mr-12"></div>
          </div>

          {/* Upload Button */}
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
          >
            <img
              src="https://www.figma.com/api/mcp/asset/c52bdff9-f286-49aa-a868-507d5c7a3ae5"
              alt="Upload"
              className="absolute left-[25px] top-[10px] w-[30px] h-[30px]"
            />
            <div
              className="absolute inset-[-1px] pointer-events-none rounded-[inherit] transition-shadow duration-200 group-hover:opacity-0"
              style={{ boxShadow: "inset 0px -1px 4px 0px #9ccdf8" }}
            />
          </button>

          {/* Music Button */}
          <button
            onClick={() => setShowMusicInput(!showMusicInput)}
            className="group relative overflow-hidden transition-all"
            style={{
              width: "80px",
              height: "50px",
              borderRadius: "8px",
              border: showMusicInput
                ? "1px solid #3c5344"
                : "1px solid rgba(255, 255, 255, 0.1)",
              background:
                "linear-gradient(90deg, rgba(156, 205, 248, 0.1) 0%, rgba(156, 205, 248, 0.1) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%)",
              backdropFilter: "blur(17.84px)",
              boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.25)",
            }}
          >
            <img
              src="https://www.figma.com/api/mcp/asset/bbb43766-faf4-4bb0-9bd7-9d3813d5759a"
              alt="Music"
              className="absolute left-[25px] top-[10px] w-[30px] h-[30px]"
            />
            <div
              className="absolute inset-[-1px] pointer-events-none rounded-[inherit] transition-shadow duration-200 group-hover:opacity-0"
              style={{ boxShadow: "inset 0px -1px 4px 0px #9ccdf8" }}
            />
          </button>

          {/* Send Button */}
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
            }}
          >
            <img
              src="https://www.figma.com/api/mcp/asset/4fcec93e-e1f5-4cd9-841c-accddaf16480"
              alt="Send"
              className="absolute left-[25px] top-[10px] w-[30px] h-[30px]"
            />
            <div
              className="absolute inset-[-1px] pointer-events-none rounded-[inherit] transition-shadow duration-200 group-hover:opacity-0"
              style={{ boxShadow: "inset 0px -1px 4px 0px #9ccdf8" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
