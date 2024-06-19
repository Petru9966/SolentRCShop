import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./Allproductspage.css";
import Productscontainer from "./Productscontainer";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../FirebaseConfigs/FirebaseConfig";
const Allproductspage = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = () => {
      const productsArray = [];
      const path = "products-${props.type.toUpperCase()}";
      getDocs(collection(db, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
          });
          setProducts(productsArray);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getProducts();
  }, []);

  return (
    <div className="allproductspage">
      <Navbar />
      <div classname="heading">
        <p>Results for {props.type}</p>
      </div>
      <div className="allproductscontainer">\</div>
    </div>
  );
};

export default Allproductspage;
