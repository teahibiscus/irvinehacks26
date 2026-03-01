"use server";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function createPostcard(formData) {
  const title = formData.get("title");
  const receiverName = formData.get("receiverName");
  const cardContent = formData.get("cardContent");
  const songLink = formData.get("songLink");
  const imageFile = formData.get("image");

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

  // 3. Save Postcard info to Database
  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        receiver: receiverName,
        title,
        content: cardContent,
        image: publicUrl,
        song: songLink,
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
  const auth = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
      // This tells Next.js to cache this token for 50 mins (3000s)
      // so you don't hit Spotify's rate limit!
      next: { revalidate: 3000 },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Spotify Auth Error:", error);
    return null;
  }
}
