import { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../organisms/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './pagination';
import AddProductModal from './addProduct';

import { FilterIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from '../atoms/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { categories } from '@/utils/data/product';

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
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  Manufacturer: Manufacturer;
}

interface PaginationInfo {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

interface ProductsResponse {
  products: Product[];
  pagination: PaginationInfo;
}

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Sealant');
  const [openPopover, setOpenPopover] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/v1/product/${selectedCategory}/all?page=${currentPage}&limit=${limit}`
      );
      const data: ProductsResponse = await response.json();
      setProducts(data.products);

      // Update pagination information from the API response
      if (data.pagination) {
        setTotalPages(data.pagination.totalPages);
        setCurrentPage(data.pagination.currentPage);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, currentPage, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const getStockStatus = (quantity: number) => {
    if (quantity <= 0) return { label: 'Out of stock', color: 'text-red-500' };
    if (quantity < 5) return { label: 'Low stock', color: 'text-amber-500' };
    return { label: 'In-stock', color: 'text-green-500' };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().substr(-2)}`;
  };

  // Handle page changes
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
    setOpenPopover(false);
  };

  // Handle limit change (items per page)
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reset to first page when changing limit
  };

  return (
    <div className="w-[95%] mt-10 ml-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products</h2>

        <div className="flex gap-2">
          {/* Category Filter */}
          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4" />
                <span>{selectedCategory}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end" alignOffset={0} sideOffset={10}>
              <Command>
                <CommandInput placeholder="Search categories..." />
                <CommandList>
                  <CommandEmpty>No categories found.</CommandEmpty>
                  <CommandGroup heading="Categories">
                    {categories.map((category) => (
                      <CommandItem
                        key={category.name}
                        onSelect={() => handleCategorySelect(category.name)}
                        className={`flex items-center justify-between ${
                          category.name === selectedCategory ? 'bg-gray-50 font-medium' : ''
                        }`}
                      >
                        <span>{category.name}</span>
                        {category.name === selectedCategory && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Items per page selector */}
          <select
            className="border rounded-md px-2 py-2"
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
          >
            <option value="5">5 per page</option>
            <option value="9">9 per page</option>
            <option value="15">15 per page</option>
            <option value="20">20 per page</option>
          </select>

          {/* Add Product button */}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Product
          </button>
        </div>

        <AddProductModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onProductAdded={fetchProducts}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Products</TableHead>
              <TableHead>Buying Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Availability</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading products...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => {
                const stockStatus = getStockStatus(product.quantity);
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.productName}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>{product.quantity} Packets</TableCell>
                    <TableCell>
                      {product.shelfLife ? formatDate(product.createdAt) : 'N/A'}
                    </TableCell>
                    <TableCell className={stockStatus.color}>{stockStatus.label}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          {!loading && products.length > 0 && (
            <span className="text-sm text-gray-500">
              Showing page {currentPage} of {totalPages}
            </span>
          )}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePreviousPage}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>

            {/* Add page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show 5 pages max centered around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              if (pageNum > 0 && pageNum <= totalPages) {
                return (
                  <PaginationItem key={pageNum}>
                    <button
                      className={`px-3 py-1 rounded-md ${
                        currentPage === pageNum ? 'bg-blue-100 font-medium' : ''
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                className={
                  currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ProductTable;
