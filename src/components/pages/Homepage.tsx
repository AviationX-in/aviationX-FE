import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

import { CarouselTwo } from '../organisms/CaraouselTwo';
import { CarouselThree } from '../organisms/CaraouselThree';
import { CarouselFour } from '../organisms/CaraouselFour';

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-[100vh] w-full">
      <Header />
      <div className="w-full h-[1.25px] bg-gray-300"></div>
      <CarouselFour />
      <CarouselTwo />
      <CarouselThree />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};
export default Homepage;
