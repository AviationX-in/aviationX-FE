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

export const categories = [
  { name: 'Oil' },
  { name: 'Grease' },
  { name: 'Sealant' },
  { name: 'Contact Cleaner' },
];

export const brands = [
  {
    name: 'PPG',
    image:
      'https://purepng.com/public/uploads/large/purepng.com-ppg-logologobrand-logoiconslogos-251519940583bib8o.png',
  },
  {
    name: 'AeroShell',
    image: 'https://d29y7fsthxbb26.cloudfront.net/cache/200-229-/catalog/graphics/l/logoshell.png',
  },
  {
    name: 'Eastman',
    image:
      'https://www.eastman.com/content/experience-fragments/eastman-corporate/us/en/mega_menu/level_1/header/master/_jcr_content/root/header/headcontainer/headernavcont/image.coreimg.png/1722201436857/updated-eastman-logo-black.png',
  },
  {
    name: 'Mobil',
    image: 'https://d29y7fsthxbb26.cloudfront.net/cache/200-229-/catalog/graphics/l/logo_mobil.jpg',
  },
  {
    name: 'LPS',
    image: 'https://www.aircraftspruce.com/cache/200-229-/catalog/graphics/l/logolps.JPG',
  },
  {
    name: 'Molykote',
    image:
      'https://www.dupont.com/content/dam/dupont/amer/us/en/Molykote/public/images/icons-logos/MOLYKOTE_R_logo_rgb1.svg',
  },
];

export const bannerImages = [
  'https://cdn.pixabay.com/photo/2019/08/18/17/13/air-show-4414576_1280.jpg',
  'https://cdn.pixabay.com/photo/2019/12/17/20/27/jet-engine-4702441_1280.jpg',
  'https://cdn.pixabay.com/photo/2022/08/02/01/12/airplane-7359232_1280.jpg',
];
