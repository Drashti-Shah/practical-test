import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { CarouselProps } from "@/utils/types";

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const getSlidesPerView = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 1024) return 3;
      if (window.innerWidth > 768) return 2;
      return 1;
    }
    return 3;
  }, []);

  const slidesToShow = useMemo(() => getSlidesPerView(), [getSlidesPerView]);

  const maxIndex = useMemo(
    () => Math.max(0, images?.length - slidesToShow || 0),
    [images?.length, slidesToShow]
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === maxIndex ? 0 : prevIndex + 1
    );
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  }, [maxIndex]);

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart !== null && touchEnd !== null) {
      if (touchStart - touchEnd > 75) nextSlide();
      if (touchStart - touchEnd < -75) prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setCurrentIndex(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isAutoPlay) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlay, nextSlide]);

  if (!images || images.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p>No images available for the carousel.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-9xl mx-auto overflow-hidden md:px-8">
      <div
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        <button
          onClick={prevSlide}
          className="hidden md:block absolute left-[-40px] top-1/2 -translate-y-1/2 z-10 bg-white p-3 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-8 w-8 text-gray-700" />
        </button>

        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={image.ID}
              className={`relative ${
                index === 0 || index === images.length - 1
                  ? "pl-0 pr-4"
                  : "px-4 md:px-6"
              } w-full md:w-1/2 lg:w-1/3 flex-shrink-0`}
            >
              <div className="relative h-[300px] md:h-[400px] lg:h-[480px] overflow-hidden shadow-lg">
                <Image
                  src={image.image_url}
                  alt={image.post_title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/95 to-transparent" />
                <h3 className="absolute bottom-6 left-0 w-full pb-4 text-center text-white text-[18px] md:text-[18px] lg:text-[28px] font-medium tracking-wider uppercase leading-8">
                  {image.post_title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="hidden md:block absolute right-[-40px] top-1/2 -translate-y-1/2 z-10 bg-white p-3 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-8 w-8 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
