import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Banner = () => {
  const progressBar = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressBar.current) {
      progressBar.current.style.width = `${(1 - progress) * 100}%`;
    }
  };

  const slides = [
    {
      src: "https://i.postimg.cc/7Pmkmvr6/3d-rendering-cartoon-shopping-cart.png",
      title: "Smart Shopping",
      desc: "Experience hassle-free shopping with our modern solutions.",
    },
    {
      src: "https://i.postimg.cc/fRbpykVj/2303-w061-n005-115-B-p1-116.jpg",
      title: "Fresh Arrivals",
      desc: "Discover the latest trends in our collection today.",
    },
    {
      src: "https://i.postimg.cc/Kjq7Hcmx/interior-clothing-store-with-stylish-merchandise-racks-fashionable-brand-design-casual-wear-modern-b.jpg",
      title: "Trendy Outfits",
      desc: "Stay fashionable with premium clothing at great prices.",
    },
    {
      src: "https://i.postimg.cc/PJyTDx1b/man-neon-suit-sits-chair-with-neon-sign-that-says-word-it.jpg",
      title: "Neon Vibes",
      desc: "Step into the future with our modern and edgy designs.",
    },
  ];

  return (
    <div className=" container mx-auto mt-8 relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
            clickable: true,
          }}
        navigation={true}
        effect="fade"
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="rounded-2xl overflow-hidden shadow-xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-64 sm:h-80 md:h-[450px]">
              <img
                src={slide.src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

              {/* Text content */}
              <div className="absolute bottom-8 left-8 text-white max-w-md">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base md:text-lg opacity-90">
                  {slide.desc}
                </p>
                <button className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Autoplay progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
          <div
            ref={progressBar}
            className="h-full bg-blue-600 transition-all duration-300"
          ></div>
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
