"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import { getSpotifyToken } from "../../actions";

export default function PostcardClient({ postcard }) {
  //   const [audio, setAudio] = useState(null);
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     async function setupAudio() {
  //       try {
  //         setLoading(true);
  //         const token = await getSpotifyToken();

  //         // 1. Robust ID Extraction
  //         let trackId = "";

  //         // This checks for the main part of the URL regardless of 'open' or 'intl-xx'
  //         if (postcard.song.includes("spotify.com")) {
  //           const parts = postcard.song.split("/track/");
  //           if (parts.length > 1) {
  //             // This grabs the ID and ignores everything after it (?si=, etc.)
  //             trackId = parts[1].split("?")[0].split("/")[0];
  //           }
  //         } else {
  //           trackId = postcard.song.trim();
  //         }

  //         if (!trackId || trackId.length < 15) {
  //           throw new Error(`Invalid Track ID extracted: ${trackId}`);
  //         }

  //         console.log("Fetching Spotify data for ID:", trackId);

  //         // 2. Fetch with the CORRECT syntax (Notice the $)
  //         const res = await fetch(
  //           `https://api.spotify.com/v1/tracks/${trackId}`,
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           },
  //         );

  //         if (!res.ok) throw new Error("Failed to fetch from Spotify API");

  //         const trackData = await res.json();
  //         console.log("does it have a preview?", trackData.preview_url);

  //         // 3. Set Audio if preview exists
  //         if (trackData.preview_url) {
  //           console.log("Preview found! Setting audio...");
  //           const newAudio = new Audio(trackData.preview_url);
  //           newAudio.load();
  //           setAudio(newAudio);
  //         } else {
  //           console.warn("This song has no 30-second preview available.");
  //         }
  //       } catch (error) {
  //         console.error("Audio Setup Error:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }

  //     if (postcard.song) setupAudio();
  //   }, [postcard.song]);
  //   console.log("Audio setup complete. Audio object:", audio);

  //   const playMusic = () => {
  //     console.log("Play button clicked");
  //     if (audio) {
  //       audio.play().catch(() => console.log("User must interact first!"));
  //     } else if (loading) {
  //       console.log("Audio is still loading");
  //     } else {
  //       console.log("No audio available to play");
  //     }
  //     console.log("Audio state:", audio);
  //     console.log("attempted to play:", audio.src);
  //   };

  return (
    <div>
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
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: "12px" }}
        src={`https://open.spotify.com/embed/track/${postcard.song}?utm_source=generator`}
        width="100%"
        height="352"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}
