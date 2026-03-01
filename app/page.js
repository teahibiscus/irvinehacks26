"use client";
import { createPostcard } from "./actions";
import SmallEditor from "./smallEditor";
import TextEditor from "./texteditor";
import { useRef } from "react";
import ImageUpload from "./imageUpload";

export default function Home() {
  const titleRef = useRef();
  const bodyRef = useRef();
  const receiverRef = useRef();
  const spotifyRef = useRef();
  const imageRef = useRef();
  const onSaveButtonClick = async () => {
    const title = titleRef.current?.getData();
    const body = bodyRef.current?.getData();
    const receiver = receiverRef.current?.getData();
    const spotify = spotifyRef.current?.getData();
    const file = imageRef.current?.getFile(); // Make sure your image component has this!

    // 2. Wrap it in FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("receiver", receiver);
    formData.append("spotifyLink", spotify);
    formData.append("imageFile", file); // This is the magic part for the server

    // 3. Send the "envelope" to the action
    await createPostcard(formData);
  };

  return (
    <main
      className="flex items-center justify-center min-h-screen p-4"
      style={{ padding: "2rem" }}
    >
      <div className="p-8">
        <h1>Create a Postcard</h1>
        <div className="bg-[url('/card_side1.jpg')] w-[800px] h-[530px] mb-4 text-gray-600 flex justify-end items-center">
          <div className="w-1/2">
            <img src="/vercel.svg" />
          </div>
          <div className="w-1/3 ml-auto">
            <SmallEditor ref={receiverRef} placeholder="Receiver's Name" />
          </div>
        </div>

        <SmallEditor ref={titleRef} placeholder="Title your postcard!" />
        <SmallEditor ref={spotifyRef} placeholder="Spotify Link (optional)" />
        <TextEditor ref={bodyRef} placeholder="Enter your message here." />

        <ImageUpload ref={imageRef} />

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
    </main>
  );
}
