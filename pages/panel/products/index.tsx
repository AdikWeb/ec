import ProductsGrid from "@/components/base/productsGrid";
export default function ProductsCatalog (pageProps: any){
    const props = {...pageProps};
    return <ProductsGrid {...props}/>
}