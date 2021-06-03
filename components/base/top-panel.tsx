import Link from "next/link";
import {Button, Container, Dropdown, Form, Icon,  Message, Modal} from "semantic-ui-react";
import {ChangeEvent, useEffect,  useState} from "react";
import TopNav from "@/components/base/top-nav";
import {connect} from "react-redux";

import {getAuth, onAuthStateChanged} from "firebase/auth";

import initFirebase from "@/services/firebase";
import {ADD_USER_API, LOGIN_USER_API, LOGOUT_USER_API} from "@/api/user/user.api";
import {SHOW_AUTH_MODAL} from "@/redux/user/user.const";
import SearchInput from "@/components/base/search-input";
import {storeDispatch} from "@/redux/store.facade";
import ACard from "@/components/shop/card";

initFirebase();

const TopPanel = ({dispatch, authLoading, openAuthModal, authAlert, shop, role}: any) => {
    const [authCheck, setAuthCheck] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showCard, setShowCard] = useState<boolean>(false);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, () => {
            setAuthCheck(!!auth.currentUser)
        })
    }, [])

    useEffect(() => {
        const LSCard = JSON.parse(localStorage.card);
        storeDispatch('UPDATE_CARD', LSCard);
    }, []);

    useEffect(() => {
        localStorage.setItem('card', JSON.stringify(shop.card))
    }, [shop.card]);

    return (<>
        <div className="top-panel">
            <Container>
                <div className="d-flex align-items-center">
                    <Link href={'/'}>
                        <a className={'logotype'}>
                            <span>Экономь</span>
                            <small>интернет-магазин</small>
                        </a>
                    </Link>
                    <TopNav className={'ml-5'}>
                        <Link href={'/'}>Главная</Link>
                        <Link href={'/catalog'}>Каталог</Link>
                        <Link href={'/about'}>О нас</Link>
                        <Link href={'/contact'}>Контакт</Link>
                    </TopNav>

                    <SearchInput/>

                    <div className="search-card d-flex align-items-center ml-5">
                        {authCheck && <Dropdown text='Личный кабинет' floating className='icon mr-3'>
                            <Dropdown.Menu>
                                <Link href={'/panel'}>
                                    <Dropdown.Item>
                                        <Icon name='settings'/> Панель управления
                                    </Dropdown.Item>
                                </Link>
                                {role.includes('admin') && <Link href={'/cabinet'}>
                                    <Dropdown.Item>
                                        <Icon name='user md'/> Зайти в кабинет
                                    </Dropdown.Item>
                                </Link>}
                                <Dropdown.Item color={'red'} onClick={() => LOGOUT_USER_API()} size={'tiny'}>
                                    <Icon name='log out'/> Выйти
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>}
                        {!authCheck &&
                        <Button className={'no-border'}
                                onClick={() => dispatch({type: SHOW_AUTH_MODAL, payload: true})}>
                            <Icon name='user md'/> Вход
                        </Button>}
                        <div className="cart-position">
                            <Button onClick={()=>setShowCard(!showCard)} color={'green'} icon={'shopping basket'}/>
                            <ACard show={showCard}/>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
        <Container>
        </Container>
        <Modal
            size={'tiny'}
            open={openAuthModal}
            centered={false}
            onClose={() => dispatch({type: SHOW_AUTH_MODAL, payload: false})}
        >
            <Modal.Header>Авторизация</Modal.Header>
            <Modal.Content>
                {authAlert && <Message error>
                    {authAlert}
                </Message>}
                <Form>
                    <Form.Field>
                        <label>E-mail</label>
                        <input required={true} onInput={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                               placeholder='example@dom.com'/>
                    </Form.Field>
                    <Form.Field>
                        <label>Пароль</label>
                        <input required={true}
                               onInput={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                               placeholder='*****' type={'password'}/>
                    </Form.Field>
                    <Button.Group>
                        <Button loading={authLoading} onClick={() => LOGIN_USER_API(email, password)} type='submit'
                                color={'green'}>Войти</Button>
                        <Button.Or/>
                        <Button loading={authLoading} color={"blue"}
                                onClick={() => ADD_USER_API(email, password)}>Зарегистрироваться</Button>
                    </Button.Group>
                </Form>
            </Modal.Content>
        </Modal>
    </>)
}

interface IProps {
    user: any,
    shop: any;
}

const mapStateToProps = ({user, shop}: IProps) => ({
            token: user.authToken,
            authLoading: user.authLoading,
            role: user.userRole,
            openAuthModal: user.openAuthModal,
            authAlert: user.alerts,
            shop
        }
    )
;

export default connect(mapStateToProps, null)(TopPanel);