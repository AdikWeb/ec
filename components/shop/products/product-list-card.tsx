import {Button, Input} from "semantic-ui-react";
import Link from "next/link";
import {connect} from "react-redux";
import {useEffect, useState} from "react";

interface Product {
    item: any;
    shop?: any;
    dispatch?: any;
}

const ProductListCard = ({item, shop, dispatch}: Product) => {
    const [countProductToBay, setCountProductToBay] = useState<number>(0);
    const [cardAdded, setCardAdded] = useState<boolean>(false);
    const AddToCard = () => {
        if(countProductToBay){
            dispatch({
                type: "ADD_TO_CARD", payload: {
                    product: item,
                    count: countProductToBay
                }
            })
        }
    }

    const addOrRemoveProduct = (val: number) => {
        const value: number = parseInt(String(val));
        if (value <= 0) {
            setCountProductToBay(0)
        } else if (value >= +item.count) {
            setCountProductToBay(+item.count)
        } else {
            setCountProductToBay(value)
        }
    }

    useEffect(() => {
        const card = shop.card.find((product: any)=> product.product.id === item.id);
        setCardAdded(!!card)
    }, [shop.card]);

    return (
        <>
            <div className={'product'}>
                <div className={"product__image"}>
                    <img src={item.image} alt=""/>
                </div>
                <div className="counter-shop-button d-flex align-items-center">
                    <Button className={'mr-0'} onClick={() => addOrRemoveProduct(countProductToBay - 1)} size={'tiny'}
                            color={'green'} icon={'minus'}/>
                    <Input onInput={(e: any) => addOrRemoveProduct(e.currentTarget.value)} size={'mini'}
                           value={countProductToBay}/>
                    <Button onClick={() => addOrRemoveProduct(countProductToBay + 1)} size={'tiny'}
                            color={'green'} icon={'plus'}/>
                    {!cardAdded&&<Button disabled={item.count===0} onClick={() => AddToCard()} className={'ml-2'} size={'tiny'} color={'green'}>
                        Купить
                    </Button>}
                    {cardAdded&&<Button disabled={true} onClick={() => AddToCard()} className={'ml-2'} size={'tiny'} color={'green'}>
                        В корзине
                    </Button>}
                </div>
                <div className="product__info">
                    <div className="info">
                        <Link href={'/product/'+item.id}>
                            <h2 className="info__title">
                                {item.title}
                            </h2>
                        </Link>
                        <div className="info__price">
                            Цена: <b>{item.price}kzt</b>
                        </div>
                        <div className="info__count">
                            количество: {item.count || 0}шт
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = ({shop}: any) => ({
    shop
})
export default connect(mapStateToProps, null)(ProductListCard);
