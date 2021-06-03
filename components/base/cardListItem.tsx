import {Button, Input} from "semantic-ui-react";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {storeDispatch} from "@/redux/store.facade";

const CardList = ({item, shop}:{item:any, shop?:any, dispatch?:any})=>{
    const [count, setCount] = useState(item.count);
    const changeCount = (val: number)=>{
        setCount(val)
    }

    useEffect(()=>{
        storeDispatch("UPDATE_COUNT_PRODUCT_IN_CARD", {value: count, id: item.product.id});
    }, [count])
    return (
        <>
            <div className="item mb-2 d-flex align-items-center justify-content-between">
                <div className="image-name d-flex align-items-center">
                    <div className="item__image">
                        <img src={item.product.image} alt=""/>
                    </div>
                    <div className="item__name">
                        <h3>{item.product?.title}</h3>
                    </div>
                </div>
                <div className="item__info d-flex align-items-center">
                    <div className="sum">{+item.product.price*item.count}kzt</div>
                    <div className="counter-shop-button d-flex align-items-center">
                        <Button onClick={()=>changeCount(count-1)} className={'mr-0'}  size={'tiny'}
                                color={'green'} icon={'minus'}/>
                        <Input  size={'mini'} value={item.count}/>
                        <Button size={'tiny'}
                                onClick={()=>changeCount(count+1)}
                                color={'green'} icon={'plus'}/>
                    </div>
                    <Button size={'tiny'}
                            onClick={()=>storeDispatch("REMOVE_FROM_CARD", item.product.id)}
                            color={'red'} icon={'trash'}/>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = ({shop}:any)=>({
    shop
})

export default connect(mapStateToProps, null)(CardList);