import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

import { CarouselTwo } from '../organisms/CaraouselTwo';
import { CarouselThree } from '../organisms/CaraouselThree';
import { CarouselFour } from '../organisms/CaraouselFour';
import NotificationBar from '../atoms/NotificationBar';
import CaraouselOne from '../organisms/CaraouselOne';

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-[100vh] w-full">
      <Header />
      <NotificationBar />
      <CaraouselOne />
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
