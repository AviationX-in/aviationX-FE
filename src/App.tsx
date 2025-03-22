import { Routes, Route } from 'react-router';
import Homepage from './components/pages/Homepage';
import ProductPage from './components/pages/Productdetails';
import Dashboard from './components/pages/Dashboard';
import AdminLayout from './components/layout/AdminLayout';

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/product/details" element={<ProductPage />} />
        <Route path="/product/details" element={<ProductPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<Dashboard />} />
          <Route path="reports" element={<Dashboard />} />
          <Route path="orders" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
