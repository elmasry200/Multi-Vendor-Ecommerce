"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Prisma } from "@prisma/client";
import Link from "next/link";


export default function HeroCarousel({banners}: { banners: Prisma.BannerGetPayload<{}>[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Update active dot when slide changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect(); // Initial state

    // Autoplay functionality
    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        emblaApi?.scrollNext();
      }, 3000); // Change slide every 3 seconds
    };

    startAutoplay();

    const stopAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };

    emblaApi.on("pointerDown", stopAutoplay); // Stop on user interaction
    emblaApi.on("pointerUp", startAutoplay); // Resume after interaction

    return () => stopAutoplay();
  }, [emblaApi, onSelect]);

  return (
    <div className="relative h-[300px] overflow-hidden">
      {/* Carousel */}
      <div ref={emblaRef} className="w-full h-full">
        <div className="flex">
          {banners.map((banner, i: number) => (
            <Link href={banner.link}  target="_blank" rel="noopener noreferrer"  key={i} className="flex-[0_0_100%] w-full h-[300px] relative">
              <Image src={banner.uploadedFiles[0]} alt={banner.title} fill className="object-cover" />
            </Link>
          ))}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-4 rounded-full"
      >
        <ChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-4 rounded-full"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              selectedIndex === index ? "bg-white w-4 h-4" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
