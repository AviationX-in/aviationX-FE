import { brands } from '@/utils/data/product';
import Shopbybrand from './Shopbybrand';

export function CarouselFour() {
  return (
    <section className="container mx-auto px-4 mb-12">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">Shop by Brand</h2>
      <Shopbybrand
        items={brands.map((brand, index) => (
          <div key={index} className="p-4">
            <img
              src={brand.image || '/placeholder.svg'}
              alt={brand.name}
              width={200}
              height={100}
              className="w-full h-auto object-contain"
            />
            <p className="text-center mt-2">{brand.name}</p>
          </div>
        ))}
        itemsPerSlide={4}
      />
    </section>
  );
}
