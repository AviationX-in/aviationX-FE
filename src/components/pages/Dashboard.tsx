import { IndianRupee } from 'lucide-react';
import DataCardAdmin from '../molecules/DataCardAdmin';
import SalesIcon from '../../assets/icons/sales.svg';
import RevenueIcon from '../../assets/icons/revenue.svg';
import ProfitIcon from '../../assets/icons/profit.svg';
import CostIcon from '../../assets/icons/cost.svg';
import Quantity from '../../assets/icons/quantity.svg';

const Dashboard = () => {
  const SalesData = [
    {
      label: 'Sales',
      icon: SalesIcon,
      value: 200,
      priceIcon: <IndianRupee size={20} />,
    },
    {
      label: 'Revenue',
      icon: RevenueIcon,
      value: 2000,
      priceIcon: <IndianRupee size={20} />,
    },
    {
      label: 'Profit',
      icon: ProfitIcon,
      value: 200,
      priceIcon: <IndianRupee size={20} />,
    },
    {
      label: 'Cost',
      icon: CostIcon,
      value: 200,
      priceIcon: <IndianRupee size={20} />,
    },
  ];

  const InventoryData = [
    {
      label: 'Quantity',
      icon: Quantity,
      value: 200,
    },
    {
      label: 'Categories',
      icon: RevenueIcon,
      value: 2000,
    },
  ];

  return (
    <div className="w-full bg-green-500 grid grid-cols-3 gap-4 p-4">
      <DataCardAdmin title="Sales Overview" data={SalesData} style="col-span-2" />
      <DataCardAdmin title="Inventory Summary" data={InventoryData} />
      <DataCardAdmin title="Purchase Overview" data={SalesData} style="col-span-2" />
      <DataCardAdmin title="Inventory Summary" data={InventoryData} />
    </div>
  );
};
export default Dashboard;
