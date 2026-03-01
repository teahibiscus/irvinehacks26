"use client";

import React from "react";
import Spline from "@splinetool/react-spline";

// full‑page spline view for a specific scene
export default function SplineScenePage() {
  const url = "https://prod.spline.design/Y-TfGXYotIiZT6a2/scene.splinecode";
  return (
    <div className="w-screen h-screen">
      <Spline scene={url} />
    </div>
  );
}
