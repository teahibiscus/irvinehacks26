"use server";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function createPostcard(content) {
  const title = content.title;
  const receiverName = content.receiver;
  const cardContent = content.body;
  const songLink = content.spotifyLink;
  const imageFile = content.imageFile;

  // 1. Upload Image to Supabase Storage
  const fileName = `${Date.now()}-${imageFile.name}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("postcard-images")
    .upload(fileName, imageFile);

  if (uploadError) throw new Error("Image upload failed");

  // 2. Get the Public URL of the uploaded image
  const {
    data: { publicUrl },
  } = supabase.storage.from("postcard-images").getPublicUrl(fileName);
  let trackId = "";

  // This checks for the main part of the URL regardless of 'open' or 'intl-xx'
  if (songLink.includes("spotify.com")) {
    const parts = songLink.split("/track/");
    if (parts.length > 1) {
      // This grabs the ID and ignores everything after it (?si=, etc.)
      trackId = parts[1].split("?")[0].split("/")[0];
    }
  } else {
    trackId = songLink.trim();
  }

  if (!trackId || trackId.length < 15) {
    throw new Error(`Invalid Track ID extracted: ${trackId}`);
  }

  // 3. Save Postcard info to Database
  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        receiver: receiverName,
        title: title,
        content: cardContent,
        image: publicUrl,
        song: trackId,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("DB error:", error);
    throw new Error("Failed to create postcard");
  }

  // 4. Redirect to the newly created postcard page
  redirect(`/postcard/${data.slug}`);
}

export async function getSpotifyToken() {
  //   const auth = Buffer.from(
  //     `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  //   ).toString("base64");

  //   const response = await fetch("https://accounts.spotify.com/api/token", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Basic ${auth}`,
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: new URLSearchParams({
  //       grant_type: "client_credentials",
  //     }),
  //     // This tells Next.js to cache this token for 50 mins (3000s)
  //     // so you don't hit Spotify's rate limit!
  //     next: { revalidate: 3000 },
  //   });

  //   if (!response.ok) {
  //     const errorText = await response.text(); // Read as TEXT, not JSON
  //     console.error("Spotify API Error Text:", errorText);
  //     return null;
  //   }

  //   const data = await response.json();
  //   if (data.error) {
  //     console.error("Spotify Auth Error:", data.error);
  //     return null;
  //   }
  //   console.log("Spotify Token fetched successfully", data.access_token);
  //   return data.access_token;

  // Mock token for testing without hitting Spotify API
  const clientID = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  // 1. Check if variables actually exist
  if (!clientID || !clientSecret) {
    console.error("Environment variables are MISSING.");
    return null;
  }

  const auth = Buffer.from(`${clientID}:${clientSecret}`).toString("base64");

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "client_credentials" }),
    });

    // 2. If Spotify is mad, read the TEXT error, not JSON
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Spotify Auth Failed. Error text:", errorText);
      return null;
    }

    // 3. If everything is fine, then parse JSON
    const data = await response.json();
    return data.access_token;
  } catch (err) {
    console.error("Connection error:", err);
    return null;
  }
}
