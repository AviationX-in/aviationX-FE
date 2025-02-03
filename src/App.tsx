import { Routes, Route } from 'react-router';
import Homepage from './components/pages/Homepage';
import ProductPage from './components/pages/Productdetails';

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/product/details" element={<ProductPage />} />
      </Routes>
    </>
  );
};
export default App;
