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
  const [preview, setPreview] = useState("/default_image.png");
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
        <div className="p-10">
          <div className="bg-[url('/card_blank.png')] bg-cover w-[800px] h-[530px] mb-4 text-gray-600 flex items-center p-10">
            {/* Left Half: The Image Area */}
            <div className="bg-white w-1/2 h-full flex items-center justify-center p-8">
              <img
                src={preview}
                alt="Preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Right Half: The Input Area */}
            <div className="w-1/2 h-full flex flex-col items-center justify-center pr-12 relative">
              {/* The "Hello to" image shifted slightly left and placed above the input */}
              <div className="w-full max-w-[250px] flex flex-col items-start">
                <img
                  src="/Hello_to.png"
                  alt="Hello to: "
                  className=" object-contain -mt-50 -ml-12" // -ml-12 pulls it to the left
                  style={{ transform: "rotate(-5deg)" }} // Optional: a tiny tilt makes it look more "hand-placed"
                />
                <div className="p-10">
                  <SmallEditor
                    ref={receiverRef}
                    placeholder="Receiver's Name"
                  />
                </div>
              </div>
            </div>
          </div>
          <TextEditor ref={bodyRef} placeholder="Enter your message here." />
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
