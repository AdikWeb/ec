import {connect} from "react-redux";
import initFirebase from "@/services/firebase";
import {Container} from "semantic-ui-react";
import DefaultLayoutPage from "@/layouts/default-layout/default-layout-page";
import {useRouter} from "next/router";

import ProductsList from "@/components/shop/products/products-list";
import {useEffect, useState} from "react";
import {getCatalog} from "@/api/shop/catalog.api";
initFirebase();

const CatalogId = ({shop}:any)=>{
    const idFromRouter = useRouter().query.id;
    const [catalogInfo, setCatalogInfo] = useState<any>({name:'', icon:'', description: ''});
    useEffect(() => {
        getCatalog(idFromRouter).then(r => setCatalogInfo(r));
    }, []);

    return (
        <>
            <DefaultLayoutPage>
                <Container>
                    <div className="catalog-page">
                        <div className="catalog-page__info">
                            <div className="d-flex align-items-start">
                                <div className="image">
                                    <img src={catalogInfo.icon} alt={''}/>
                                </div>
                                <div className="info">
                                    <div className="category">
                                        <span>Категория:</span>
                                    </div>
                                    <div className="name">
                                        <h1>{catalogInfo.title}</h1>
                                    </div>
                                    <div className="description">
                                        <p>{catalogInfo.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ProductsList idCatalog={idFromRouter}/>
                    </div>
                </Container>
            </DefaultLayoutPage>
        </>
    )
}

interface IProps {
    shop: any;
}

const  mapStateToProps = ({shop}:IProps) => ({
    shop
});

export default connect(mapStateToProps,null)(CatalogId);

