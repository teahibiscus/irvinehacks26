import { supabase } from "@/lib/supabase";
import SentClient from "./SentClient";

// Server component will fetch the postcard and send it down to the client
export default async function SentPage({ params }) {
  const { slug } = await params;
  const { data: postcard, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !postcard) {
    // could also render 404 message but for now just notFound()
    // next/navigation notFound can't be used directly in async server component?
    // we could throw or render null
    return null;
  }

  return <SentClient slug={slug} postcard={postcard} />;
}
