import {Button} from "semantic-ui-react";
import {deleteProduct, getProduct, getProducts} from "@/api/shop/products.api";
import {useState} from "react";

interface IProps {
    id: string;
    idCatalog: string | string[] | undefined;
    title: string;
    image: string;
    description: string;
    price: string;
    editProduct?: any;
}

const AdminProductCard = (props: IProps)=>{
    const [editLoadingState, setEditLoadingState] = useState<boolean>(false);
    const [removeLoadingState, setRemoveLoadingState] = useState<boolean>(false);

    const editHandle = async ()=>{
        setEditLoadingState(true);
        await getProduct(props.id).then(r => {
            props.editProduct(r, props.id);
        });
        setEditLoadingState(false);
    };
    const deleteHandle = async ()=>{
        setRemoveLoadingState(true);
        await deleteProduct(props.id).then();
        await getProducts(props.idCatalog);
        setRemoveLoadingState(false);
    };

    return (
        <>
            <div className="products-card d-flex direction-column">
                <div className="image mb-2">
                    <img src={props?.image} alt=""/>
                </div>
                <div className="info d-flex direction-column">
                    <h2 >{props?.title}</h2>
                    <strong>Цена: {props?.price} kzt</strong>
                    <p className="mt-a description">{props?.description}</p>
                    <div className="d-flex align-items-center">
                        <Button loading={editLoadingState} fluid onClick={()=>editHandle()}>
                            Редактировать
                        </Button>
                        <Button loading={removeLoadingState} onClick={()=>deleteHandle()} color={'red'} icon={'trash'}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProductCard;