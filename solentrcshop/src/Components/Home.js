import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import Banner from "./Banner";
import { auth, db } from "../FirebaseConfigs/FirebaseConfig";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import Addproduct from "./Addproduct";

const Home = () => {
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uuid", "==", userlogged.uid)
            );
            //console.log(q);
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const loggeduser = GetCurrentUser();
  //if (loggeduser) {
  //console.log(loggeduser[0].email);
  //}

  return (
    <div>
      <Navbar />
      <Banner />
      <Products />
      <Addproduct />
      <p>{loggeduser ? loggeduser[0] : "No data"}</p>
    </div>
  );
};
export default Home;
