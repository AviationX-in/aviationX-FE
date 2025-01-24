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
    <div className="w-full py-6 bg-gray-50">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-primary mb-6">Explore the Products</h2>
      {/* Carousel */}
      <div className="w-full max-w-6xl mx-auto cursor-pointer">
        <Carousel className="relative">
          {/* Carousel Content */}
          <CarouselContent className="flex gap-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="shrink-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2"
              >
                <div className="p-2 h-full">
                  <Card className="h-full flex flex-col shadow-md rounded-lg overflow-hidden">
                    {/* Product Image */}
                    <CardContent className="flex-grow p-4">
                      <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                        <Link to={`/product/details`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                      </div>
                      {/* Product Info */}
                      <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
                      <p className="text-xl font-bold text-gray-600">${product.price.toFixed(2)}</p>
                    </CardContent>
                    {/* Add to Cart Button */}
                    <CardFooter className="p-4">
                      <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel Navigation */}
          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" />

          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" />
        </Carousel>
      </div>
    </div>
  );
}
