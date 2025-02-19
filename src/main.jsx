import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import Navbar from "./components/navbar/Navbar.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Wishlist from "./pages/wishlist/Wishlist.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Homepage from "./pages/Homepage.jsx";
import Products from "./pages/products/Products.jsx";
import ProductDetails from "./pages/productDetails/ProductDetails.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";
import OrderPlaced from "./pages/OrderPlaced.jsx";

import store from "./app/store.js";

import { CartProvider } from "./contexts/CartContext.jsx";
import { AddressProvider } from "./contexts/AddressContext.jsx";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:productName/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "order-placed",
        element: <OrderPlaced />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CartProvider>
        <AddressProvider>
          <RouterProvider router={router}>
            <Homepage />
          </RouterProvider>
        </AddressProvider>
      </CartProvider>
    </Provider>
  </StrictMode>
);
