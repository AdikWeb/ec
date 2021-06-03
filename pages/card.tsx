import {connect} from "react-redux";
import DefaultLayoutPage from "@/layouts/default-layout/default-layout-page";
import {Button, Container, Input} from "semantic-ui-react";
import {storeDispatch} from "@/redux/store.facade";
import CardList from "@/components/base/cardListItem";
import ProductsList from "@/components/shop/products/products-list";
import Link from "next/link";
const CardPage = ({shop}:any)=>{

    const addOrRemoveProduct = (val: number, item: any) => {
        const value: number = parseInt(String(val));
        if (value <= 1) {
            storeDispatch("UPDATE_CARD_PRODUCT_COUNT", 1)
        } else if (value >= +item.count) {
            storeDispatch("UPDATE_CARD_PRODUCT_COUNT", item.count)
        } else {
            storeDispatch("UPDATE_CARD_PRODUCT_COUNT", value)
        }
    }

    return (
        <>
            <DefaultLayoutPage>
                <Container>
                    <h1 className="page-title">Корзина</h1>
                    <div className="card-page">
                        <div className="card-page__list">
                            {shop.card.map((item: any, i:number)=>{
                                return (
                                    <CardList item={item} key={i} />
                                )
                            })}
                        </div>
                    </div>
                <Link href={'/oformit'}>
                    <Button disabled={!shop.card.length} className={'mt-4'} color={'green'}>
                        Офоромить заказ
                    </Button>
                </Link>
                </Container>
                <Container>
                    <ProductsList maxItem={3}/>
                </Container>
            </DefaultLayoutPage>
        </>
    )
}

const mapStateToProps = ({shop}:any)=>({
    shop
});

export default connect(mapStateToProps, null)(CardPage)

