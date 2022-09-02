import React, { useEffect, useState } from "react";
import "./Home.css";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const handelLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Identify isLogIn//
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(auth.currentUser);
        setName(auth.currentUser.displayName);
        setEmail(auth.currentUser.email);
        setPhotoUrl(auth.currentUser.photoURL);
      } else {
        navigate("/login");
      }
    });
  });

  return (
    <div className="home">
      <h1>React firebase Authentication</h1>
      <h1>User's Dashboard</h1>
      <br />
      <button onClick={handelLogOut}>Log Out</button>

      {auth.currentUser && (
        <div className="box">
          <div>
            <img src={photoUrl} alt="" />
          </div>
          <div>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
