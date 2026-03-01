"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { forwardRef, useImperativeHandle } from "react";

const SmallEditor = forwardRef(({ placeholder, storageKey }, ref) => {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder })],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: "font-family: 'Courgette', cursive;",
      },
    },
    onUpdate: ({ editor }) => {
      localStorage.setItem(storageKey, editor.getHTML());
    },
  });

  // Expose the text to the parent
  useImperativeHandle(ref, () => ({
    getData: () => editor?.getText() || "",
  }));

  return <EditorContent editor={editor} className="border-b border-gray-200" />;
});

SmallEditor.displayName = "SmallEditor";
export default SmallEditor;
