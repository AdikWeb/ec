import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {firebaseApp} from "@/services/firebase";
const storage = getStorage(firebaseApp);

export const uploadFile = async (path: string, file: any)=>{
    const mountainsRef = ref(storage, path+'/'+(Date.now()+'_'+file[0].name));
    return await uploadBytes(mountainsRef, file[0]).then(async (snapshot) => {
        return await getDownloadURL(snapshot.ref).then(link=>({link, snapshot}))
    });
}