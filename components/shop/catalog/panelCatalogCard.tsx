import {Button} from "semantic-ui-react";
import {useState} from "react";
import {deleteCatalog, getCatalog} from "@/api/shop/catalog.api";
import {useRouter} from "next/router";

interface iCardProps {
    id: string;
    icon: string;
    title: string;
    editData?: any;
}

const PanelCatalogCard = ({icon, title, id, editData}: iCardProps) => {
    const [removeLoading, setRemoveLoading] = useState<boolean>(false);
    const [editLoading, setEditLoading] = useState<boolean>(false);
    const Router = useRouter();
    const deleteCatalogHandle = async () => {
        setRemoveLoading(true)
        await deleteCatalog(id).then(() => {
            console.log("deleted")
        })
        setRemoveLoading(false)
    }

    const handleEditButton = async () => {
        setEditLoading(true);
        if (id) {
            let data = await getCatalog(id).then(r => r);
            if (editData) editData(data, id);
        }
        setEditLoading(false);
    }

    return (
        <>
            <div className={'catalog-item'}>
                <div className="catalog-item__icon mb-2">
                    <img src={icon || 'https://i.stack.imgur.com/y9DpT.jpg'} alt=""/>
                </div>
                <h3 className={'mb-2'}>{title}</h3>
                <div className="d-flex align-items-center mt-a">
                    <Button onClick={() => handleEditButton()} loading={editLoading} size={'mini'} color={'blue'} fluid>
                        Редактировать
                    </Button>
                    <Button onClick={() => deleteCatalogHandle()} loading={removeLoading} size={'mini'} color={'red'}
                            icon={'trash'}/>
                </div>
                <Button className={'mt-2'} onClick={() => Router.replace('/panel/products/' + id)} size={'mini'} fluid>
                    Товары
                </Button>
            </div>
        </>
    )
}

export default PanelCatalogCard;