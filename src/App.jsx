import {
  Route,
  Routes,
} from "react-router";

import ProtectedRoute from "./components/routing/ProtectedRoute.jsx";

import DashboardLayout from "./layouts/DashboardLayout.jsx";
import RootLayout from "./layouts/RootLayout.jsx";

import AddProductPage from "./pages/AddProductPage.jsx";
import DashboardHomePage from "./pages/DashboardHomePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<RootLayout />}
      >
        {/* Public routes */}

        <Route
          index
          element={<HomePage />}
        />

        <Route
          path="products"
          element={<ProductsPage />}
        />

        <Route
          path="products/:productId"
          element={<ProductDetailsPage />}
        />

        <Route
          path="login"
          element={<LoginPage />}
        />

        {/* Protected route group */}

        <Route
          element={<ProtectedRoute />}
        >
          <Route
            path="dashboard"
            element={<DashboardLayout />}
          >
            <Route
              index
              element={
                <DashboardHomePage />
              }
            />

            <Route
              path="profile"
              element={<ProfilePage />}
            />

            <Route
              path="add-product"
              element={<AddProductPage />}
            />
          </Route>
        </Route>

        {/* Route-level 404 */}

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;