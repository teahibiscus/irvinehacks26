import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import PostcardClient from "./postcardClient";

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
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <PostcardClient postcard={postcard} />
    </main>
  );
}
