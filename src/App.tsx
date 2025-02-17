import Homepage from './components/pages/Homepage';
import ProductPage from './components/pages/Productdetails';
import { Auth0Provider } from '@auth0/auth0-react';
// import { auth0Config } from './auth/auth0-config';
import ProtectedRoute from './auth/ProtectedRoute';
import { Route, Routes } from 'react-router';

const App = () => {
  return (
    <Auth0Provider
      domain="dev-lxz3p3zykom6bj8j.us.auth0.com"
      clientId="7MAuW2FIR1ouhrzdP8iS7Ry6EvYazp7b"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Routes>
        <Route index element={<Homepage />} />
        <Route
          path="/product/details"
          element={
            <ProtectedRoute>
              <ProductPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Auth0Provider>
  );
};

export default App;
