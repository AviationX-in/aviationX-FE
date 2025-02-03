import { useState, useEffect, useRef } from 'react';
import { bannerImages } from '@/utils/data/product';

const CaraouselOne = () => {
  const [currentslide, setCurrentSlide] = useState(0);

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleDots = (idx: number) => {
    if (timeout.current !== null) {
      clearTimeout(timeout.current);
    }
    setCurrentSlide(idx);
  };

  useEffect(() => {
    const changeBannerImg = () => {
      timeout.current = setTimeout(() => {
        setCurrentSlide(currentslide < bannerImages.length - 1 ? currentslide + 1 : 0);
      }, 3000);
    };
    changeBannerImg();
    return () => {
      clearTimeout(timeout.current as NodeJS.Timeout);
    };
  }, [currentslide, bannerImages.length]);

  return (
    <div className="relative flex items-center">
      <div className="w-full h-[300px]">
        <img
          src={bannerImages[currentslide]}
          alt=""
          className="w-[100%] h-[100%] object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 left-[50%] translate-x-[-50%] flex justify-center gap-2 py-4 cursor-pointer">
        {bannerImages.map((_, idx) => (
          <div
            key={idx}
            className={`rounded-full h-3 w-3 ${idx === currentslide ? 'bg-blue-500' : 'bg-white'}`}
            onClick={() => handleDots(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CaraouselOne;
