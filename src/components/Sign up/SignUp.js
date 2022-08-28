import { getAuth, GoogleAuthProvider,signInWithPopup,signOut,createUserWithEmailAndPassword } from "firebase/auth";
import {app} from '../../firebaseConfig'
import { useState } from "react";



const auth = getAuth(app);
const provider = new GoogleAuthProvider();



//========================== button handlers==========================//


function SignUp() {
  const [isLogIn, setIslogIn] = useState(false);
  // ========================== state Deceleration Area ends ==========================//
  //========================== button handlers==========================//
  const handelSignOut = ()=>{
    const auth = getAuth();
    signOut(auth).then(() => {
      setIslogIn(false);
      console.log('sign out successful')
    }).catch((error) => {
      // An error happened.
    });
  }
const handelGooglePopup = () =>{
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      setIslogIn(true);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

///////////Sign in with Email & Password Area////////////
///////////------------------------------////////////
///////////Sign in with Email & Password Area////////////
 const [ email, setEmail ] = useState('');
 const [ password, setPassword ] = useState('');

 const handelBlur = (e) => {
  if(e.target.name === 'email'){
    setEmail(e.target.value)
  }
  if(e.target.name === 'password'){
    setPassword(e.target.value)
  }

 }

 const handelFormSubmit = (e) =>{
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      setIslogIn(true)
      console.log(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    e.preventDefault();
 }

  return (
    <div className="App">
      <h1>React firebase Authentication</h1>

      <form  action="submit">
        <input onBlur={handelBlur} required type="email" name="email" placeholder="Type your email..." />
        <br />
        <input onBlur={handelBlur} required type="password" name="password" placeholder="Password..." />
        <br />
        <button onClick={handelFormSubmit} className="btn" type="submit" >Log In</button>
      </form>

      {
        isLogIn ?<button className="btn" onClick={handelSignOut}>Sign Out</button> : <button className="btn" onClick={handelGooglePopup}>Sign In with Google</button>
      }
    </div>
  );
}

export default SignUp