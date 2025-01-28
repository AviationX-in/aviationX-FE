import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import CaraouselOne from '../organisms/CaraouselOne';
import { CarouselTwo } from '../organisms/CaraouselTwo';
import { CarouselThree } from '../organisms/CaraouselThree';
import { CarouselFour } from '../organisms/CaraouselFour';
import { categories2 } from '@/utils/data/product';

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-[100vh] w-full">
      <Header />
      <div className="bg-primary text-primary-foreground py-2 text-center tracking-wider font-bold">
        THE AVIATION SUPERSTORE FOR ALL YOUR AIRCRAFT NEEDS
      </div>
      <CaraouselOne />
      <section className="container mx-auto px-4 mb-12 mt-4">
        <h2 className="text-3xl font-bold mb-8 text-blue-600 text-center">Explore Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories2.map((category, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-blue-600 text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <span className="text-xl font-semibold">{category.name}</span>
            </div>
          ))}
        </div>
      </section>
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
