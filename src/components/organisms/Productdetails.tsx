import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../molecules/tabs';
import { Card, CardContent } from '../molecules/Card';
import { Button } from '../atoms/Button';
import Header from './Header';
import { toast } from '@/hooks/use-toast';
import { api } from '@/services/apiService';

interface Manufacturer {
  name: string;
}

interface Category {
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
  Category: Category;
}

interface ProductResponse {
  products: Product;
}

interface CartResponse {
  message: string;
}

export function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.get<ProductResponse>(`/product/${id}`);
        setProduct(data.products);
        setSelectedImage(data.products.thumbnail);
      } catch (err) {
        setError(
          `Error loading product details: ${err instanceof Error ? err.message : String(err)}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (amount: number) => {
    if (product) {
      const newQuantity = itemQuantity + amount;
      if (newQuantity >= 1 && newQuantity <= product.quantity) {
        setItemQuantity(newQuantity);
      }
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    setAddingToCart(true);

    try {
      const data = await api.post<CartResponse>('/cart/addToCart', {
        productId: product.id,
        quantity: itemQuantity,
      });

      toast({
        title: 'Product Added',
        description: data.message,
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          err instanceof Error ? err.message : 'Failed to add product to cart. Please try again.',
      });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error || !product) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="mb-4 border border-gray-200">
              <img
                src={selectedImage}
                alt={product.productName}
                className="w-full h-[30rem] object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.productName} ${index + 1}`}
                  className="w-full h-24 object-cover rounded cursor-pointer border border-gray-200 p-2"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.productName}</h1>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold">&#8377; {product.price.toLocaleString()}</span>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-500 mb-2">Quantity</p>
              <div className="flex items-center border border-gray-300 rounded w-fit">
                <button
                  className="px-3 py-1 text-lg border-r border-gray-300"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={itemQuantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1">{itemQuantity}</span>
                <button
                  className="px-3 py-1 text-lg border-l border-gray-300"
                  onClick={() => handleQuantityChange(1)}
                  disabled={itemQuantity >= product.quantity}
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">{product.quantity} units available</p>
            </div>

            <Tabs defaultValue="details" className="mt-6">
              <TabsList>
                <TabsTrigger value="details">Product Details</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-600">{product.description}</p>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Manufacturer:</span>{' '}
                        {product.Manufacturer.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Category:</span> {product.Category.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Part Number:</span> {product.partNumber}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications">
                <Card>
                  <CardContent className="pt-6">
                    <dl className="space-y-4">
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Pack Size</dt>
                        <dd className="text-sm text-gray-900">{product.packSize}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Shelf Life</dt>
                        <dd className="text-sm text-gray-900">{product.shelfLife}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Quantity Available</dt>
                        <dd className="text-sm text-gray-900">{product.quantity} units</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-8 space-y-4">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleAddToCart}
                disabled={addingToCart || product.quantity < 1}
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </Button>
              <Button variant="outline" className="w-full">
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
