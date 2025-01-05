import { Card, CardContent } from '../molecules/Card';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import CaraouselOne from '../organisms/CaraouselOne';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../organisms/Carousel';

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <div className="bg-primary text-primary-foreground py-2 text-center tracking-wider font-bold">
        THE AVIATION SUPERSTORE FOR ALL YOUR AIRCRAFT NEEDS
      </div>
      <CaraouselOne />
      <div className="bg-red-700">
        <Carousel>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};
export default Homepage;
