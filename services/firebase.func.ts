import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    updateDoc,
    where
} from "firebase/firestore";
import {getApp} from "firebase/app";
import initFirebase from "@/services/firebase";

initFirebase();
const db = getFirestore(getApp());

export const getDocument = async (path: string, document: any) => {
    const docSnap = await getDoc(doc(db, path, document));
    if (docSnap.exists()) return docSnap.data();
    return null;
}

export const getDocuments = async (path: string, queryArg?: any[]) => {
    let documentsArray:any = [];
    const collections = collection(db, path);
    const q = queryArg?.length?await query(collections, where(queryArg[0], queryArg[1], queryArg[2])): collections;
    const documents = await getDocs(q);
    const documentsToArray = ()=>{
        documents.forEach((doc)=>{
            let json = JSON.parse(JSON.stringify(doc.data()));
            json.id = doc.id;
            documentsArray = documentsArray.concat(json);
        });
        return documentsArray;
    }
    return {
        documents,
        documentsToArray
    }
}

export const addDocument = async (path: string, data: any) => {
    await addDoc(collection(db, path), data)
}

export const updateDocument = async (path: string, document: any, data: any) => {
    const docRef = doc(db, path, document);
    return await updateDoc(docRef, data);
}

export const deleteDocument = async (path: string, document: any) => {
    return await deleteDoc(doc(db, path, document));
}