"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Prisma } from "@prisma/client";

export default function TrainingCarousel({trainings}: { trainings: Prisma.TrainingGetPayload<{}>[] }) {
    

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
                    {trainings.map((training, i) => (
                        <div key={i} className="rounded-lg min-w-[100%] sm:min-w-[50%] lg:min-w-[33.33%] dark:bg-slate-900 bg-slate-100 overflow-hidden mx-1">
                            <Link href="#">
                            <Image
                                src={training.uploadedFiles[0]}
                                alt={training.title}
                                width={556}
                                height={556}
                                className="w-full h-auto object-cover rounded-lg bg-red-400"
                            />
                            </Link>
                            <h2 className="text-xl text-center dark:text-slate-200 text-slate-800 my-2">
                                {training.title}
                            </h2>
                            <p className="px-4 line-clamp-3 text-slate-800 dark:text-slate-300 mb-2">
                               {training.description}
                            </p>
                            <div className="flex justify-between items-center px-4 py-2">
                            <Link href="#" className='bg-lime-700 hover:bg-lime-600 duration-300 transition-all text-slate-50 rounded-md px-4 py-2'>
                              Read more
                            </Link>
                            <Link href="#" className="text-slate-800 dark:text-slate-100">Talk to the Consultant</Link>
                            </div>
                        </div>
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
