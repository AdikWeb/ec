import {storeDispatch} from "@/redux/store.facade";
import {PRODUCTS_LOADED, UPDATE_PRODUCTS} from "@/redux/shop/shop.const";
import {addDocument, deleteDocument, getDocument, getDocuments, updateDocument} from "@/services/firebase.func";
import {getAllCatalog} from "@/api/shop/catalog.api";

export const getProducts = async (catalog?: string | string[] | undefined) => {
    storeDispatch(PRODUCTS_LOADED, false);
    storeDispatch(UPDATE_PRODUCTS, null);
    const docs = catalog?await getDocuments("shop_products", ["category", "==", catalog]):await getProductsAll(true);
    const docsArray = docs.documentsToArray()
    storeDispatch(UPDATE_PRODUCTS, docsArray);
    storeDispatch(PRODUCTS_LOADED, true);
}
export const getProductsAll = async (ret?: boolean) => {
    const docs = await getDocuments("shop_products");
    return !ret?docs.documentsToArray(): docs;
}

export const getProduct = async (document: string | string[] | undefined) => {
    return await getDocument("shop_products", document).then().catch(e => "Товар не найден")
}

export const updateProduct = async (document: string, data: any, idCatalog?: string | string[] | undefined) => {
    return await updateDocument("shop_products", document, data).then(async () => {
        if(idCatalog) await getProducts(idCatalog);
        return "Товар обновлен";
    }).catch();
}

export const deleteProduct = async (document: any)=>{
    await deleteDocument("shop_products",document).then(async ()=>await getAllCatalog())
}

export const addProduct = async (data: any, idCatalog: string | string[] | undefined)=>{
    await addDocument("shop_products", data);
    await getProducts(idCatalog);
}