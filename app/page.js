"use client";
import { createPostcard } from "./actions";
import TextEditor from "./texteditor";
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
    <main style={{ padding: "2rem" }}>
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
  );
}
