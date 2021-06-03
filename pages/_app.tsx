import 'semantic-ui-css/semantic.min.css'
import type {AppProps} from 'next/app'

import {Provider} from "react-redux";
import Store from "@/redux/store";
import {useEffect} from "react";
import {getAllCatalog} from "@/api/shop/catalog.api";
import {CHECK_ROLE_API} from "@/api/user/user.api";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import initFirebase from "@/services/firebase";
initFirebase();

import "@/styles/globals.scss"

function MyApp({Component, pageProps}: AppProps) {
    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            CHECK_ROLE_API(user).then(r => r);
        })
        getAllCatalog().then(r => r)
    }, [])
    return <Provider store={Store}>
        <Component {...pageProps} />
    </Provider>
}

export default MyApp
