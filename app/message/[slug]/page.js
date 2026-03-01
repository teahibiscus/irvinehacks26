import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import MessageViewer from "./MessageViewer";

export default async function ViewMessage({ params }) {
  const { slug } = await params;

  // Fetch the message/postcard data from Supabase
  const { data: message, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  // Handle if the message doesn't exist
  if (error || !message) {
    notFound();
  }

  return <MessageViewer message={message} />;
}
