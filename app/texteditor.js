"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const TextEditor = forwardRef(({ entry }, ref) => {
  const [isTyping, setIsTyping] = useState(false);

  // --- Title Editor ---
  const headerEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Title your postcard!" }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "outline-none font-['Nunito'] text-[16px] text-[#77777B] w-full",
      },
    },
    onUpdate: ({ editor }) => {
      localStorage.setItem("header-tiptap", editor.getHTML());
    },
  });

  // --- Sender Name Editor ---
  const receiverEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Receiver's Name" }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "outline-none font-['Nunito'] text-[16px] text-[#77777B] w-full",
      },
    },
    onUpdate: ({ editor }) => {
      localStorage.setItem("receiver-tiptap", editor.getHTML());
    },
  });

  // --- Main Body Editor ---
  const bodyEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Enter your loving message here." }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        // Added 'min-h-[300px]' and 'w-full' to ensure it's clickable and visible
        class:
          "outline-none text-4xl font-[var(--font-lora)] leading-[1.3] py-10 pr-10 text-[#77777B] min-h-[300px] w-full",
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

  // --- spotify link Editor ---
  const spotifyLink = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Spotify Link (optional)" }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "outline-none font-['Nunito'] text-[16px] text-[#77777B] w-full",
      },
    },
    onUpdate: ({ editor }) => {
      localStorage.setItem("spotify-link-tiptap", editor.getHTML());
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
    handleSave: () => {
      if (headerEditor && bodyEditor && spotifyLink) {
        return {
          title: headerEditor.getText(),
          body: bodyEditor.getText(),
          spotifyLink: spotifyLink.getText(),
          receiver: receiverEditor.getText(),
          imageFile: selectedImage, // Image handling can be added here if needed
        };
      }
      return null;
    },
  }));

  // Load entry data if it exists
  useEffect(() => {
    if (entry?.description && bodyEditor && bodyEditor.isEmpty) {
      bodyEditor.commands.setContent(entry.description);
    }
    if (entry?.title && headerEditor && headerEditor.isEmpty) {
      headerEditor.commands.setContent(entry.title);
    }
    if (entry?.spotifyLink && spotifyLink && spotifyLink.isEmpty) {
      spotifyLink.commands.setContent(entry.spotifyLink);
    }
    if (entry?.receiver && receiverEditor && receiverEditor.isEmpty) {
      receiverEditor.commands.setContent(entry.receiver);
    }
  }, [entry, bodyEditor, headerEditor, spotifyLink, receiverEditor]);

  return (
    <div className="p-8 border border-gray-100 rounded-lg">
      <div className="mb-4">
        <EditorContent editor={headerEditor} />
      </div>
      <hr className="border-t border-gray-200 my-6" />
      <div
        className={`transition-shadow duration-700 ${
          isTyping ? "shadow-lg" : ""
        }`}
      >
        <EditorContent editor={bodyEditor} />
      </div>
      <EditorContent editor={spotifyLink} />
      <EditorContent editor={receiverEditor} />
      <div className="mt-4 p-4 border-2 border-dashed border-gray-200 rounded-xl">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id="image-upload"
          className="hidden"
        />
        <label htmlFor="image-upload" className="cursor-pointer text-[#77777B]">
          {selectedImage
            ? `Selected: ${selectedImage.name}`
            : "Click to upload an image"}
        </label>
      </div>
    </div>
  );
});

export default TextEditor;
