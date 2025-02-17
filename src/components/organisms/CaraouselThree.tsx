import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel';
import bannerImg1 from '../../assets/bannerImg/bannerImg1.jpg';
import bannerImg2 from '../../assets/bannerImg/bannerImg2.jpg';

const products = [
  { id: 1, name: 'Stylish Watch', price: 199.99, image: bannerImg1 },
  { id: 2, name: 'Leather Bag', price: 149.99, image: bannerImg1 },
  { id: 3, name: 'Sunglasses', price: 89.99, image: bannerImg1 },
  { id: 4, name: 'Sneakers', price: 129.99, image: bannerImg2 },
  { id: 5, name: 'Headphones', price: 179.99, image: bannerImg1 },
  { id: 6, name: 'Headphones', price: 179.99, image: bannerImg2 },
  { id: 7, name: 'Headphones', price: 179.99, image: bannerImg2 },
];

export function CarouselThree() {
  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-2 ml-16">
        <h2 className="text-3xl font-bold text-primary">AviationX Best Seller</h2>
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
                  <article className="relative flex flex-col overflow-hidden rounded-lg border product-card h-full">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-all duration-300 hover:scale-125"
                      />
                    </div>
                    <div className="absolute top-0 left-0 m-2">
                      <p className="rounded-full bg-emerald-500 p-1 text-[10px] font-bold uppercase tracking-wide text-white">
                        25% OFF
                      </p>
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div className="mb-4">
                        <div className="mb-2 flex justify-between items-center">
                          <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                          <del className="text-sm text-gray-400">${20}</del>
                        </div>
                        <h3 className="text-md text-gray-800 dark:text-white">{product.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Lorem Ipsum is Lorem Ipsum, Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is
                          Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is
                          Lorem
                        </p>
                      </div>
                      <button className="mx-auto mt-auto flex h-10 w-10/12 items-stretch overflow-hidden rounded-md bg-gray-100 text-gray-600 hover:bg-emerald-600 hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-emerald-700">
                        <div className="flex-1 flex items-center justify-center text-xs uppercase">
                          Add to Cart
                        </div>
                        <div className="flex items-center justify-center bg-gray-200 px-4 text-xs dark:bg-gray-600">
                          +
                        </div>
                      </button>
                    </div>
                  </article>
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
