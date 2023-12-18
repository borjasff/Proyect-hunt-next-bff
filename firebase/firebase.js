import app from 'firebase/compat/app';

import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile} from "@firebase/auth";
import { initializeApp } from 'firebase/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getFirestore } from '@firebase/firestore'
import { getStorage } from '@firebase/storage';

import firebaseConfig from "./config";
class Firebase {
    constructor() {
        if(!app.apps.length){
            initializeApp(firebaseConfig);
            
        }
        this.auth = getAuth();
        this.db = getFirestore()
        this.storage = getStorage(this.app);
        
    }

    //register a user
    async register(name, email, password) {
        const newUser = await createUserWithEmailAndPassword(this.auth, email, password)

        return await updateProfile(newUser.user,{
            displayName: name
        })
    }

    //login a user
    async login(email, password) {
        return signInWithEmailAndPassword(this.auth, email, password)
    }

    //logout a user
    async logout() {
        return this.auth.signOut()
    }
}

const firebase = new Firebase()

export default firebase