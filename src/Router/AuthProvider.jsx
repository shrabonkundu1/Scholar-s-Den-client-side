// import React, { createContext, useEffect, useState } from 'react';
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { app } from '../Firebase/Firebase.config';
// export const AuthContext = createContext(null);
// const auth = getAuth(app);
// const AuthProvider = ({children}) => {

//     const [user,setUser] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const unSubscribe  =  onAuthStateChanged(auth,currentUser => {
//             setUser(currentUser);
//             console.log(currentUser);
//             setLoading(false);
//         });
//         return () => {
//             return unSubscribe()
//         }
//     },[])
//     const authInfo = {
//         user,
//         loading
//     }
//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;

import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../Firebase/Firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      console.error("Error signing in user:", error);
      throw error;
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setLoading(false);
      return result;
    } catch (error) {
      console.error("Error google signin user:", error);
    }
  };

  const logOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error signing out user:", error);
    }
  };

  const updateUserProfile = (name, photoUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     console.log(currentUser);
  //     setLoading(false);
  //   });
  //   return () => {
  //     return unSubscribe();
  //   };
  // }, []);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);

        if (currentUser) {
          const userInfo = { email: currentUser.email };
          axiosPublic
            .post("/jwt", userInfo)
            .then((res) => {
              // console.log("JWT Response:", res.data);
              if (res.data.token) {
                localStorage.setItem("access-token", res.data.token)
                // console.log("Token saved in localStorage:", res.data.token); 
                setLoading(false);
              }
            })
            .catch((error) => console.error("JWT Error:", error));
        } else {
          localStorage.removeItem("access-token");
          setLoading(false);
        }

       
        // console.log("current user", currentUser);
      });

      return () => unsubscribe();
    }, [axiosPublic]);
  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    logOutUser,
    updateUserProfile,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
