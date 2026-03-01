"use client";

import React from "react";
import SplineViewer from "@/app/postcard/SplineViewer";
import Link from "next/link";

export default function SentClient({ slug, postcard }) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const url = `${origin}/postcard/${slug}`;
  const splineViewerRef = React.useRef(null); // still keeping preview component but no animation needed

  const router = React.useRouter ? React.useRouter() : null;

  const copyLink = () => {
    // copy url first
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
    // navigate to a local page that embeds the spline scene
    if (router && router.push) {
      router.push("/spline");
    } else {
      window.location.href = "/spline";
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">Preview:</h1>
      {/* show spline preview */}
      <div className="w-full max-w-xl h-[600px] mb-6">
        <SplineViewer ref={splineViewerRef} postcard={postcard} />
      </div>
      <p className="mb-2">Share this link with your recipient:</p>
      <div className="flex items-center mb-6 space-x-2">
        <input
          type="text"
          readOnly
          value={url}
          className="border px-2 py-1 w-96"
        />
        <button
          onClick={copyLink}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Copy
        </button>
      </div>
      <Link
        href={`/postcard/${slug}`}
        className="text-blue-600 underline"
      >
        View postcard
      </Link>
    </main>
  );
}
