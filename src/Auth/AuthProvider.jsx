import React, { createContext, useEffect, useState } from 'react';
//import { createUserWithEmailAndPassword } from "firebase/auth";
//import { auth } from './firebaseconfig';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from './firebaseconfig';
import axios from 'axios';

export const AuthContext = createContext();
const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [role, setRole] = useState();
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider);
    }

    const signout = () => {
        return signOut(auth);
    }
    const updateuser = (updateddata) => {
        return updateProfile(auth.currentUser, updateddata);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => unsubscribe();
    }, [])

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    useEffect(()=>{
        axios.get(`http://localhost:3000/users/${user?.email}`)
        .then((res)=>{
            console.log(res.data.role);
            setRole(res.data.role);
        })
    })

    const authdata = {
        createUser,
        setUser,
        user,
        signIn,
        signout,
        resetPassword,
        signInWithGoogle,
        updateuser,
        role
    };

    return (
        <AuthContext.Provider value={authdata}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;