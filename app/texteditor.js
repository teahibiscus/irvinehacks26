"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const TextEditor = forwardRef(({ entry }, ref) => {
  const [isTyping, setIsTyping] = useState(false);

  // --- Main Body Editor ---
  const bodyEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Enter your loving message here." }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "outline-none text-4xl font-[var(--font-lora)] leading-[1.3] py-10 pr-10 text-[#77777B] h-[300px] w-full",
      },
    },
    onUpdate: ({ editor }) => {
      localStorage.setItem("body-tiptap", editor.getHTML());
    },
    onTransaction: ({ transaction }) => {
      if (transaction.docChanged) {
        setIsTyping(true);
        const timer = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timer);
      }
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Optional: Create a preview URL if you want to show it in the UI
      // const preview = URL.createObjectURL(file);
    }
  };

  useImperativeHandle(ref, () => ({
    getData: () => bodyEditor?.getText() || "",
  }));

  // Load entry data if it exists
  useEffect(() => {
    if (entry?.description && bodyEditor && bodyEditor.isEmpty) {
      bodyEditor.commands.setContent(entry.description);
    }
  }, [entry, bodyEditor]);

  return (
    <div className="bg-[url('/card_blank.png')] w-[800px] h-[530px] flex flex-col p-5 border border-black-100 rounded-lg overflow-hidden">
      <div className="bg-white flex-1 overflow-hidden min-h-0 p-4">
        <EditorContent editor={bodyEditor} />
      </div>
    </div>
  );
});

export default TextEditor;
