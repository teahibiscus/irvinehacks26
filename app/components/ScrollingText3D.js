"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * ScrollingText3D - Animates text lines through 3D space like a perspective conveyor belt
 * 
 * @param {string[]} lines - Array of text lines to display
 * @param {boolean} autoPlay - Whether to auto-scroll continuously
 * @param {number} speed - Animation speed multiplier (affects transition duration)
 * @param {function} onLineChange - Callback when a new line reaches center focus
 */
export default function ScrollingText3D({
  lines = [],
  autoPlay = false,
  speed = 1.0,
  onLineChange = null,
}) {
  const VISIBLE_SLOTS = 7; // Show multiple slots for the traveling effect
  const CENTER_SLOT = Math.floor(VISIBLE_SLOTS / 2); // Center is at index 3

  const containerRef = useRef(null);
  const slotsRef = useRef([]);
  const offsetRef = useRef(-CENTER_SLOT); // Start with first line at center
  const targetOffsetRef = useRef(-CENTER_SLOT); // Start with first line at center
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);
  const lastCenterIndexRef = useRef(0); // Start tracking from first line
  const isAnimatingRef = useRef(false);

  /**
   * Compute all style properties for a given normalized position
   * @param {number} t - Position from -1 (top) to 0 (center) to +1 (bottom)
   * @returns {object} Style properties for the slot
   */
  const computeSlotStyle = useCallback((t) => {
    // t represents vertical position: -1 = top, 0 = center, 1 = bottom
    const distanceFromCenter = Math.abs(t); // 0 at center, 1 at edges
    
    // Scale: smaller at edges, largest at center
    // Start at 0.2 (20% size), grow to 1.0 (100% size) at center
    const scale = 1 - (distanceFromCenter * 0.8); // 1.0 at center, 0.2 at edges
    
    // Opacity: transparent at edges, opaque at center
    const opacity = 1 - Math.pow(distanceFromCenter, 0.8); // 1.0 at center, ~0 at edges
    
    // Vertical position: evenly distributed from top to bottom
    // Map t (-1 to 1) to screen position (top to bottom)
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const translateY = t * (screenHeight * 0.4); // Travel 80% of screen height
    
    // Blur for depth effect
    const blur = distanceFromCenter * 4; // 0px at center, 4px at edges
    
    return {
      fontSize: "3rem",
      opacity: Math.max(0, opacity),
      transform: `translateY(${translateY}px) scale(${scale})`,
      filter: `blur(${blur}px)`,
    };
  }, []);

  /**
   * Interpolate styles between two positions for smooth animation
   */
  const interpolateStyles = useCallback((style1, style2, t) => {
    // Simple linear interpolation for demonstration
    // In production, could use more sophisticated easing
    return {
      fontSize: style1.fontSize, // Font size can be discrete
      opacity: style1.opacity * (1 - t) + style2.opacity * t,
      transform: style1.transform, // Transform is computed per-frame
      filter: style1.filter,
    };
  }, []);

  /**
   * Update slot elements with current animation state
   */
  const updateSlots = useCallback(() => {
    const offset = offsetRef.current;
    const baseIndex = Math.floor(offset);
    const fraction = offset - baseIndex;

    // Check if center line changed
    const currentCenterIndex = baseIndex + CENTER_SLOT;
    if (
      onLineChange &&
      currentCenterIndex !== lastCenterIndexRef.current &&
      currentCenterIndex >= 0 &&
      currentCenterIndex < lines.length
    ) {
      lastCenterIndexRef.current = currentCenterIndex;
      onLineChange(currentCenterIndex);
    }

    // Update each slot
    slotsRef.current.forEach((slotEl, slotIndex) => {
      if (!slotEl) return;

      // Calculate which line appears in this slot
      const lineIndex = baseIndex + slotIndex;
      
      // Compute normalized position for this slot
      // -1 = top of screen, 0 = center, 1 = bottom of screen
      const centerOffset = slotIndex - CENTER_SLOT - fraction;
      const normalizedPos = centerOffset / (VISIBLE_SLOTS / 2); // Positive direction (top to bottom)

      // Get style for this position
      const style = computeSlotStyle(normalizedPos);

      // Apply styles directly to DOM for performance
      slotEl.style.fontSize = style.fontSize;
      slotEl.style.opacity = style.opacity;
      slotEl.style.transform = style.transform;
      slotEl.style.filter = style.filter;

      // Update text content
      if (lineIndex >= 0 && lineIndex < lines.length) {
        slotEl.textContent = lines[lineIndex];
        slotEl.style.visibility = "visible";
      } else {
        slotEl.style.visibility = "hidden";
      }
    });
  }, [lines, onLineChange, computeSlotStyle, CENTER_SLOT, VISIBLE_SLOTS]);

  /**
   * Animation loop with smooth easing
   */
  const animate = useCallback((currentTime) => {
    if (lastTimeRef.current === 0) {
      lastTimeRef.current = currentTime;
    }

    const deltaTime = (currentTime - lastTimeRef.current) / 1000;
    lastTimeRef.current = currentTime;

    // Smooth interpolation toward target
    const diff = targetOffsetRef.current - offsetRef.current;
    
    if (Math.abs(diff) > 0.001) {
      // Ease toward target (exponential smoothing)
      const easingFactor = 1 - Math.pow(0.001, deltaTime * speed);
      offsetRef.current += diff * easingFactor;
      isAnimatingRef.current = true;
    } else {
      // Snap to target when close enough
      offsetRef.current = targetOffsetRef.current;
      isAnimatingRef.current = false;
    }

    updateSlots();
    rafRef.current = requestAnimationFrame(animate);
  }, [speed, updateSlots]);

  /**
   * Navigate to next/previous line
   */
  const navigateToLine = useCallback((direction) => {
    if (isAnimatingRef.current) return; // Prevent navigation during animation

    const currentIndex = Math.round(targetOffsetRef.current + CENTER_SLOT); // Adjust for offset
    let newIndex = currentIndex + direction;

    // Clamp to valid range
    newIndex = Math.max(0, Math.min(lines.length - 1, newIndex));

    if (newIndex !== currentIndex) {
      targetOffsetRef.current = newIndex - CENTER_SLOT; // Adjust target to keep line centered
    }
  }, [lines.length, CENTER_SLOT]);

  /**
   * Handle manual scroll (mouse wheel, touch, etc.)
   */
  const handleManualScroll = useCallback((delta) => {
    if (!autoPlay) {
      navigateToLine(delta > 0 ? 1 : -1);
    }
  }, [autoPlay, navigateToLine]);

  /**
   * Setup event listeners
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      handleManualScroll(e.deltaY);
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        navigateToLine(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        navigateToLine(-1);
      }
    };

    const handleClick = () => {
      navigateToLine(1);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleManualScroll, navigateToLine]);

  /**
   * Start/stop animation loop
   */
  useEffect(() => {
    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  /**
   * Initialize on mount - trigger onLineChange for first line and update display
   */
  useEffect(() => {
    if (onLineChange && lines.length > 0) {
      onLineChange(0); // Notify that we're starting on line 0
    }
    updateSlots(); // Ensure first line is displayed immediately
  }, [onLineChange, lines.length, updateSlots]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden cursor-pointer"
      style={{
        perspective: "1000px",
        backgroundColor: "transparent",
      }}
      tabIndex={0}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
      >
        {Array.from({ length: VISIBLE_SLOTS }).map((_, index) => (
          <div
            key={index}
            ref={(el) => (slotsRef.current[index] = el)}
            className="absolute whitespace-pre-wrap text-center transition-none pointer-events-none px-8"
            style={{
              fontFamily: "var(--font-courgette), sans-serif",
              fontWeight: "600",
              willChange: "transform, opacity, filter",
              transformOrigin: "center center",
              maxWidth: "90%",
              fontSize: "3rem",
              lineHeight: "1.4",
            }}
          >
            {/* Content will be set via direct DOM manipulation */}
          </div>
        ))}
      </div>
    </div>
  );
}
