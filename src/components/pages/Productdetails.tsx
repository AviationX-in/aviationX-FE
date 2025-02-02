import { ProductDetails } from '../organisms/Productdetails';
// import bannerImg1 from '../../assets/bannerImg/bannerImg1.jpg';
// import bannerImg2 from '../../assets/bannerImg/bannerImg2.jpg';
export default function ProductPage() {
  const productData = {
    name: 'Cessna Citation CJ4 Gen2',
    description:
      "The Cessna Citation CJ4 Gen2 is a light jet aircraft known for its exceptional performance, advanced avionics, and luxurious cabin. It's perfect for business travel and short to medium-range flights, offering a blend of efficiency, comfort, and cutting-edge technology.",
    price: 10500000,
    mainImage:
      ' https://cdn11.bigcommerce.com/s-jifykode7m/images/stencil/1280x1280/products/106632/179269/SGP72466_1_main__98692.1737563929.jpg?c=1',

    generalInfo: {
      Type: 'Light Jet',
      Range: '2,165 nmi (4,010 km)',
      Capacity: 'Up to 10 passengers',
      'Hourly Rate': '$3,000 - $3,500',
    },
    specifications: {
      'Max Speed': '845 km/h (525 mph, 456 kn)',
      Engines: '2 × Williams International FJ44-4A turbofans',
      Avionics: 'Collins Aerospace Pro Line Fusion',
      'Max Takeoff Weight': '17,110 lb (7,761 kg)',
      Wingspan: '50 ft 10 in (15.49 m)',
      Length: '53 ft 4 in (16.26 m)',
      Height: '15 ft 2 in (4.62 m)',
      'Cabin Height': '4 ft 9 in (1.45 m)',
      'Cabin Width': '4 ft 10 in (1.47 m)',
      'Cabin Length': '17 ft 4 in (5.28 m)',
    },
    reviews: [
      {
        id: 1,
        author: 'John Smith',
        rating: 5,
        date: '2024-01-15',
        content:
          'Exceptional aircraft. The CJ4 Gen2 has exceeded all my expectations in terms of performance and comfort. The advanced avionics make it a joy to fly, and my passengers always comment on the luxurious cabin.',
      },
      {
        id: 2,
        author: 'Emily Johnson',
        rating: 4,
        date: '2024-01-10',
        content:
          'Great jet for business travel. The range and speed are impressive, allowing me to reach most of my destinations non-stop. The only minor drawback is the slightly limited baggage space for longer trips.',
      },
      {
        id: 3,
        author: 'Michael Brown',
        rating: 5,
        date: '2024-01-05',
        content:
          'The cabin comfort is unparalleled in its class. My clients are always impressed with the smooth and quiet ride. The updated interior of the Gen2 model really sets it apart from the competition.',
      },
    ],
  };

  return <ProductDetails {...productData} />;
}
