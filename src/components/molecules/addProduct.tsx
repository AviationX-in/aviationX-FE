import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../organisms/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../organisms/form';
import { Input } from '../atoms/Input';
import { Textarea } from '../atoms/textarea';
import { Button } from '../atoms/Button';
import { toast } from '@/hooks/use-toast';
// Define the validation schema with Zod
const productSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  partNumber: z.string().min(1, 'Part number is required'),
  productName: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().positive('Price must be a positive number'),
  quantity: z.coerce.number().int().positive('Quantity must be a positive integer'),
  packSize: z.string().min(1, 'Pack size is required'),
  shelfLife: z.string().min(1, 'Shelf life is required'),
  category: z.string().min(1, 'Category is required'),
  manufacturer: z.string().min(1, 'Manufacturer is required'),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdded?: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  open,
  onOpenChange,
  onProductAdded,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      sku: '',
      partNumber: '',
      productName: '',
      description: '',
      price: 0,
      quantity: 0,
      packSize: '',
      shelfLife: '',
      category: '',
      manufacturer: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files.length > 5) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'You can upload a maximum of 5 images',
        });

        e.target.value = '';
        return;
      }
      setSelectedFiles(e.target.files);
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please upload at least one product image',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData to handle file uploads
      const formData = new FormData();

      // Add all form fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      // The key change: Use 'image' as the field name to match the multer config
      Array.from(selectedFiles).forEach((file) => {
        formData.append('image', file);
      });

      // Make API call
      const response = await fetch('http://localhost:8000/api/v1/product/add', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }

      toast({
        title: 'Product Added',
        description: 'Your product has been successfully added',
      });

      form.reset();
      setSelectedFiles(null);

      onOpenChange(false);
      if (onProductAdded) {
        onProductAdded();
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to add product. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormAndClose = (openState: boolean) => {
    if (!openState) {
      form.reset();
      setSelectedFiles(null);
    }
    onOpenChange(openState);
  };

  return (
    <Dialog open={open} onOpenChange={resetFormAndClose}>
      <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product to your inventory.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="AXC000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="partNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Part Number</FormLabel>
                    <FormControl>
                      <Input placeholder="CA1000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Product description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="packSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pack Size</FormLabel>
                    <FormControl>
                      <Input placeholder="100ml" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shelfLife"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shelf Life</FormLabel>
                    <FormControl>
                      <Input placeholder="2 years" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacturer</FormLabel>
                    <FormControl>
                      <Input placeholder="Manufacturer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <Input type="file" multiple accept="image/*" onChange={handleFileChange} />
              </FormControl>
              <FormDescription>
                Upload one or more product images (maximum 5). The first image will be used as the
                thumbnail.
              </FormDescription>
            </FormItem>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => resetFormAndClose(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
