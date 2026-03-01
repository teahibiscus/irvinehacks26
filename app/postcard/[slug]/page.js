import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import SplineViewer from "../SplineViewer";
// import { useEffect, useState } from "react";
// import { getSpotifyToken } from "../actions";

export default async function ViewPostcard({ params }) {
  // 1. Get the slug from the URL parameters
  const { slug } = await params;

  // 2. Fetch the postcard data from Suacpabase
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

  return (
    <SplineViewer postcard={postcard} />
    // <main
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     padding: "2rem",
    //   }}
    // >
    //   <div
    //     style={{
    //       border: "1px solid #ccc",
    //       padding: "1rem",
    //       borderRadius: "12px",
    //       maxWidth: "500px",
    //       boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    //     }}
    //   >
    //     <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
    //       {postcard.title}
    //     </h1>

    //     {/* Spline 3D Postcard */}
    //     <SplineViewer postcard={postcard} />

    //     <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
    //       From: {postcard.receiver}
    //     </p>
    //   </div>

    //   {/* <div onClick={playMusic} className="postcard-container">
    //     <h1>{postcard.title}</h1>
    //     <p>Tap anywhere to hear the music</p>
    //   </div> */}
    // </main>
  );
}
