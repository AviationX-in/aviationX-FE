import bannerImg1 from '../../assets/bannerImg/bannerImg1.jpg';
import bannerImg2 from '../../assets/bannerImg/bannerImg2.jpg';

type Producttype = {
  id: number;
  title: string;
  image: string[];
  price: number;
};

export const products: Producttype[] = [
  {
    id: 1,
    title: 'Product 1',
    image: [
      'https://images.unsplash.com/photo-1616788568809-d1e0c0f1f3a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    ],
    price: 100,
  },
  {
    id: 2,
    title: 'Product 1',
    image: [
      'https://images.unsplash.com/photo-1616788568809-d1e0c0f1f3a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    ],
    price: 100,
  },
  {
    id: 3,
    title: 'Product 1',
    image: [
      'https://images.unsplash.com/photo-1616788568809-d1e0c0f1f3a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    ],
    price: 100,
  },
];

export const categories2 = [
  { name: 'Oil', icon: '🛢️' },
  { name: 'Grease', icon: '💧' },
  { name: 'Sealant', icon: '🔒' },
  { name: 'Contact Cleaner', icon: '🧼' },
];

export const brands = [
  { name: 'Brand 1', image: bannerImg1 },
  { name: 'Brand 2', image: bannerImg2 },
  { name: 'Brand 3', image: bannerImg1 },
  { name: 'Brand 4', image: bannerImg2 },
  { name: 'Brand 5', image: bannerImg1 },
  { name: 'Brand 6', image: bannerImg2 },
];
