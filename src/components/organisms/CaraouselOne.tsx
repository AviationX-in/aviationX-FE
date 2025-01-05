import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import bannerImg1 from '../../assets/bannerImg/bannerImg1.jpg';
import bannerImg2 from '../../assets/bannerImg/bannerImg2.jpg';

const CaraouselOne = () => {
  const bannerImages = [bannerImg1, bannerImg2];
  const [currentslide, setCurrentSlide] = useState(0);

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handelLeft = () => {
    clearTimeout(timeout.current);
    setCurrentSlide(currentslide > 0 ? currentslide - 1 : bannerImages.length - 1);
  };

  const handleRight = () => {
    clearTimeout(timeout.current);
    setCurrentSlide(currentslide < bannerImages.length - 1 ? currentslide + 1 : 0);
  };

  const handleDots = (idx: number) => {
    clearTimeout(timeout.current);
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
      clearTimeout(timeout);
    };
  }, [currentslide, bannerImages.length]);

  return (
    <div className="relative flex items-center">
      <div className="bg-red-400 absolute left-2 text-8xl cursor-pointer" onClick={handelLeft}>
        <ChevronLeft />
      </div>

      <div className="w-full h-[300px]">
        <img src={bannerImages[currentslide]} alt="" className="w-[100%] h-[100%] object-cover" />
      </div>

      <div className="bg-red-400 absolute right-2 text-8xl cursor-pointer" onClick={handleRight}>
        <ChevronRight />
      </div>

      <div className="absolute bottom-0 left-[50%] translate-x-[-50%] flex justify-center gap-2 py-4 cursor-pointer">
        {bannerImages.map((item, idx) => (
          <div
            key={idx}
            className={`rounded-full h-3 w-3 ${idx === currentslide ? 'bg-white' : 'bg-red-200'}`}
            onClick={() => handleDots(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CaraouselOne;
