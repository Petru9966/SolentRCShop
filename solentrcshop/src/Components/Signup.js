import React,{useState} from "react";
import Navbar from "./Navbar";
import { Link} from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db} from "..FirebaseConfigs/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
//import { handle } from 'express/lib/application';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const [errorMsg,setErrorMsg] = useState("");
  const [succesMsg,setSuccesMsg] = useState("");
  const handleSubmit = (e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        const user = userCredential.user;
        const initialcartvalue = 0;
        console.log(user);
        addDoc(collection(db,"users"),
        {username: username, email: email, phonenumber: phonenumber, password: password,
           cart: initialcartvalue, address: address, uid: user.uid})
        .then(()=>{setSuccesMsg
          ("New user added successfully,You will now be automatically redirected to Login Page.");
          setUsername("");
          setPhonenumber("");
          setEmail("");
          setPassword("");
          setErrorMsg("");
          setTimeout(() =>{
              setSuccesMsg("");
              navigate("/login");
          },4000);        
    })
    .catch((error) => {setErrorMsg(error.message)});
    })
    .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-email).")
        {setErrorMsg("Please fill all required fields!");
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setErrorMsg("User already exists");
      }
      }
    });
  };

  return (
      <div>
          <Navbar/>
          <div className="signup-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                      <p>Create New Account</p>
                      <div></div>
                      {succesMsg&&<>
                      <div className="succes-msg">
                          {succesMsg}
                      </div></>}
                      {errorMsg&& <>
                      <div className="error-msg">
                          {errorMsg}
                      </div></>}                  
                      <label>Your Name</label>
                      <input onChange={(e)=>setUsername(e.target.value)}
                      type='text' placeholder="First And Last Name"/>
                      <label>Mobile Phone Number</label>
                      <input onChange={(e)=>setPhonenumber(e.target.value)}
                      type='tel' placeholder="Please enter Your Mobile Phone Number"/>
                      <label>Your Email</label>
                      <input onChange={(e)=>setEmail(e.target.value)}
                      type='email' placeholder="Please enter Your Email Address"/>
                      <label>Password</label>
                      <input onChange={(e)=>setPassword(e.target.value)}
                      type='password' placeholder="Please enter Your Password"/>
                      <label>Address</label>
                      <textarea onChange={(e)=>setAddress(e.target.value)}
                      placeholder="Please Enter Your Address"></textarea>
                      <button type='submit'>Sign up</button>
                      <div>
                          <span>Already have an account?</span>
                          <Link to="/login">Sign In</Link>  
          
                      </div>
                    </form> 
                            
              </div>
        
      </div>
      
        
 
    
  )
}

export default Signup