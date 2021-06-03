import {connect} from "react-redux";
import {useRouter} from "next/router";
import {getProduct} from "@/api/shop/products.api";
import {useEffect, useState} from "react";
import DefaultLayoutPage from "@/layouts/default-layout/default-layout-page";
import {Button, Container, Input} from "semantic-ui-react";
import {getCatalog} from "@/api/shop/catalog.api";
import ProductsList from "@/components/shop/products/products-list";

const ProductDetail = ({dispatch, shop}:any)=>{
    const Router = useRouter();
    const idProductFromRouter = Router.query.idProduct;
    const [idProd, setIdProd] = useState<string | string[] | undefined>(undefined);
    const [productDetail, setProductDetail] = useState<any|boolean>({
        category: "",
        count: "",
        description: "",
        image: "",
        price: "",
        title: ""
    });
    const [countProductToBay, setCountProductToBay] = useState<number>(0);
    const [cardAddedDetail, setCardAddedDetail] = useState<boolean>(false);

    const fetchData = async ()=>{
        let data:any;
        await getProduct(idProd).then((r:any)=> {
            data = r;
        }).catch(e=>console.log(e))

        await getCatalog(data?.category).then(res => setProductDetail({...data, catalogName: res?.title}))
            .catch(e=> setProductDetail({...data, catalogName: 'Без категории'}))
        return data;
    }

    useEffect(() => {
        setIdProd(idProductFromRouter);
    }, [idProductFromRouter]);

    useEffect(() => {
        fetchData().then(r => r);
    }, [idProd]);

    // useEffect(() => {
    //     const card = shop.card.find((product: any)=> product.product.id === productDetail.id);
    //     setCardAddedDetail(!!card)
    // }, [shop.card]);

    const AddToCardDetail = () => {
        if(countProductToBay){
            dispatch({
                type: "ADD_TO_CARD", payload: {
                    product: productDetail,
                    count: countProductToBay
                }
            })
        }
    }

    const addOrRemoveProduct = (val: number) => {
        const value: number = parseInt(String(val));
        if (value <= 0) {
            setCountProductToBay(0)
        } else if (value >= +productDetail.count) {
            setCountProductToBay(+productDetail.count)
        } else {
            setCountProductToBay(value)
        }
    }

    return (
        <>
            <DefaultLayoutPage>
                <Container>
                    <div className="detail-page">
                        <div className="d-flex align-items-center information">
                            <div className="detail-page__image">
                                <img src={productDetail?.image} alt=""/>
                            </div>
                            <div className="detail-page__info">
                                <div className="category d-flex align-items-end">
                                    <span>Категория: </span>
                                    <h2>{productDetail?.catalogName}</h2>
                                </div>
                                <div className="name">
                                    <h1>{productDetail?.title}</h1>
                                </div>
                                <div className="price">
                                    <span>цена: <b>{productDetail?.price}kzt</b></span>
                                </div>
                                <div className="count">
                                    <span>количество: {productDetail?.count}шт</span>
                                </div>
                                <div className="counter-shop-button d-flex align-items-center">
                                    <Button className={'mr-0'} onClick={() => addOrRemoveProduct(countProductToBay - 1)}
                                            color={'green'} icon={'minus'}/>
                                    <Input onInput={(e: any) => addOrRemoveProduct(e.currentTarget.value)}
                                           value={countProductToBay}/>
                                    <Button onClick={() => addOrRemoveProduct(countProductToBay + 1)}
                                            color={'green'} icon={'plus'}/>
                                    {!cardAddedDetail&&<Button disabled={productDetail?.count===0} onClick={() => AddToCardDetail()} className={'ml-2'} color={'green'}>
                                        Купить
                                    </Button>}
                                    {cardAddedDetail&&<Button disabled={true} onClick={() => AddToCardDetail()} className={'ml-2'} color={'green'}>
                                        В корзине
                                    </Button>}
                                </div>
                            </div>
                        </div>
                        <div className="description">
                            <p>{productDetail?.description|| 'Нет описания'}</p>
                        </div>
                    </div>
                </Container>
                <Container>
                    <div className="detail-page">
                        <ProductsList listTitle={'Похожие товары'} idCatalog={productDetail.category} maxItem={3}/>
                    </div>
                </Container>
            </DefaultLayoutPage>
        </>
    )
}

const mapStateToProps = ({shop}:any)=>({
    shop
})

export default connect(mapStateToProps, null)(ProductDetail);