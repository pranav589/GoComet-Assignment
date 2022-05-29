import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductListingPage from "./pages/ProductListingPage/ProductListingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import Header from "./components/Header/Header";
import WishListPage from "./pages/WishListPage/WishListPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<ProductListingPage />} />
        <Route path="/:id" element={<ProductDetailsPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
