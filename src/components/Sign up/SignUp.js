import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../../firebaseConfig";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const provider = new GoogleAuthProvider();

//========================== button handlers==========================//

function SignUp() {
  const auth = getAuth(app);
  const [isLogIn, setIslogIn] = useState(false);
  const navigate = useNavigate();
  // ========================== state Deceleration Area ends ==========================//
  //========================== button handlers==========================//
  const handelSignOut = () => {
    signOut(auth)
      .then(() => {
        setIslogIn(false);
        console.log("sign out successful");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const handelGooglePopup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        setIslogIn(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  ///////////Sign in with Email & Password Area////////////
  ///////////------------------------------////////////
  ///////////Sign in with Email & Password Area////////////
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handelBlur = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handelFormSubmit = (e) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg",
        }).then(() => {
          // Profile updated!
          navigate("/");
          console.log(userCredential.user);
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError("Sorry, This Email is already in use.");
        }
        console.log(error.code);
      });
    e.preventDefault();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  });

  return (
    <div className="App">
      <h1>React firebase Authentication</h1>
      <h3>Create New User</h3>

      <form action="submit">
        <input
          onBlur={handelBlur}
          required
          type="name"
          name="name"
          placeholder="Type your name..."
        />
        <br />
        <input
          onBlur={handelBlur}
          required
          type="email"
          name="email"
          placeholder="Type your email..."
        />
        <br />
        <input
          onBlur={handelBlur}
          required
          type="password"
          name="password"
          placeholder="Password..."
        />
        <br />
        <button onClick={handelFormSubmit} className="btn" type="submit">
          Sign Up
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Log In</Link>{" "}
      </p>
      {isLogIn ? (
        <button className="btn" onClick={handelSignOut}>
          Sign Out
        </button>
      ) : (
        <button className="btn" onClick={handelGooglePopup}>
          Sign In with Google
        </button>
      )}
    </div>
  );
}

export default SignUp;
