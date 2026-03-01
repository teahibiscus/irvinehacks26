"use client";
import { createPostcard } from "./actions";
import SmallEditor from "./smallEditor";
import TextEditor from "./texteditor";
import { useState, useRef } from "react";
import Image from "next/image";
import ImageUpload from "./imageUpload";
import Footer from "@/app/components/Footer";

export default function Home() {
  const [showMusicInput, setShowMusicInput] = useState(false);
  const titleRef = useRef();
  const bodyRef = useRef();
  const [preview, setPreview] = useState("/vercel.svg");
  const [imageFile, setImageFile] = useState(null);
  const receiverRef = useRef();
  const spotifyRef = useRef();
  const imageRef = useRef();
  const handleImageSelect = (file, previewUrl) => {
    setImageFile(file); // The binary for the database
    setPreview(previewUrl); // The URL for the <img> tag
  };
  const onSaveButtonClick = async () => {
    const title = titleRef.current?.getData();
    const body = bodyRef.current?.getData();
    const receiver = receiverRef.current?.getData();
    const spotify = spotifyRef.current?.getData();

    // 2. Wrap it in FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("receiver", receiver);
    formData.append("spotifyLink", spotify);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }
    // 3. Send the "envelope" to the action
    await createPostcard(formData);
  };

  const onMusicClick = () => {
    // display music input field from smallEditor
    setShowMusicInput(!showMusicInput);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* logo header */}
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          padding: "1rem",
          paddingLeft: "4rem",
        }}
      >
        <div style={{ width: "120px", height: "50px", position: "relative" }}>
          <Image
            src="/papertrail_logo.png"
            alt="logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </header>
      <main
        className="flex items-center justify-center min-h-screen p-4"
        style={{ padding: "2rem" }}
      >
        <div className="p-8">
          <h1>Create a Postcard</h1>
          <div className="bg-[url('/card_side1.jpg')] w-[800px] h-[530px] mb-4 text-gray-600 flex justify-end items-center">
            <div className="w-1/2">
              <img
                src={preview}
                alt="Preview"
                className="max-h-full object-contain"
              />
            </div>
            <div className="w-1/3 ml-auto">
              <SmallEditor ref={receiverRef} placeholder="Receiver's Name" />
            </div>
          </div>

          <SmallEditor ref={titleRef} placeholder="Title your postcard!" />
          <TextEditor ref={bodyRef} placeholder="Enter your message here." />

          <div className="mt-8">
            <button
              onClick={onSaveButtonClick}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              <img
                src="/window.svg"
                alt="Save Icon"
                className="inline-block w-5 h-5 mr-2"
              />
            </button>
          </div>
        </div>
        <Footer
          onImageSelect={handleImageSelect}
          spotifyRef={spotifyRef}
          onSend={onSaveButtonClick}
        />
      </main>
    </div>
  );
}
