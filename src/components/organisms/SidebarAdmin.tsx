import { Link, useLocation } from 'react-router';
import { House, Layers, ChartNoAxesCombined, PackageCheck, Settings, LogOut } from 'lucide-react';

const sidebarMenus = [
  {
    title: 'Dashboard',
    icon: <House size={20} />,
    link: '/admin/dashboard',
  },
  {
    title: 'Inventory',
    icon: <Layers size={20} />,
    link: '/admin/inventory',
  },
  {
    title: 'Reports',
    icon: <ChartNoAxesCombined size={20} />,
    link: '/admin/reports',
  },
  {
    title: 'Orders',
    icon: <PackageCheck size={20} />,
    link: '/admin/orders',
  },
];

const SidebarAdmin = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col justify-between w-64 p-5 h-screen bg-primary text-white">
      <div className="">
        <div className="">
          <h1 className="text-2xl font-bold text-center pb-10`">AviationX</h1>
        </div>
        <ul className="flex flex-col gap-2">
          {sidebarMenus.map((menu) => (
            <Link to={menu.link} key={menu.title} className="">
              <li
                className={`flex items-center ${pathname === menu.link ? 'bg-blue-600' : 'hover:bg-themeGray'} gap-5 px-5 py-3 rounded-md `}
              >
                {menu.icon}
                <span className="">{menu.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="">
        <Link to={'/admin/settings'} className="">
          <div
            className={`flex items-center ${pathname === '/admin/settings' ? 'bg-blue-600' : 'hover:bg-themeGray'} gap-5 px-5 py-3 rounded-md `}
          >
            <Settings />
            <span className="">Settings</span>
          </div>
        </Link>
        <div className={`flex items-center hover:bg-themeGray gap-5 px-5 py-3 rounded-md `}>
          <LogOut />
          <span className="">Log Out</span>
        </div>
      </div>
    </div>
  );
};
export default SidebarAdmin;
