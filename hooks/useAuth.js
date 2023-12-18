import { useEffect, useState } from "react";
import React from "react";
import firebase from "../firebase";

export default function useAuthentication(){

    const [userAuth, setUserAuth] = useState(null)

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            if( user){
                setUserAuth(user)
            } else {
                setUserAuth(null)
            }
        }
            )
            return () => unsubscribe()
    }, [])

    return userAuth
}