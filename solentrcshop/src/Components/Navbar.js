import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Navbar.css";
import cartlogo from "../Components/assets/cartlogo.jpg";
import profilelogo from "../Components/assets/profilelogo.jpg";
import applogo from "../Components/assets/applogo.png";
import { auth, db } from "../FirebaseConfigs/FirebaseConfig";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import Addproduct from "./Addproduct";

const Navbar = () => {
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const usersColletionRef = collection(db, "users");

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
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };
  return (
    <div className="navbar">
      <div className="LeftContainer">
        <img src={applogo} />
      </div>
      <div className="RightContainer">
        {!loggeduser && (
          <nav>
            <Link to="/">
              <button>Home</button>
            </Link>

            <Link to="/signup">
              <button>Register</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <div className="cart-btn">
              <img src={cartlogo} alt="no img" />
              <span className="cart-icon-css">0</span>
            </div>
            <Link to="userprofile">
              <img src={profilelogo} className="profile-icon" />
            </Link>
          </nav>
        )}
        {loggeduser && (
          <nav>
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/sellproduct">
              <button>Sell</button>
            </Link>
            <div className="cart-btn">
              <img src={cartlogo} alt="no img" />
              <span className="cart-icon-css">0</span>
            </div>
            <Link to="userprofile">
              <img src={profilelogo} className="profile-icon" />
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Navbar;
