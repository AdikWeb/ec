import firebase from "firebase/app";
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBQT9j7sh2REfk1Vg0QeysEQh31GHaRlu4",
    authDomain: "econom-822de.firebaseapp.com",
    projectId: "econom-822de",
    storageBucket: "econom-822de.appspot.com",
    messagingSenderId: "1095775978349",
    appId: "1:1095775978349:web:75cfe7dffc60562aab5064",
    measurementId: "G-TV9C487XW0"
};

const initFirebase = () => {
    if(!getApps().length) return initializeApp(firebaseConfig);
    else getApps();
}

export const firebaseApp = initFirebase();
export default initFirebase;