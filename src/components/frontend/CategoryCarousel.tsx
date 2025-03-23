"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { BaggageClaim, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import Product from "./Product";

export default function CategoryCarousel({ products }: { products: Prisma.ProductGetPayload<{}>[] }) {


    const [emblaRef, embla] = useEmblaCarousel({
        loop: true,
        align: "start",
        containScroll: "trimSnaps",
        slidesToScroll: 1,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const totalDots = 3; // Always show 3 dots
    const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Autoplay function
    const startAutoplay = useCallback(() => {
        stopAutoplay(); // Reset previous interval
        autoplayRef.current = setInterval(() => {
            if (embla) embla.scrollNext();
        }, 3000); // Change slide every 3 seconds
    }, [embla]);

    const stopAutoplay = useCallback(() => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            autoplayRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (!embla) return;

        const updateScrollState = () => {
            const totalSlides = embla.slideNodes().length;
            const newIndex = Math.floor((embla.selectedScrollSnap() / totalSlides) * totalDots);
            setSelectedIndex(newIndex);
        };

        embla.on("select", updateScrollState);
        embla.on("pointerDown", stopAutoplay); // Stop autoplay on interaction
        updateScrollState();
        startAutoplay();

        return () => stopAutoplay(); // Cleanup
    }, [embla, startAutoplay, stopAutoplay]);

    const scrollPrev = useCallback(() => {
        stopAutoplay();
        embla && embla.scrollPrev();
    }, [embla, stopAutoplay]);

    const scrollNext = useCallback(() => {
        stopAutoplay();
        embla && embla.scrollNext();
    }, [embla, stopAutoplay]);

    const scrollTo = useCallback(
        (dotIndex: number) => {
            if (!embla) return;
            stopAutoplay();
            const totalSlides = embla.slideNodes().length;
            const targetSlide = Math.round((dotIndex / totalDots) * totalSlides);
            embla.scrollTo(targetSlide);
        },
        [embla, stopAutoplay]
    );

    return (
        <div className="relative group" onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
            {/* Left Arrow */}
            <button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            {/* Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {products.map((product, i: number) => (
                <Product product={product} key={i} />
                    ))}
                </div>

            </div>

            {/* Right Arrow */}
            <button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition opacity-0 group-hover:opacity-100"
            >
                <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>

            {/* 3 Dots */}
            <div className="flex justify-center mt-4 space-x-2">
                {[...Array(totalDots)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`w-2 h-2 rounded-full transition-all ${selectedIndex === index ? "bg-slate-900 w-4 h-4" : "bg-gray-400"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
