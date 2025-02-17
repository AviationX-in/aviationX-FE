import { Button } from '../atoms/Button';
import { Card, CardContent, CardFooter } from '../molecules/Card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel';
import bannerImg1 from '../../assets/bannerImg/bannerImg1.jpg';
import bannerImg2 from '../../assets/bannerImg/bannerImg2.jpg';
import { Link } from 'react-router';

const products = [
  { id: 1, name: 'Stylish Watch', price: 199.99, image: bannerImg1 },
  { id: 2, name: 'Leather Bag', price: 149.99, image: bannerImg1 },
  { id: 3, name: 'Sunglasses', price: 89.99, image: bannerImg1 },
  { id: 4, name: 'Sneakers', price: 129.99, image: bannerImg2 },
  { id: 5, name: 'Headphones', price: 179.99, image: bannerImg1 },
  { id: 6, name: 'Headphones', price: 179.99, image: bannerImg2 },
  { id: 7, name: 'Headphones', price: 179.99, image: bannerImg2 },
];

export function CarouselTwo() {
  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-2 ml-16">
        <h2 className="text-3xl font-bold text-primary">Explore the Products</h2>
      </div>
      <div className="w-full bg-gray-50 p-4 flex justify-center">
        <div className="w-[95%] cursor-pointer">
          <Carousel
            opts={{
              align: 'start',
              slidesToScroll: 1,
            }}
            className="relative"
          >
            <CarouselContent className="-ml-2 flex">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="p-2 h-full">
                    <Card className="h-full flex flex-col shadow-md rounded-lg overflow-hidden">
                      <CardContent className="flex-grow p-4">
                        <Link to={`/product/details`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-[10rem] object-cover"
                          />
                        </Link>

                        <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                        <p className="text-xl font-bold text-gray-600">
                          ${product.price.toFixed(2)}
                        </p>
                      </CardContent>
                      <CardFooter className="p-4">
                        <Button variant="outline">Add to Cart</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
