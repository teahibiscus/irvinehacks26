'use client';

import React, { useEffect, useRef, useImperativeHandle } from 'react';
import Spline from '@splinetool/react-spline';

// expose methods to parent via ref (triggerSendAnimation)
const SplineViewer = React.forwardRef(({ postcard }, ref) => {
  const splineRef = useRef(null);

  // allow parent to call triggerSendAnimation
  useImperativeHandle(ref, () => ({
    triggerSendAnimation: () => {
      const app = splineRef.current;
      if (!app) return;
      console.log('triggerSendAnimation called');
      // try default play method
      if (typeof app.play === 'function') {
        console.log('calling app.play()');
        app.play();
      }

      // If the scene has animations list, try to play each
      const scene = app.scene || {};
      if (scene.animations && Array.isArray(scene.animations)) {
        console.log('scene.animations available', scene.animations);
        scene.animations.forEach((anim) => {
          if (typeof anim.play === 'function') {
            console.log('playing anim', anim.name || anim);
            anim.play();
          }
        });
      }

      // attempt variable toggle (use the actual name from your design)
      if (typeof app.setVariable === 'function') {
        try {
          app.setVariable('isSending', true);
          console.log('setVariable isSending true');
        } catch (err) {
          console.log('setVariable isSending failed', err);
        }
      }
    },
  }));

  const handleLoad = (splineApp) => {
    splineRef.current = splineApp;
    console.log('Spline app loaded:', splineApp);
    console.log('Spline app keys:', Object.keys(splineApp));
    console.log('scene keys:', Object.keys(splineApp.scene || {}));
    console.log('scene variables:', splineApp.scene?.variables);
    console.log('scene animations:', splineApp.scene?.animations);

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

    // Update the 'receiver' text object with postcard content
    if (splineApp && postcard.receiver) {
      console.log('Updating Spline text with postcard receiver:', postcard.receiver);
      // try variable first (preferred for Spline designs)
      try {
        splineApp.setVariable('receiver', postcard.receiver);
      } catch (err) {
        console.log('Failed to set variable receiver:', err);
      }

      // fallback: attempt to find a node by name and update its text
      try {
        const maybeNode =
          (typeof splineApp.findNode === 'function' && splineApp.findNode('receiver')) ||
          (typeof splineApp.getObjectByName === 'function' && splineApp.getObjectByName('receiver')); // just in case
        if (maybeNode) {
          maybeNode.text = postcard.receiver;
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
});

export default SplineViewer;
