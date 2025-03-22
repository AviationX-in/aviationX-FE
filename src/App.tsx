import Homepage from './components/pages/Homepage';
import ProductPage from './components/pages/Productdetails';
import { Route, Routes } from 'react-router';
import AuthForms from './auth/Authform';
import CategoryPage from './components/pages/Categorypage';

const App = () => {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="/auth" element={<AuthForms />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  );
};

export default App;
