"use server";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function createPostcard(formData) {
  const title = formData.get("title");
  const receiverName = formData.get("receiverName");
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
