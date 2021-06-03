import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import {getApp} from "firebase/app";

import {storeDispatch} from "@/redux/store.facade";
import {SET_USER_ROLE, SHOW_AUTH_MODAL, USER_CHECKED, USER_INVALID_DATA, USER_LOADING} from "@/redux/user/user.const";
import {useRouter} from "next/router";

export const LOGIN_USER_API = async (email: string, password: string) => {
    storeDispatch(USER_INVALID_DATA, null);
    if (email && password) {
        const auth = getAuth();
        storeDispatch(USER_LOADING, true);
        await signInWithEmailAndPassword(auth, email, password)
        storeDispatch(SHOW_AUTH_MODAL, false);
    } else {
        storeDispatch(USER_INVALID_DATA, "Ошибка ввода данных");
    }
}

export const LOGOUT_USER_API = async () => {
    storeDispatch(USER_LOADING, true);
    const auth = getAuth();
    await signOut(auth);
    storeDispatch(USER_LOADING, false);
}

export const ADD_USER_API = async (email: string, password: string) => {
    storeDispatch(USER_INVALID_DATA, null);
    if (email && password) {
        storeDispatch(USER_LOADING, true);
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password).then(async () => {
            await LOGIN_USER_API(email, password)
            storeDispatch(SHOW_AUTH_MODAL, false);
        }).catch((e) => {
            if (e.code === "auth/email-already-in-use") {
                storeDispatch(USER_INVALID_DATA, "Такой пользователь уже существует");
            }
        })
        storeDispatch(USER_LOADING, false);
        storeDispatch(USER_CHECKED, true);
    }
}

export const CHECK_ROLE_API = async (user: any) => {
    const db = getFirestore(getApp());
    storeDispatch(USER_CHECKED, false);
    storeDispatch(SET_USER_ROLE, null)
    if (user) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", user?.uid));
        const querySnapshot = await getDocs(q);

        if(!querySnapshot.size){
            storeDispatch(SET_USER_ROLE, "user")
        }else{
            querySnapshot.forEach((doc) => {
                const {role}: any = doc.data();
                storeDispatch(SET_USER_ROLE, role)
            })
        }
    }
    storeDispatch(USER_CHECKED, true);
    storeDispatch(USER_LOADING, false);
}