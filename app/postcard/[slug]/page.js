import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ViewPostcard({ params }) {
  // 1. Get the slug from the URL parameters
  const { slug } = await params;

  // 2. Fetch the postcard data from Supabase
  const { data: postcard, error } = await supabase
    .from("postcards")
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
            width: "100%",
            height: "300px",
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
          <Image
            src={postcard.image_url}
            alt="Postcard Image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
          From: {postcard.sender_name}
        </p>

        {/* Music Link Section */}
        {/* {postcard.song_link && (
          <div
            style={{
              marginTop: "1.5rem",
              borderTop: "1px solid #eee",
              paddingTop: "1rem",
            }}
          >
            <p>🎵 Listen to this song while viewing:</p>
            <a
              href={postcard.song_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0070f3", textDecoration: "underline" }}
            >
              Open Song Link
            </a>
          </div>
        )} */}
      </div>
    </main>
  );
}
