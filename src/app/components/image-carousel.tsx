"use client";

import React, { useEffect, useRef, useState } from "react";
import ImageWithFallback from "./image-with-fallback";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  images: string[];
  alt?: string;
  className?: string;
};

export default function ImageCarousel({
  images,
  alt = "",
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setHasOverflow(el.scrollWidth > el.clientWidth + 1);
    };

    const updateEnds = () => {
      const left = el.scrollLeft > 5;
      const maxLeft = el.scrollWidth - el.clientWidth - 5;
      const right = el.scrollLeft < Math.max(0, maxLeft);
      setCanScrollLeft(left);
      setCanScrollRight(right && el.scrollWidth > el.clientWidth + 1);

      const idx =
        el.clientWidth > 0 ? Math.round(el.scrollLeft / el.clientWidth) : 0;
      setActiveIndex(Math.min(Math.max(0, idx), images.length - 1));
    };

    checkOverflow();
    updateEnds();

    const ro = new ResizeObserver(() => {
      checkOverflow();
      updateEnds();
    });
    ro.observe(el);

    const onScroll = () => updateEnds();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateEnds);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      window.removeEventListener("resize", updateEnds);
    };
  }, [images]);

  const scrollToIndex = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const left =
      Math.min(Math.max(0, index), images.length - 1) * el.clientWidth;
    el.scrollTo({ left, behavior: "smooth" });
  };

  const scrollByAmount = (dir: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth);
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!images || images.length === 0) {
    return (
      <div
        className={`w-full h-full bg-stone-100 flex items-center justify-center ${className}`}>
        <div className="text-sm text-stone-500">No image</div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div
        ref={containerRef}
        className="img-slider scroll-smooth snap-mandatory snap-x flex overflow-x-auto h-full w-full">
        {images.map((src, i) => (
          <div
            key={i}
            className="min-w-full h-full object-cover object-top snap-center">
            <ImageWithFallback src={src} alt={alt} />
          </div>
        ))}
      </div>

      {/* Left button */}
      {hasOverflow && (
        <button
          aria-label="Previous image"
          className="scroll-btn left"
          onClick={() => scrollByAmount("left")}
          style={{
            zIndex: 2,
            opacity: canScrollLeft ? 1 : 0,
            pointerEvents: canScrollLeft ? "auto" : "none",
          }}>
          <FaChevronLeft />
        </button>
      )}

      {/* Right button */}
      {hasOverflow && (
        <button
          aria-label="Next image"
          className="scroll-btn right"
          onClick={() => scrollByAmount("right")}
          style={{
            zIndex: 2,
            opacity: canScrollRight ? 1 : 0,
            pointerEvents: canScrollRight ? "auto" : "none",
          }}>
          <FaChevronRight />
        </button>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to image ${idx + 1}`}
              onClick={() => scrollToIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${activeIndex === idx ? "bg-stone-900" : "bg-stone-300"}`}></button>
          ))}
        </div>
      )}
    </div>
  );
}
