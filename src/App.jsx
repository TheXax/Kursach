import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";

import MainPage from "./Components/MainPage/MainPage";
import ProductsPage from "./Components/ProdusctsPage/ProductsPage";
import Cart from "./Components/Cart/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
