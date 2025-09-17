import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import MyNav from "./Components/MyNav";
import Hero from "./Components/Hero";
import Cart from "./Components/Cart";
import MyFooter from "./Components/MyFooter";
import ProductList from "./Components/ProductList";
import ProductDetails from "./Components/ProductDetails";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Checkout from "./Components/Checkout";
import BackOffice from "./Components/BackOffice";
import UserProfile from "./Components/UserProfile";
import AdminProfile from "./Components/AdminProfile";
import LoginPersist from "./Components/LoginPersist";
import VisualizeUsers from "./Components/VisualizeUsers";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:8080/products/all", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          throw new Error("Impossibile caricare i prodotti");
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Errore nel recupero dei prodotti:", error);
      }
    }
    fetchProducts();
  }, []);
  return (
    <>
      <BrowserRouter>
        <LoginPersist />
        <MyNav />

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/prodotti"
            element={<ProductList categoria={products} />}
          />
          <Route path="/details/:productId" element={<ProductDetails />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/backoffice" element={<BackOffice />} />
          <Route path="/visualizeusers" element={<VisualizeUsers />} />
        </Routes>
        <MyFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
