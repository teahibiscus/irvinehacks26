"use client";
import { useRef, useState } from "react";

export default function Footer({ onImageSelect, spotifyRef, onSend }) {
  const fileInputRef = useRef(null);
  const [showMusicInput, setShowMusicInput] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const closeMusicInput = () => {
    setShowMusicInput(false);
    const spotifyLink = spotifyRef.current?.value;
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
          padding: "10px 50px",
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
          className="relative flex h-[40px] items-center"
          style={{ gap: "12px" }}
        >
          {/* FLOATING MUSIC INPUT */}
          {/* Redesigned to match Figma design */}
          <div
            className={`absolute bottom-[55px] right-[0px] transition-all duration-300 transform ${
              showMusicInput
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            }`}
            style={{
              width: "340px",
              height: "40px",
            }}
          >
            <div
              className="relative overflow-hidden rounded-lg"
              style={{
                width: "100%",
                height: "100%",
                backdropFilter: "blur(17.84px)",
                background: "white",
                borderRadius: "8px",
                boxShadow: "-1.858px -1.732px 12px -8px rgba(156,205,248,0.15)",
                display: "flex",
                alignItems: "center",
                paddingLeft: "16px",
                paddingRight: "50px",
              }}
            >
              {/* Input Field with blinking cursor */}
              <input
                type="text"
                ref={spotifyRef}
                placeholder="|"
                className="flex-grow bg-transparent border-none outline-none text-[14px] font-['Lato',sans-serif] placeholder-black placeholder-opacity-60"
                style={{
                  caretColor: "black",
                }}
              />
              <style jsx>{`
                input::placeholder {
                  animation: blink 1s step-end infinite;
                }
                @keyframes blink {
                  0%, 49% {
                    opacity: 1;
                  }
                  50%, 100% {
                    opacity: 0;
                  }
                }
              `}</style>

              {/* Check Button */}
              <button
                onClick={closeMusicInput}
                className="absolute w-[20px] h-[20px] flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{
                  left: "310px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <img
                  src="https://www.figma.com/api/mcp/asset/6533e856-c48a-4221-90a3-6de93d6bb7f7"
                  alt="Confirm"
                  className="w-full h-full"
                />
              </button>

              {/* Inner shadow overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-inherit"
                style={{
                  boxShadow:
                    "inset 2.676px 2.494px 11.52px 0px rgba(156,205,248,0), inset 1.747px 1.628px 5.76px 0px rgba(255,255,255,0)",
                }}
              />
            </div>
            {/* Small arrow/caret pointing down to the icon */}
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white mx-auto mt-[-1px] mr-12"></div>
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUploadClick}
            className="group relative overflow-hidden transition-all"
            style={{
              width: "60px",
              height: "40px",
              borderRadius: "6px",
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
              className="absolute left-[18px] top-[8px] w-[24px] h-[24px]"
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
              width: "60px",
              height: "40px",
              borderRadius: "6px",
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
              className="absolute left-[18px] top-[8px] w-[24px] h-[24px]"
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
              width: "60px",
              height: "40px",
              borderRadius: "6px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background:
                "linear-gradient(90deg, rgba(156, 205, 248, 0.1) 0%, rgba(156, 205, 248, 0.1) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%)",
              backdropFilter: "blur(17.84px)",
            }}
          >
            <img
              src="https://www.figma.com/api/mcp/asset/4fcec93e-e1f5-4cd9-841c-accddaf16480"
              alt="Send"
              className="absolute left-[18px] top-[8px] w-[24px] h-[24px]"
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
