import { useState, useEffect } from 'react';
import { Link } from 'react-router';
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
  productName: string;
  price: number;
  quantity: number;
  thumbnail: string;
  Manufacturer?: Manufacturer;
  Category?: Category;
}

interface CartItem {
  id: string;
  quantity: number;
  Product: Product;
}

interface CartSummary {
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}

export function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingItem, setProcessingItem] = useState<string | null>(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await api.get<{
        data: {
          Products: Array<{
            Cart: { id: string; quantity: number };
            id: string;
            sku: string;
            productName: string;
            price: number;
            quantity: number;
            thumbnail: string;
            Manufacturer?: Manufacturer;
            Category?: Category;
          }>;
        };
      }>('cart/allItems');
      const products = response?.data?.Products || [];
      const formattedCartItems: CartItem[] = products.map((product) => ({
        id: product.Cart.id,
        quantity: product.Cart.quantity,
        Product: {
          id: product.id,
          sku: product.sku,
          productName: product.productName,
          price: product.price,
          quantity: product.quantity,
          thumbnail: product.thumbnail,
          Manufacturer: product.Manufacturer,
          Category: product.Category,
        },
      }));

      setCartItems(formattedCartItems);
    } catch (err) {
      // redirect('/');
      setError(`Error loading cart: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId: string, productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setProcessingItem(itemId);

    try {
      await api.put('/cart/updateQuantity', {
        itemId: productId,
        quantity: newQuantity,
      });

      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
      );

      toast({
        title: 'Quantity updated successfully',
        description: 'Your quantity has been updated successfully',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          err instanceof Error ? err.message : 'Failed to update quantity. Please try again.',
      });
    } finally {
      setProcessingItem(null);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setProcessingItem(itemId);

    try {
      await api.delete(`/cart/remove/${itemId}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

      toast({
        title: 'Item removed from cart',
        description: 'Your item has been removed from the cart',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          err instanceof Error ? err.message : 'Failed to remove item. Please try again.',
      });
    } finally {
      setProcessingItem(null);
    }
  };

  const calculateTotals = (): CartSummary => {
    let subtotal = 0;
    let itemCount = 0;

    cartItems.forEach((item) => {
      subtotal += item.Product.price * item.quantity;
      itemCount += item.quantity;
    });

    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    return {
      subtotal,
      tax,
      total,
      itemCount,
    };
  };

  const { subtotal, tax, total, itemCount } = calculateTotals();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">Loading your cart...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-8">{error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any products yet.</p>
            <Link to="/">
              <Button className="bg-blue-600 hover:bg-blue-700">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <tr key={item.id} className={processingItem === item.id ? 'opacity-50' : ''}>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0">
                              <img
                                src={item.Product.thumbnail}
                                alt={item.Product.productName}
                                className="h-16 w-16 object-cover rounded"
                              />
                            </div>
                            <div className="ml-4">
                              <Link
                                to={`/product/${item.Product.id}`}
                                className="text-sm font-medium text-gray-900 hover:text-blue-600"
                              >
                                {item.Product.productName}
                              </Link>
                              {item.Product.Manufacturer && (
                                <div className="text-sm text-gray-500">
                                  {item.Product.Manufacturer.name}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                          &#8377; {item.Product.price.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center border border-gray-300 rounded w-fit">
                            <button
                              className="px-2 py-1 text-sm border-r border-gray-300"
                              onClick={() =>
                                handleQuantityChange(item.id, item.Product.id, item.quantity - 1)
                              }
                              disabled={processingItem === item.id || item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-sm">{item.quantity}</span>
                            <button
                              className="px-2 py-1 text-sm border-l border-gray-300"
                              onClick={() =>
                                handleQuantityChange(item.id, item.Product.id, item.quantity + 1)
                              }
                              disabled={
                                processingItem === item.id || item.quantity >= item.Product.quantity
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          &#8377; {(item.Product.price * item.quantity).toLocaleString()}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={processingItem === item.id}
                            className="text-red-600 hover:text-red-900"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

                <div className="flow-root">
                  <dl className="text-sm">
                    <div className="py-2 flex items-center justify-between">
                      <dt className="text-gray-600">Subtotal ({itemCount} items)</dt>
                      <dd className="font-medium text-gray-900">
                        &#8377; {subtotal.toLocaleString()}
                      </dd>
                    </div>

                    <div className="py-2 flex items-center justify-between">
                      <dt className="text-gray-600">Tax (18%)</dt>
                      <dd className="font-medium text-gray-900">&#8377; {tax.toLocaleString()}</dd>
                    </div>

                    <div className="py-2 border-t border-gray-200 flex items-center justify-between">
                      <dt className="text-base font-medium text-gray-900">Order total</dt>
                      <dd className="text-base font-medium text-gray-900">
                        &#8377; {total.toLocaleString()}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Proceed to Checkout
                  </Button>
                  <Link to="/">
                    <Button variant="outline" className="w-full mt-4">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
