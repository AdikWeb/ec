import {connect} from "react-redux";
import initFirebase from "@/services/firebase";
import {Button, Container, Icon, Message} from "semantic-ui-react";
import DefaultLayoutPage from "@/layouts/default-layout/default-layout-page";
import Link from "next/link";

initFirebase();
const Catalog = ({ shop}: any) => {
    return (<>
        <DefaultLayoutPage>
            <Container>
                <h1 className={'page-title'}>Категории</h1>
                <div className="main-page-catalog__list-wrapper">
                    {!shop.catalogLoaded &&
                    <Message icon>
                        <Icon name='circle notched' loading/>
                        <Message.Content>
                            <Message.Header>Загрузка каталога</Message.Header>
                            Пожалуйста подождите пока обработается запрос
                        </Message.Content>
                    </Message>}
                    {(shop.catalogLoaded && !shop.catalog.length) && <div>
                        <Message icon>
                            <Icon name='inbox'/>
                            <Message.Content>
                                <Message.Header>Пусто</Message.Header>
                                <p>Каталог пуст.</p>
                            </Message.Content>
                        </Message>
                    </div>}

                    <div className="main-page-catalog__list d-flex align-items-center flex-wrap">
                        {shop.catalog && shop.catalog.map((item: any, i: number) => {
                            return (
                                <Link key={i} href={'/catalog/' + item.id}>
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
                        })}
                    </div>
                </div>
            </Container>
        </DefaultLayoutPage>
    </>)
}

interface IProps {
    shop: any;
    user: {
        userRole: string[],
        authLoading: any[]
    };
}

const mapStateToProps = ({shop, user}: IProps) => ({
    role: user.userRole,
    authLoading: user.authLoading,
    shop
});

export default connect(mapStateToProps, null)(Catalog);

