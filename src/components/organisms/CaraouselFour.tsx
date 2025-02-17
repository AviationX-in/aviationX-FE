import { brands } from '@/utils/data/product';

export function CarouselFour() {
  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-6 text-primary text-center ">Shop by Brand</h2>
      <section className="flex flex-wrap container mx-auto px-4 gap-8 justify-center">
        {brands.map((brand, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-400 p-2 bg-white shadow-lg">
              <img src={brand.image} alt={brand.name} className="w-full h-full object-contain" />
            </div>
            <p className="text-sm font-medium text-gray-700">{brand.name}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
