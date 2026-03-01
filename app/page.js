"use client";
import { createPostcard } from "./actions";
import TextEditor from "./texteditor";
import Image from "next/image";
import { useRef } from "react";

export default function Home() {
  const editorRef = useRef(null);
  const onSaveButtonClick = () => {
    const content = editorRef.current.handleSave();
    console.log("Saved Content:", content);
    if (content) {
      console.log("Data received in page.js:", content);
      // Now you can do whatever you want with data.title and data.body!
    }
    createPostcard(content);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header Bar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: ".5rem .5rem",
          paddingLeft:"0",
        }}
      >
        {/* Logo on the left */}
        <div style={{ width: "150px", 
                      height: "50px", 
                      position: "relative", 
                      marginLeft: "-20px"
                     }}
        >
          <Image
            src="/logo.png"
            alt="logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </header>

      {/* Content */}
      <main style={{ padding: "2rem", flex: 1 }}>
      <h1>Create a Postcard</h1>

      <TextEditor ref={editorRef} />
      <div className="mt-8">
        <button
          onClick={onSaveButtonClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save From Page.js
        </button>
      </div>
      </main>
    </div>
  );
}
