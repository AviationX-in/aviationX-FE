import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import CaraouselOne from '../organisms/CaraouselOne';
import { CarouselTwo } from '../organisms/CaraouselTwo';
import { CarouselThree } from '../organisms/CaraouselThree';
import { CarouselFour } from '../organisms/CaraouselFour';

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-[100vh] w-full">
      <Header />
      <div className="bg-primary text-primary-foreground py-2 text-center tracking-wider font-bold">
        THE AVIATION SUPERSTORE FOR ALL YOUR AIRCRAFT NEEDS
      </div>
      <CaraouselOne />
      <CarouselTwo />
      <CarouselThree />
      <CarouselFour />

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};
export default Homepage;
