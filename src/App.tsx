import { Routes, Route } from 'react-router';
import Homepage from './components/pages/Homepage';
import ProductPage from './components/pages/Productdetails';
import Dashboard from './components/pages/Dashboard';
import AdminLayout from './components/layout/AdminLayout';
import AuthForms from './auth/Authform';
import CategoryPage from './components/pages/Categorypage';
import Inventory from './components/pages/Inventory';

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/auth" element={<AuthForms />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="reports" element={<Dashboard />} />
          <Route path="orders" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
