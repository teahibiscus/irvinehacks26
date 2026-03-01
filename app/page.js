import { createPostcard } from "./actions";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Create a Postcard</h1>
      <form
        action={createPostcard}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        <input name="title" placeholder="Postcard Title" required />
        <input name="receiverName" placeholder="Their Name" required />
        <input name="cardContent" placeholder="What would you like to say?" required />
        <input name="songLink" placeholder="Music Link (Spotify/YouTube)" />
        <input type="file" name="image" accept="image/*" required />
        <button type="submit">Generate Link</button>
      </form>
    </main>
  );
}
