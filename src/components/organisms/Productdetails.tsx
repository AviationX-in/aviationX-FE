import { useState } from 'react';
import { Button } from '../atoms/Button';
import { Clock, DollarSign, Plane, Star, Users } from 'lucide-react';
import { Card, CardContent } from '../molecules/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../molecules/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../molecules/tabs';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
}

interface ProductDetailsProps {
  name: string;
  description: string;
  price: number;
  mainImage: string;
  generalInfo: { [key: string]: string };
  specifications: { [key: string]: string };
  reviews: Review[];
}

export function ProductDetails({
  name,
  description,
  price,
  mainImage,
  generalInfo,
  specifications,
  reviews: initialReviews,
}: ProductDetailsProps) {
  const [selectedImage] = useState(mainImage);
  const [reviews, setReviews] = useState(initialReviews);

  const sortReviews = (criteria: string) => {
    const sortedReviews = [...reviews];
    switch (criteria) {
      case 'newest':
        sortedReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'highest':
        sortedReviews.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        sortedReviews.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    setReviews(sortedReviews);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div>
            <img
              src={selectedImage || '/placeholder.svg'}
              alt={name}
              className="w-[30rem] h-[30rem] "
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">{name}</h1>
          <p className="mt-4 text-3xl text-gray-900">${price.toLocaleString()}</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {Object.entries(generalInfo).map(([key, value]) => (
              <div key={key} className="flex items-center">
                {key === 'Type' && <Plane className="h-5 w-5 mr-2 text-blue-500" />}
                {key === 'Range' && <Clock className="h-5 w-5 mr-2 text-blue-500" />}
                {key === 'Capacity' && <Users className="h-5 w-5 mr-2 text-blue-500" />}
                {key === 'Hourly Rate' && <DollarSign className="h-5 w-5 mr-2 text-blue-500" />}
                <span className="text-sm text-gray-500">
                  {key}: <span className="font-medium text-gray-900">{value}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Description</h3>
            <p className="mt-2 text-sm text-gray-500">{description}</p>
          </div>

          <Tabs defaultValue="specifications" className="mt-6">
            <TabsList>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications">
              <dl className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="py-3 flex justify-between text-sm">
                    <dt className="text-gray-500">{key}</dt>
                    <dd className="text-gray-900 font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </TabsContent>
            <TabsContent value="features">
              <ul className="mt-4 list-disc pl-5 space-y-2">
                <li>Advanced avionics suite for enhanced situational awareness</li>
                <li>Spacious cabin with luxurious seating and ample headroom</li>
                <li>Fuel-efficient engines for extended range and lower operating costs</li>
                <li>State-of-the-art entertainment system for passenger comfort</li>
              </ul>
            </TabsContent>
          </Tabs>

          <Button className="mt-8 w-full bg-blue-600 hover:bg-blue-700">Request a Quote</Button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm text-gray-500">{reviews.length} reviews</p>
            <div className="ml-4 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <=
                    Math.round(
                      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
                    )
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <Select onValueChange={sortReviews}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort reviews" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-8 space-y-8">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{review.author}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-600">{review.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
