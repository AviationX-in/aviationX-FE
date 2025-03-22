// Types for the API response
interface Manufacturer {
  name: string;
}

interface Product {
  id: string;
  partNumber: string;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  packSize: string;
  shelfLife: string;
  thumbnail: string;
  image: string[];
  Manufacturer: Manufacturer;
}

interface ApiResponse {
  products: Product[];
}

import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel';
import { Boxes, Clock, Factory, FileText, Package } from 'lucide-react';
import { Link } from 'react-router';

const CarouselThree: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://aviationx-be-1.onrender.com/api/v1/product/Sealant/all'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiResponse = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-48">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  // const formatPrice = (price: number): string => {
  //   return `₹${price}`;
  // };

  // Placeholder for cart functionality
  const handleAddToCart = (product: Product) => {
    console.log('Adding to cart:', product);
    // Implement your cart logic here
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-2 ml-16">
        <h2 className="text-3xl font-bold text-primary">AviationX Best Seller</h2>
      </div>
      <div className="w-full  p-4 flex justify-center">
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
                  key={product.partNumber}
                  className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <article className="relative flex flex-col overflow-hidden rounded-lg border product-card h-full">
                    <div className="aspect-square overflow-hidden">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.thumbnail}
                          alt={product.productName}
                          className="h-full w-full object-cover transition-all duration-300 hover:scale-125"
                        />
                      </Link>
                    </div>
                    <div className="absolute top-0 left-0 m-2">
                      <p className="rounded-full bg-emerald-500 p-1 text-[10px] font-bold uppercase tracking-wide text-white">
                        NEW
                      </p>
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div className="mb-4">
                        <div className="mb-2 flex justify-between items-center">
                          {/* <p className="text-lg font-semibold">{formatPrice(product.price)}</p> */}
                          <span className="text-sm text-gray-600">Part: {product.partNumber}</span>
                        </div>
                        <h3 className="text-md text-gray-800 dark:text-white mb-2">
                          {product.productName}
                        </h3>
                        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          <p className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-500" /> {product.description}
                          </p>
                          <p className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-gray-500" /> Pack Size:{' '}
                            {product.packSize}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" /> Shelf Life:{' '}
                            {product.shelfLife}
                          </p>
                          <p className="flex items-center gap-2">
                            <Factory className="w-4 h-4 text-gray-500" /> Manufacturer:{' '}
                            {product.Manufacturer.name}
                          </p>
                          <p className="flex items-center gap-2">
                            <Boxes className="w-4 h-4 text-gray-500" /> Quantity Available:{' '}
                            {product.quantity}
                          </p>
                        </div>
                      </div>
                      <button
                        className="mx-auto mt-auto flex h-10 w-10/12 items-stretch overflow-hidden rounded-md bg-gray-100 text-gray-600 hover:bg-emerald-600 hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-emerald-700"
                        onClick={() => handleAddToCart(product)}
                      >
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
};

export default CarouselThree;
