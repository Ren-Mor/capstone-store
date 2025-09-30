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
import UpdateProduct from "./Components/UpdateProduct";
import UpdateUser from "./Components/UpdateUser";
import ProtectionRoute from "./Components/ProtectionRoute";
import ConfirmLogout from "./Components/ConfirmLogout";
import YouBetterRun from "./Components/YouBetterRun";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `http://localhost:8080/products/category/${category}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
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
  }, [category]);

  return (
    <>
      <BrowserRouter>
        <LoginPersist />
        <MyNav />

        <Routes>
          <Route path="/youbetterrun" element={<YouBetterRun />}></Route>
          <Route path="/" element={<Hero />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/prodotti/:category"
            element={
              <ProductList categoria={products} setCategory={setCategory} />
            }
          />

          <Route path="/details/:productId" element={<ProductDetails />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/confirm-logout" element={<ConfirmLogout />} />
          <Route
            path="/adminprofile"
            element={
              <ProtectionRoute>
                <AdminProfile />
              </ProtectionRoute>
            }
          />

          <Route
            path="/backoffice"
            element={
              <ProtectionRoute>
                <BackOffice />
              </ProtectionRoute>
            }
          />
          <Route
            path="/updateproduct"
            element={
              <ProtectionRoute>
                <UpdateProduct />
              </ProtectionRoute>
            }
          />
          <Route
            path="/visualizeusers"
            element={
              <ProtectionRoute>
                <VisualizeUsers />
              </ProtectionRoute>
            }
          />
          <Route path="/updateuser" element={<UpdateUser />} />
        </Routes>
        <MyFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
