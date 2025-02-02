

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
  { name: 'PPG', image: 'https://purepng.com/public/uploads/large/purepng.com-ppg-logologobrand-logoiconslogos-251519940583bib8o.png' },
  { name: 'AeroShell', image: 'https://th.bing.com/th/id/OIP.KEPfAitfB1yah7gT5ltj6QHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
  { name: 'Eastman', image: "https://www.eastman.com/content/experience-fragments/eastman-corporate/us/en/mega_menu/level_1/header/master/_jcr_content/root/header/headcontainer/headernavcont/image.coreimg.png/1722201436857/updated-eastman-logo-black.png" },
  { name: 'Mobil', image: 'https://www.mobil.co.in/-/media/optimized-images/webp-optimized-image/logo.webp' },
  { name: 'LPS', image: 'https://th.bing.com/th/id/OIP.Hmj3QuQy7v-aT7-77CpW7gHaGV?rs=1&pid=ImgDetMain' },
  { name: 'Molykote', image: 'https://www.dupont.com/content/dam/dupont/amer/us/en/Molykote/public/images/icons-logos/MOLYKOTE_R_logo_rgb1.svg' },
];
