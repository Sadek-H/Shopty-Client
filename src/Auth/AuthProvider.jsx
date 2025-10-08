import React, { createContext, useEffect, useState } from 'react';
//import { createUserWithEmailAndPassword } from "firebase/auth";
//import { auth } from './firebaseconfig';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from './firebaseconfig';

export const AuthContext = createContext();
const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
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

    const authdata = {
        createUser,
        setUser,
        user,
        signIn,
        signout,
        resetPassword,
        signInWithGoogle,
        updateuser
    };

    return (
        <AuthContext.Provider value={authdata}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;