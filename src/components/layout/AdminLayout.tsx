import HeaderAdmin from '../organisms/HeaderAdmin';
import SidebarAdmin from '../organisms/SidebarAdmin';
import { Outlet } from 'react-router';

const AdminLayout = () => {
  return (
    <div className="flex height-full width-full">
      <SidebarAdmin />
      <div className="w-full">
        <HeaderAdmin />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
