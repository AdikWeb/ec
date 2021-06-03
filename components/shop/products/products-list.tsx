import {connect} from "react-redux";
import {useEffect} from "react";
import {getProducts} from "@/api/shop/products.api";
import ProductListCard from "@/components/shop/products/product-list-card";
import {Icon, Message} from "semantic-ui-react";
const ProductsList = ({shop, idCatalog, maxItem, listTitle}: { shop?: any; idCatalog?: string | string[] | undefined; maxItem?: number; listTitle?: string; }) => {
    const idCatalogFromRouter = idCatalog || undefined;

    useEffect(() => {
        if (idCatalogFromRouter) getProducts(idCatalogFromRouter).then();
        else getProducts().then()
    }, [idCatalogFromRouter]);

    return (
        <>
            {!shop.productsLoaded &&
            <Message icon>
                <Icon name='circle notched' loading/>
                <Message.Content>
                    <Message.Header>Загрузка товаров</Message.Header>
                    Пожалуйста подождите пока обработается запрос
                </Message.Content>
            </Message>}

            {(shop.productsLoaded && !shop.products.length) && <div>
                <Message icon>
                    <Icon name='inbox'/>
                    <Message.Content>
                        <Message.Header>Пусто</Message.Header>
                        <p>Каталог пуст.</p>
                    </Message.Content>
                </Message>
            </div>}
            <div className="a-products">
                {listTitle&&<h1>{listTitle}</h1>}
                <div className="a-products-list">
                    {shop.products&&shop.products.map((item: any, i: number)=> {
                        if(maxItem) {
                            if (i < maxItem) return <ProductListCard item={item} key={i}/>
                        } else return <ProductListCard item={item} key={i}/>
                    })}
                </div>
            </div>
        </>
    );
}
const mapStateToProps = ({shop}: any) => ({
    shop
})
export default connect(mapStateToProps, null)(ProductsList)