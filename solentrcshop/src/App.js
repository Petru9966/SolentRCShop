//import React, { Component } from 'react'

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import PgFOF from "./Components/PgFOF";
import Cart from "./Components/Cart";
import Userprofile from "./Components/Userprofile";
import Addproduct from "./Components/Addproduct";
import Allproductspage from "./Components/Products-Components/Allproductspage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/userprofile" element={<Userprofile />} />
        <Route exact path="/sellproduct" element={<Addproduct />} />
        <Route
          exact
          path="/product-type/kits"
          element={<Allproductspage type={"Kits"} />}
        />
        <Route
          exact
          path="/product-types/rtf"
          element={<Allproductspage type={"Ready to Fly"} />}
        />
        <Route
          exact
          path="/product-types/drones"
          element={<Allproductspage type={"Drones"} />}
        />
        <Route
          exact
          path="/product-types/accessories"
          element={<Allproductspage type={"Accessories and Parts"} />}
        />

        <Route path="*" element={<PgFOF />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
