import DefaultLayout from "../layouts/default-layout/default-layout";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import {connect} from "react-redux";
import TopPanel from "@/components/base/top-panel";
import {Button, Container} from "semantic-ui-react";
import ProductsList from "@/components/shop/products/products-list";
import ACard from "@/components/shop/card";

const Home = ({catalog, dispatch}: { catalog: any, dispatch: any }) => {
    const HeaderTemplate = () => (
        <header className={'main-page-header'}>
            <TopPanel/>
            <div
                className="d-flex direction-column h100 main-page-header__content align-items-center justify-content-center">
                <h1>Экономь</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, tempora?</p>
            </div>
        </header>
    );

    return (
        <DefaultLayout header={HeaderTemplate()}>
            <Container>
                <div className="main-page__products__list">

                    <div className="d-flex direction-column align-items-center main-page__products">
                        <div className="d-flex justify-content-center">
                            <div className="image">
                                <img src="https://images11.domashnyochag.ru/upload/img_cache/e84/e84a106cf40d0063b2e71e9f1534e21f_cropped_1332x1332.jpeg" alt=""/>
                            </div>
                            <div className="info">
                                <Link href={'/'}>
                                    <h2 className="info__title">
                                        «Эстилодез антисептик»
                                    </h2>
                                </Link>
                                <p className="info__para">«Эстилодез антисептик» - антисептическое средство для кожных покровов, разработанное специально для предприятий индустрии красоты и бытового применения. В рецептуре препарата была реализована формула «старшего брата» - «Эстилодез антисептик люкс»: микс двух спиртовых соединений - 2-пропанол и 1-пропанол до 60%, усиливающий компонент, но исключены ухаживающие и смягчающие кожу компоненты. С одной стороны, это, конечно, минус, но с профессиональной точки зрения это помогает лучше обезжирить кожу клиента/пацианта перед манипуляциями.</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex direction-column align-items-center main-page__products">
                        <div className="d-flex justify-content-center">
                            <div className="image">
                                <img src="https://images11.domashnyochag.ru/upload/img_cache/e84/e84a106cf40d0063b2e71e9f1534e21f_cropped_1332x1332.jpeg" alt=""/>
                            </div>
                            <div className="info">
                                <Link href={'/'}>
                                    <h2 className="info__title">
                                        «Эстилодез антисептик»
                                    </h2>
                                </Link>
                                <p className="info__para">«Эстилодез антисептик» - антисептическое средство для кожных покровов, разработанное специально для предприятий индустрии красоты и бытового применения. В рецептуре препарата была реализована формула «старшего брата» - «Эстилодез антисептик люкс»: микс двух спиртовых соединений - 2-пропанол и 1-пропанол до 60%, усиливающий компонент, но исключены ухаживающие и смягчающие кожу компоненты. С одной стороны, это, конечно, минус, но с профессиональной точки зрения это помогает лучше обезжирить кожу клиента/пацианта перед манипуляциями.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <div className="main-page__catalog">
                    <div className="page-title center">
                        Категории
                    </div>
                    <div className="main-page-catalog__list-wrapper">
                        <div className="main-page-catalog__list d-flex align-items-center justify-content-center">
                            {catalog&&catalog.map((item: any, i: number)=>{
                                if(i <= 5){
                                    return (
                                        <Link key={i} href={'/catalog/'+ item.id}>
                                            <a className="item">
                                                <div className="item__image">
                                                    <img
                                                        src={item.icon}
                                                        alt={item.title}/>
                                                </div>
                                                <div className="item__title">
                                                    <h5>{item.title}</h5>
                                                </div>
                                            </a>
                                        </Link>
                                    )
                                }
                            })}
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link href={'/catalog'}>
                                <Button color={'blue'}>
                                    Подробнее
                                </Button>
                            </Link>
                        </div>
                    </div>
            </div>
            <Container>
                <ProductsList maxItem={3}/>
            </Container>
        </DefaultLayout>
    );
}

const mapStateToProps = ({shop}: any) => ({
    catalog: shop.catalog
});

export default connect(mapStateToProps, null)(Home);