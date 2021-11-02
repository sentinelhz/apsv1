/* eslint-disable prettier/prettier */
import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";

import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD7nS4-oNTA_KcWqgFi_CMLX6S1JjdxBZ4",
  authDomain: "aps-app-94692.firebaseapp.com",
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: "aps-app-94692",
  storageBucket: "aps-app-94692.appspot.com",
  messagingSenderId: "393070540297",
  appId: "1:393070540297:web:9c847f174e75c17bc7aad8",
  measurementId: "G-MW0RTSCTWP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export const handleUserProfile = async ({userAuth, addionalData}) => {
    if (!userAuth){
        return;
    }
    const {uid} = userAuth;

    const userRef = firestore.doc(`users/${uid}`);
    const snapshot  = await userRef.get();

    if (!snapshot.exists){
        const {displayName, email} = userAuth;
        const timestemp = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt:timestemp,
                ...addionalData,
            });

        } catch (err){
            console.log(err);
        }
    }
    return userRef;
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
};



export {
    auth,
    firestore,
    storage,
};
