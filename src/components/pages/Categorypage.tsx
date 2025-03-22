import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { categories } from '@/utils/data/product';

import { Boxes, Clock, Factory, FileText, Package } from 'lucide-react';
import { Link } from 'react-router';

import { Card, CardContent, CardHeader, CardTitle } from '../molecules/Card';
import { Checkbox } from '../atoms/checkbox';
import { Slider } from '../atoms/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../molecules/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../molecules/pagination';
import Header from '../organisms/Header';

interface Manufacturer {
  name: string;
}

interface Product {
  id: string;
  sku: string;
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

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showInStock, setShowInStock] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://aviationx-be-1.onrender.com/api/v1/product/${category}/all`
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
  }, [category]);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesStock = !showInStock || product.quantity > 0;
    return matchesPrice && matchesStock;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div className="flex justify-center items-center h-48">Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="container mx-auto p-6">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Products'} Not
              Available
            </h2>
            <p className="text-gray-600">
              We're sorry, but the products in this category are not available at the moment. Please
              try exploring other categories or check back later.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <div className="flex gap-6">
          <div className="w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Categories */}
                <div>
                  <h3 className="mb-2 font-medium">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <div key={cat.name} className="flex items-center">
                        <Checkbox id={cat.name.toLowerCase()} />
                        <label htmlFor={cat.name.toLowerCase()} className="ml-2 text-sm">
                          {cat.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="mb-2 font-medium">Price Range</h3>
                  <Slider
                    defaultValue={[0, 5000]}
                    max={5000}
                    step={100}
                    className="w-full"
                    onValueChange={setPriceRange}
                  />
                  <div className="mt-2 text-sm">
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={showInStock}
                    onCheckedChange={(checked) => setShowInStock(checked === true)}
                  />
                  <label htmlFor="inStock" className="text-sm">
                    In Stock Only
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
              </h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <article
                  key={product.id}
                  className="relative flex flex-col overflow-hidden rounded-lg border product-card h-full"
                >
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
                        {/* <p className="text-lg font-semibold">₹{product.price}</p> */}
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
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
