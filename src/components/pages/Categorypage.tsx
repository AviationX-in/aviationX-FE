import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { Link, useNavigate } from 'react-router';
import React from 'react';
import { categories } from '@/utils/data/product';

import { Boxes, Clock, Factory, FileText, Package } from 'lucide-react';

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
  averageRating?: number;
}

interface ApiResponse {
  products: Product[];
  pagination: {
    totalProducts: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

const CategoryPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    totalProducts: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 9,
  });

  // Get initial values from URL params or use defaults
  const initialPage = parseInt(searchParams.get('page') || '1');
  const initialMinPrice = parseInt(searchParams.get('min_price') || '0');
  const initialMaxPrice = parseInt(searchParams.get('max_price') || '5000');
  const initialBrands = searchParams.get('brands') || '';
  const initialRating = searchParams.get('rating') || '';
  const initialLimit = parseInt(searchParams.get('limit') || '9');
  const initialSort = searchParams.get('sort') || 'popularity';
  const initialShowInStock = searchParams.get('in_stock') === 'true';

  // State for filters
  const [priceRange, setPriceRange] = useState([initialMinPrice, initialMaxPrice]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialBrands ? initialBrands.split(',') : []
  );
  const [showInStock, setShowInStock] = useState(initialShowInStock);
  const [sortBy, setSortBy] = useState(initialSort);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialLimit);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);

  // Update URL params when filters change
  const updateUrlParams = () => {
    const params: Record<string, string> = {};

    if (currentPage !== 1) params.page = currentPage.toString();
    if (priceRange[0] > 0) params.min_price = priceRange[0].toString();
    if (priceRange[1] < 5000) params.max_price = priceRange[1].toString();
    if (selectedBrands.length > 0) params.brands = selectedBrands.join(',');
    if (sortBy !== 'popularity') params.sort = sortBy;
    if (showInStock) params.in_stock = 'true';
    if (itemsPerPage !== 9) params.limit = itemsPerPage.toString();

    setSearchParams(params);
  };

  // Apply filters and fetch data

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `https://aviationx-be-1.onrender.com/api/v1/product/${category}/all?`;
      url += `page=${currentPage}&limit=${itemsPerPage}`;

      // Add price filter
      if (priceRange[0] > 0) url += `&min_price=${priceRange[0]}`;
      if (priceRange[1] < 5000) url += `&max_price=${priceRange[1]}`;

      // Add brand filter
      if (selectedBrands.length > 0) url += `&brands=${selectedBrands.join(',')}`;
      if (showInStock) url += `&in_stock=true`;

      // Add sorting (assuming backend has this filter)
      // Note: Your controller doesn't seem to have sorting functionality, so you'd need to add it
      if (sortBy) {
        let sortParam = '';
        switch (sortBy) {
          case 'price-low':
            sortParam = 'price,asc';
            break;
          case 'price-high':
            sortParam = 'price,desc';
            break;
          case 'popularity':
            sortParam = 'popularity,desc';
            break;
        }
        if (sortParam) url += `&sort=${sortParam}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      setProducts(data.products);
      setPagination(data.pagination);

      // Extract unique brands for filter
      const brands = Array.from(new Set(data.products.map((p) => p.Manufacturer.name)));
      setAvailableBrands(brands);

      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      setLoading(false);
    }
  };
  useEffect(() => {
    updateUrlParams();
    fetchProducts();
  }, [category, priceRange, selectedBrands, currentPage, itemsPerPage, sortBy, showInStock]);

  // Handle pagination change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle brand selection
  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brand)) {
        return prev.filter((b) => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
    // Reset to first page when changing filters
    setCurrentPage(1);
  };

  // Handle price range change
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    // Reset to first page when changing filters
    setCurrentPage(1);
  };

  // Handle in-stock filter change
  const handleInStockChange = (checked: boolean) => {
    setShowInStock(checked);
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  if (loading && products.length === 0) {
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
                        <Link
                          to={`/category/${cat.name.toLowerCase()}`}
                          className={`flex items-center ml-2 text-sm ${
                            category === cat.name.toLowerCase() ? 'font-bold text-blue-600' : ''
                          }`}
                        >
                          {cat.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manufacturers/Brands */}
                <div>
                  <h3 className="mb-2 font-medium">Brands</h3>
                  <div className="space-y-2">
                    {availableBrands.map((brand) => (
                      <div key={brand} className="flex items-center">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => handleBrandToggle(brand)}
                        />
                        <label htmlFor={brand} className="ml-2 text-sm">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="mb-2 font-medium">Price Range</h3>
                  <Slider
                    value={priceRange}
                    max={5000}
                    step={100}
                    className="w-full"
                    onValueChange={handlePriceChange}
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
                    onCheckedChange={(checked) => handleInStockChange(checked === true)}
                  />
                  <label htmlFor="inStock" className="text-sm">
                    In Stock Only
                  </label>
                </div>

                {/* Clear Filters Button */}
                <button
                  onClick={() => {
                    setPriceRange([0, 5000]);
                    setSelectedBrands([]);
                    setShowInStock(false);
                    setSortBy('popularity');
                    setCurrentPage(1);
                    navigate(`/category/${category}`);
                  }}
                  className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Clear Filters
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Products grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  {pagination?.totalProducts}
                </span>
              </h2>
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(parseInt(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Items per page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">9 per page</SelectItem>
                    <SelectItem value="12">12 per page</SelectItem>
                    <SelectItem value="24">24 per page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {products.length === 0 && !loading ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or searching for something else.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
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
                          <span className="text-sm text-gray-600">Part: {product.partNumber}</span>
                          <p className="text-lg font-semibold">₹{product.price}</p>
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
            )}

            {/* Pagination */}
            {pagination?.totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        // Show first page, last page, and pages around current page
                        const maxPagesToShow = 5;
                        const halfMaxPages = Math.floor(maxPagesToShow / 2);
                        return (
                          page === 1 ||
                          page === pagination.totalPages ||
                          (page >= currentPage - halfMaxPages && page <= currentPage + halfMaxPages)
                        );
                      })
                      .map((page, index, array) => {
                        // Add ellipsis if pages are skipped
                        if (index > 0 && page - array[index - 1] > 1) {
                          return (
                            <React.Fragment key={`ellipsis-${page}`}>
                              <PaginationItem>
                                <span className="px-2">...</span>
                              </PaginationItem>
                              <PaginationItem>
                                <PaginationLink
                                  onClick={() => handlePageChange(page)}
                                  isActive={currentPage === page}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            </React.Fragment>
                          );
                        }
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          handlePageChange(Math.min(pagination.totalPages, currentPage + 1))
                        }
                        className={
                          currentPage === pagination.totalPages
                            ? 'pointer-events-none opacity-50'
                            : ''
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
