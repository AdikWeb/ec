import PanelLayout from "@/layouts/panel-layout";
import {useRouter} from "next/router";
import {
    Button,
    Card,
    Container,
    Dimmer,
    Dropdown,
    Form,
    Icon,
    Image,
    Loader,
    Message,
    Modal,
    Segment
} from "semantic-ui-react";
import {FormEvent, MutableRefObject, useEffect, useRef, useState} from "react";
import {addProduct, getProducts, getProductsAll, updateProduct} from "@/api/shop/products.api";
import {connect} from "react-redux";
import AdminProductCard from "@/components/shop/admin-product-card";
import {uploadFile} from "@/api/file/file.api";

interface ProductCardData {
    id: string;
    title: string;
    image: string | null;
    description: string;
    price: string;
    count: string;
    category: string | number | boolean | (string | number | boolean)[] | undefined;
}

const initialCardState = {
    id: '',
    title: '',
    image: '',
    description: '',
    category: '',
    price: '',
    count: '0',
}

const ProductsGrid = ({shop}: any) => {
    const Router = useRouter()
    const idCatalogFromRouter = Router.query.idCatalog || undefined;

    const [editProductData, setEditProductData] = useState<ProductCardData>(initialCardState);
    const [editDocumentId, setEditDocumentId] = useState<string>('');
    const [editModal, setEditModal] = useState<boolean>(false);
    const [modalAlert, setModalAlert] = useState<string | null>(null);
    const [changeState, setChangeState] = useState<boolean>(false);
    const [newImageLoad, setNewImageLoad] = useState<boolean>(false);
    const catalogImage = useRef() as MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        if (idCatalogFromRouter) getProducts(idCatalogFromRouter).then();
        else getProducts().then()
    }, [idCatalogFromRouter]);

    const closeModal = () => {
        setEditDocumentId('');
        setEditProductData(initialCardState)
        setEditModal(false)
    }

    const editHandle = <K extends keyof ProductCardData>(key: K, value: ProductCardData[K]) => {
        let data: ProductCardData = {...editProductData};
        data[key] = value;
        setEditProductData(data);
    }

    const changeImage = async (e: any) => {
        setNewImageLoad(true);
        await uploadFile('products', catalogImage.current.files).then((res) => {
            editHandle('image', res.link);
        })
        setNewImageLoad(false)
    }

    const updateProductHandle = async () => {
        setModalAlert(null);
        setChangeState(true);
        if (editDocumentId) {
            await updateProduct(editDocumentId, editProductData, idCatalogFromRouter).then((res) => setModalAlert(res))
        }
        setChangeState(false)
    }

    const addProductHandle = async (idCatalog: string | string[] | undefined) => {
        await addProduct(editProductData, idCatalog);
        closeModal()
    }

    return (
        <>
            <PanelLayout>
                <Container>
                    <div className="d-flex align-items-center mb-5">
                        <h2 className={'mb-0'}>Товары</h2>
                        <Button color={'blue'} className={'ml-3'} onClick={() => setEditModal(true)}>
                            <Icon name={'add'}/>
                            Добавить товар
                        </Button>
                    </div>
                    {!shop.productsLoaded &&
                    <Message icon>
                        <Icon name='circle notched' loading/>
                        <Message.Content>
                            <Message.Header>Загрузка товаров</Message.Header>
                            Пожалуйста подождите пока обработается запрос
                        </Message.Content>
                    </Message>}

                    {(shop.productsLoaded && !shop.products.length) && <div>
                        <Message icon>
                            <Icon name='inbox'/>
                            <Message.Content>
                                <Message.Header>Пусто</Message.Header>
                                <p>Каталог пуст.</p>
                            </Message.Content>
                        </Message>
                    </div>}
                    <div className="products-card__grid">
                        {shop.products.map((item: { id: string, title: string, image: string, description: string, price: string }, i: number) => {
                            return (
                                <AdminProductCard
                                    idCatalog={idCatalogFromRouter}
                                    key={i}
                                    id={item.id}
                                    price={item.price}
                                    title={item.title}
                                    image={item.image}
                                    description={item.description}
                                    editProduct={(e: ProductCardData, id: string) => {
                                        setEditDocumentId(id);
                                        setEditProductData(e);
                                        setEditModal(true);
                                    }}
                                />
                            );
                        })}
                    </div>
                </Container>
                <Modal
                    size={'mini'}
                    open={editModal}
                    onClose={() => closeModal()}
                >
                    <Modal.Header>{editProductData?.title}</Modal.Header>
                    <Modal.Content>
                        {modalAlert &&
                        <Message color={'green'}>
                            <Message.Content>
                                {modalAlert}
                            </Message.Content>
                        </Message>}
                        <Dimmer.Dimmable as={Segment} dimmed={newImageLoad}>
                            <Dimmer active={newImageLoad} inverted>
                                <Loader>Loading</Loader>
                            </Dimmer>
                            <Image style={{minHeight: 150}} src={editProductData?.image} fluid/>
                        </Dimmer.Dimmable>
                        <Form className={'mt-4'}>
                            <Form.Field>
                                <label>Цена товара</label>
                                <input required={true} placeholder='Price'
                                       onInput={(e: FormEvent<HTMLInputElement>) => editHandle('price', e.currentTarget.value)}
                                       value={editProductData?.price}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Количество</label>
                                <input required={true} placeholder='Price'
                                       onInput={(e: FormEvent<HTMLInputElement>) => editHandle('count', e.currentTarget.value)}
                                       value={editProductData?.count}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Название каталога</label>
                                <input required={true} placeholder='Name'
                                       onInput={(e: FormEvent<HTMLInputElement>) => editHandle('title', e.currentTarget.value)}
                                       value={editProductData?.title}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Категория</label>
                                <Dropdown onChange={(e, data)=>editHandle('category', data.value)} selection options={shop.catalog.map((item:any)=>{
                                    return{
                                        key: item.id,
                                        text: item.title,
                                        value: item.id
                                    }
                                })} />
                            </Form.Field>
                            <Form.Field>
                                <label>Изображение</label>
                                <input ref={catalogImage} type={'file'} onChange={e => changeImage(e)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Описание</label>
                                <textarea value={editProductData?.description} rows={6}
                                          onInput={(e) => editHandle('description', e.currentTarget?.value)}/>
                            </Form.Field>
                            <Button negative onClick={() => closeModal()}>
                                Отменить
                            </Button>
                            {editDocumentId &&
                            <Button loading={changeState} positive onClick={() => updateProductHandle()}>
                                Сохранить
                            </Button>}
                            {!editDocumentId && <Button loading={changeState} positive onClick={async () => addProductHandle(idCatalogFromRouter)}>Добавить</Button>}
                        </Form>
                    </Modal.Content>
                </Modal>
            </PanelLayout>
        </>
    )
}

interface IProps {
    user: any,
    shop: any,
}

const mapStateToProps = ({shop}: IProps) => ({
    shop
});

export default connect(mapStateToProps, null)(ProductsGrid);