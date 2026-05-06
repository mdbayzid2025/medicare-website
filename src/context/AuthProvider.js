
import { auth } from "firebase.init";
import React, {createContext, useEffect, useState}  from "react"

  import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';

const AuthContext = createContext();



const AuthProvider = ({children}) =>{
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = (email, password) => {
    
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const login = (email, password) => {    
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  
  const logOut = ()=> {
    localStorage.removeItem("auth-token")
    return signOut(auth)
  }
  const  userInfo = {
    signUp,
    login,
    logOut,
    user,
    loading,
  }

  useEffect(()=>{ 
    const unsubscribe = onAuthStateChanged(auth, currentUser=>{
      console.log("current user", currentUser)
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe()
  },[])



  return (<AuthContext.Provider value={userInfo}>
    {children}
  </AuthContext.Provider>)
}

export default AuthProvider;
