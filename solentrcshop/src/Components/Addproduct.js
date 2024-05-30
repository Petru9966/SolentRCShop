import React, { useState, useEffect } from "react";
import { storage, auth, db } from "../FirebaseConfigs/FirebaseConfig";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Navbar from "./Navbar";
import "./Addproduct.css";
const Addproduct = () => {
  const [producttitle, setProductTitle] = useState("");
  const [producttype, setProductType] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [customersupport, setCustomersupport] = useState("");
  const [price, setPrice] = useState("");
  const [warranty, setWarranty] = useState("");
  const [productimage, setProductImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [user, setUser] = useState("");
  const usersCollectionRef = collection(db, "users");
  function GetCurrentUser() {
    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
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
  const types = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/PNG",
  ];

  const handleProductImg = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setProductImage(selectedFile);
        setImageError("");
      } else {
        setProductImage(null);
        setImageError("Please Select A Valid Image Type (png or jpg)");
      }
    } else {
      setImageError("Please Select Your File");
    }
  };
  const loggeduser = GetCurrentUser();
  const handleAddProduct = (e) => {
    e.preventDefault();
    const storageRef = ref(
      storage,
      "product-images${producttype.toUpperCase()}/${Date.now()}"
    );
    uploadBytes(storageRef, productimage).then(() => {
      getDownloadURL(storageRef).then((url) => {
        addDoc(collection(db, "products-${producttype.toUpperCase()}"), {
          producttitle,
          producttype,
          description,
          brand,
          customersupport,
          price,
          warranty,
          productimage: url,
        });
      });
    });
  };
  return (
    <div>
      <Navbar />
      {loggeduser && loggeduser[0].email == "petru@gmail.com" ? (
        <div className="addprod-container">
          <form className="addprod-form" onSubmit={handleAddProduct}>
            <p>Add Data</p>
            {successMsg && <div className="succes-msg">{successMsg}</div>}
            {uploadError && <div className="error-msg">{uploadError}</div>}

            <label>Product Title</label>
            <input
              onChange={(e) => {
                setProductTitle(e.target.value);
              }}
              type="text"
              placeholder="Product Title"
            />
            <label>Product Type</label>
            <input
              onChange={(e) => {
                setProductType(e.target.value);
              }}
              type="text"
              placeholder="Product Type"
            />
            <label>Brand</label>
            <input
              onChange={(e) => {
                setBrand(e.target.value);
              }}
              type="text"
              placeholder="Brand Name"
            />
            <label>Warranty</label>
            <input
              onChange={(e) => {
                setWarranty(e.target.value);
              }}
              type="text"
              placeholder="Product Warranty"
            />
            <label>Image</label>
            <input onChange={handleProductImg} type="file" />
            {imageError && (
              <>
                <div className="error-msg">{imageError}</div>
              </>
            )}
            <label>Description</label>

            <textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Briefly Describe Your Product"
            ></textarea>
            <label>Price Without Tax</label>
            <input
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              type="text"
              placeholder="Input Price Before Tax"
            />
            <label>Custommer Support</label>
            <input
              onChange={(e) => {
                setCustomersupport(e.target.value);
              }}
              type="text"
              placeholder="Customer Support Email, Phone Number And Address"
            />
            <button type="submit">Add</button>
          </form>
        </div>
      ) : (
        <div>You are not authorised to add products</div>
      )}
    </div>
  );
};

export default Addproduct;
