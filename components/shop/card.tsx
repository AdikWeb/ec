import {connect} from "react-redux";
import Link from "next/link";
import {Button, Icon, Message} from "semantic-ui-react";
import {storeDispatch} from "@/redux/store.facade";

const ACard = ({shop, removeCallback, show}: any) => {
    return (
        <>
            {show&&<div className="pop-cart">
                <div className="pop-cart__list">
                    {!shop.card.length&&
                    <Message icon>
                        <Icon name='inbox'/>
                        <Message.Content>
                            <Message.Header>Пусто</Message.Header>
                            <p>Корзина пуста</p>
                        </Message.Content>
                    </Message>
                    }
                    {shop && shop.card.map((productsFromCard: any, i: number) => {
                        return (
                            <div className="item" key={i}>
                                <div className="d-flex">
                                    <div className="card-product__image">
                                        <img src={productsFromCard.product.image} alt=""/>
                                    </div>
                                    <div className="card-product__info d-flex direction-column">
                                        <div className="info__title mb-1">
                                            <h4>{productsFromCard.product.title}</h4>
                                        </div>
                                        <div className="info__price">
                                            <small>цена: {productsFromCard.product.price}kzt</small>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="card-product__buttons d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <Button color={'green'} inverted icon={'minus'} size={'mini'}
                                                className={'mr-1'}/>
                                        {productsFromCard.count}
                                        <Button color={'green'} inverted icon={'plus'} size={'mini'}
                                                className={'ml-1'}/>
                                    </div>
                                    <div className="sum"><b>
                                        итог: {productsFromCard.product.price * productsFromCard.count}kzt
                                    </b></div>
                                    <div className="remove__item">
                                        <Button icon={'trash'} size={'tiny'} color={'red'} onClick={() => {
                                            storeDispatch("REMOVE_FROM_CARD", productsFromCard.product.id)
                                            if (removeCallback) removeCallback();
                                        }}/>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="card-result">
                        <Link href={'/card'}>
                            <Button fluid color={'green'}>
                                Перейти в корзину
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>}
        </>
    );
}

const mapStateToProps = ({shop}: any) => ({
    shop
});

export default connect(mapStateToProps)(ACard);