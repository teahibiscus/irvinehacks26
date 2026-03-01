"use client";
import { createPostcard } from "./actions";
import SmallEditor from "./smallEditor";
import TextEditor from "./texteditor";
import { useState, useRef } from "react";
import Image from "next/image";
import ImageUpload from "./imageUpload";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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

  const gatherForm = () => {
    const title = titleRef.current?.getData();
    const body = bodyRef.current?.getData();
    const receiver = receiverRef.current?.getData();
    const spotify = spotifyRef.current?.getData();
    const file = imageRef.current?.getFile();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("receiver", receiver);
    formData.append("spotifyLink", spotify);
    if (imageFile) {
          formData.append("imageFile", imageFile);
        }    
    return formData;
  };

  // const onSaveButtonClick = async () => {
  //   const slug = await createPostcard(gatherForm());
  //   if (slug) {
  //     router.push(`/sent/${slug}`);
  //   }
  // };

  const onSaveButtonClick = async () => {
    const title = titleRef.current?.getData();
    const body = bodyRef.current?.getData();
    const receiver = receiverRef.current?.getData();
    const spotify = spotifyRef.current?.getData();

    const formData = gatherForm();
    
    const slug = await createPostcard(formData);
    if (slug) {
      router.push(`/sent/${slug}`);
    }
  };

  // send button should behave identical to save for now
  const onSendButtonClick = onSaveButtonClick;

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
          <div className="bg-[url('/card_front.jpg')] w-[800px] h-[530px] mb-4 text-gray-600 flex justify-end items-center">
            <div className="w-1/2 h-full flex items-center justify-center p-4">
              <img
                src={preview}
                alt="Preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="w-1/3 ml-auto">
              <SmallEditor ref={receiverRef} placeholder="Receiver's Name" />
            </div>
          </div>
          <TextEditor ref={bodyRef} placeholder="Enter your message here." />
        </div>
        <Footer
          onImageSelect={handleImageSelect}
          spotifyRef={spotifyRef}
          onSend={onSendButtonClick}
        />
      </main>
    </div>
  );
}
