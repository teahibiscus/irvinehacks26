import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { notFound } from "next/navigation";
// import { useEffect, useState } from "react";
// import { getSpotifyToken } from "../actions";

export default async function ViewPostcard({ params }) {
  // 1. Get the slug from the URL parameters
  const { slug } = await params;

  // 2. Fetch the postcard data from Supabase
  console.log("Fetching postcard with slug:", slug);
  const { data: postcard, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  // 3. Handle if the postcard doesn't exist
  if (error || !postcard) {
    notFound();
  }

  // const [audio, setAudio] = useState(null);

  // useEffect(() => {
  //   async function setupAudio() {
  //     // 1. Call the Server Action directly!
  //     const token = await getSpotifyToken();
  //     if (!token) return;

  //     // 2. Extract the ID from the URL
  //     const trackId = postcard.song.split("/track/")[1]?.split("?")[0];

  //     // 3. Get the track metadata
  //     const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const trackData = await res.json();

  //     if (trackData.preview_url) {
  //       setAudio(new Audio(trackData.preview_url));
  //     }
  //   }

  //   setupAudio();
  // }, [postcard.song]);

  // const playMusic = () => {
  //   if (audio) {
  //     audio.play().catch(() => console.log("User must interact first!"));
  //   }
  // };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "12px",
          maxWidth: "500px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          {postcard.title}
        </h1>

        {/* Postcard Image */}
        <div
          style={{
            position: "relative",
            width: "300px",
            height: "500px",
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
          <Image
            src={postcard.image}
            alt="Postcard Image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
          From: {postcard.receiver}
        </p>
      </div>

      {/* <div onClick={playMusic} className="postcard-container">
        <h1>{postcard.title}</h1>
        <p>Tap anywhere to hear the music</p>
      </div> */}
    </main>
  );
}
