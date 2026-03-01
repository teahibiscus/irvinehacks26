'use client';

import Spline from '@splinetool/react-spline';
import { useEffect, useRef } from 'react';

export default function SplineViewer({ postcard }) {
  const splineRef = useRef(null);

  const handleLoad = (splineApp) => {
    splineRef.current = splineApp;
    console.log('Spline app loaded:', splineApp);
    console.log('Spline app keys:', Object.keys(splineApp));

    // Update the 'letter content' text object with postcard content
    if (splineApp && postcard.content) {
      console.log('Updating Spline text with postcard content:', postcard.content);
      // try variable first (preferred for Spline designs)
      try {
        splineApp.setVariable('letterContent', postcard.content);
      } catch (err) {
        console.log('Failed to set variable letterContent:', err);
      }

      // fallback: attempt to find a node by name and update its text
      try {
        const maybeNode =
          (typeof splineApp.findNode === 'function' && splineApp.findNode('letter content')) ||
          (typeof splineApp.getObjectByName === 'function' && splineApp.getObjectByName('letter content')); // just in case
        if (maybeNode) {
          maybeNode.text = postcard.content;
        }
      } catch (error) {
        console.log('Could not locate or update text node:', error);
      }
    }
  };

  return (
    // <div
    //   style={{
    //     width: "100%",
    //     maxWidth: "600px",
    //     height: "600px",
    //     borderRadius: "8px",
    //     overflow: "hidden",
    //     boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    //   }}
    // >
      <Spline 
        scene="https://prod.spline.design/8LOrf68LzmZ9jhvi/scene.splinecode"
        onLoad={handleLoad}
      />
    // </div>
  );
}
