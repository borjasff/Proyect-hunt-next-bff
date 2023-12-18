import App from "next/app";
import React from "react";
import firebase from '../firebase/firebase';
import {FirebaseContext} from '../firebase';
import useAuthentication from "../hooks/useAuth";

const MyApp = props => {
    const user = useAuthentication()

    const { Component, pageProps} = props

    return(
        <>       
            <FirebaseContext.Provider 
            value={{
                firebase,
                user
                }}>         
                <Component {...pageProps} />       
            </FirebaseContext.Provider>     
        </>
    )
}

export default MyApp