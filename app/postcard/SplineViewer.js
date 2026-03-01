'use client';

import Spline from '@splinetool/react-spline';
import { useEffect, useRef } from 'react';

export default function SplineViewer({ postcard }) {
  const splineRef = useRef(null);

  const handleLoad = (splineApp) => {
    splineRef.current = splineApp;
    
    // Update the 'letter content' text object with postcard content
    if (splineApp && postcard.content) {
      try {
        const textObject = splineApp.getObjectByName('letter content');
        if (textObject) {
          splineApp.setVariable('letterContent', postcard.content);
          textObject.text = postcard.content;
        }
      } catch (error) {
        console.log('Text object not found or unable to update:', error);
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
