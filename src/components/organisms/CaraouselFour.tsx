import { brands } from '@/utils/data/product';

export function CarouselFour() {
  return (
    <div className="mb-12 mt-9">
      <h2 className="text-3xl font-bold mb-6 text-primary text-center ">Shop by Brand</h2>
      <section className="flex flex-wrap container mx-auto px-4 gap-8 justify-center">
        {brands.map((brand, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <div className="w-32 h-32 rounded-full overflow-hidden border border-black bg-white shadow-sm hover:shadow-md transition-shadow border-b">
              <div className="w-full h-full relative">
                <img
                  src={brand.image || '/placeholder.svg'}
                  alt={brand.name}
                  className="absolute inset-0 w-full h-full object-center "
                />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700">{brand.name}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
