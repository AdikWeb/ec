import {storeDispatch} from "@/redux/store.facade";
import {CATALOG_LOADED, UPDATE_CATALOG} from "@/redux/shop/shop.const";
import {addDocument, deleteDocument, getDocument, getDocuments, updateDocument} from "@/services/firebase.func";

export const getAllCatalog = async ()=>{
    storeDispatch(CATALOG_LOADED, false)
    storeDispatch(UPDATE_CATALOG, null);
    const docs = await getDocuments("shop_catalog");
    let arrayDocs = docs.documentsToArray();
    storeDispatch(UPDATE_CATALOG, arrayDocs);
    storeDispatch(CATALOG_LOADED, true);
}

export const getCatalog = async (document: string | string[] | undefined) => {
    return await getDocument("shop_catalog", document).then((r)=>{
        return r
    }).catch(e=>e);
}

export const updateCatalog = async (document: string, data: any)=>{
    return await updateDocument("shop_catalog",document,data).then( async ()=>{
        await getAllCatalog();
        return "Каталог обновлен";
    }).catch()
}

export const deleteCatalog = async (document: any)=>{
    await deleteDocument("shop_catalog",document).then(async ()=>await getAllCatalog())
}

export const addCatalog = async (data: any)=>{
    await addDocument("shop_catalog", data);
    await getAllCatalog();
}