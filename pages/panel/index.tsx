import {connect} from "react-redux";
import initFirebase from "@/services/firebase";
import {Button, Container, Dimmer, Form, Grid, Icon, Loader, Message, Modal, Segment} from "semantic-ui-react";
import PanelLayout from "@/layouts/panel-layout";
import PanelCatalogCard from "@/components/shop/catalog/panelCatalogCard";
import {FormEvent, MutableRefObject, useRef, useState} from "react";
import {Image} from "semantic-ui-react";
import {addCatalog, updateCatalog} from "@/api/shop/catalog.api";
import {uploadFile} from "api/file/file.api"

initFirebase();
const Panel = ({shop}: any) => {
    interface CatalogCardData {
        title: string;
        icon: string;
    }

    const [editCatalogData, setEditCatalogData] = useState<CatalogCardData>({icon: '', title: ''});
    const [editDocumentId, setEditDocumentId] = useState<string|null>('');
    const [editModal, setEditModal] = useState<boolean>(false);
    const [modalAlert, setModalAlert] = useState<string | null>(null);
    const [changeState, setChangeState] = useState<boolean>(false);
    const [newImageLoad, setNewImageLoad] = useState<boolean>(false);
    const catalogImage = useRef() as MutableRefObject<HTMLInputElement>;

    const updateCatalogHandle = async () => {
        setModalAlert(null);
        setChangeState(true);
        if (editCatalogData.title.length&&editDocumentId)
            await updateCatalog(editDocumentId, editCatalogData).then((res: string) => setModalAlert(res));
        setChangeState(false)
    }

    const addCatalogHandle = async ()=>{
        setChangeState(true)
        if (editCatalogData.title.length&&!editDocumentId)
            await addCatalog(editCatalogData);
        setChangeState(false)
        closeModal();
    }

    const editHandle = <K extends keyof CatalogCardData>(key: K, value: CatalogCardData[K]) => {
        let data: CatalogCardData = {...editCatalogData};
        data[key] = value;
        setEditCatalogData(data);
    }

    const changeImage = async (e: any) => {
        setNewImageLoad(true);
        await uploadFile('catalog', catalogImage.current.files).then((res) => {
            editHandle('icon', res.link);
            updateCatalogHandle();
        })
        setNewImageLoad(false)
    }

    const closeModal = ()=>{
        setModalAlert(null);
        setEditDocumentId(null);
        setEditCatalogData({title:'', icon:''})
        setEditModal(false)
    }

    return (<>
        <PanelLayout>
            <Container>
                <div className="d-flex align-items-center mb-5">
                    <h2 className={'mb-0'}>Каталог</h2>
                    <Button onClick={()=>setEditModal(true)} color={'blue'} size={'tiny'} className={'ml-3'}>
                        <Icon name={'add'}/>
                        Добавить каталог
                    </Button>
                </div>
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
                <div className="catalog-grid minus-margin">
                    {shop.catalog.length !== 0 && shop.catalog.map(({id, title, icon}: any) => (
                        <PanelCatalogCard
                            editData={(data: CatalogCardData, id: string) => {
                                setEditDocumentId(id);
                                setEditCatalogData(data);
                                setEditModal(true);
                            }}
                            key={id}
                            icon={icon}
                            title={title}
                            id={id}
                        />
                    ))}
                </div>
            </Container>
            <Modal
                size={'mini'}
                open={editModal}
                onClose={() => closeModal()}
            >
                <Modal.Header>{editCatalogData?.title}</Modal.Header>
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
                        <Image style={{minHeight: 150}} src={editCatalogData?.icon} fluid/>
                    </Dimmer.Dimmable>
                    <Form className={'mt-4'}>
                        <Form.Field>
                            <label>Название каталога</label>
                            <input required={true} placeholder='Name'
                                   onInput={(e: FormEvent<HTMLInputElement>) => editHandle('title', e.currentTarget.value)}
                                   value={editCatalogData?.title}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Изображение</label>
                            <input ref={catalogImage} type={'file'} onChange={e => changeImage(e)}/>
                        </Form.Field>
                        <Button negative onClick={() => closeModal()}>
                            Отменить
                        </Button>
                        {editDocumentId&&<Button loading={changeState} positive onClick={() => {
                            updateCatalogHandle().then()
                        }}>
                            Сохранить
                        </Button>}
                        {!editDocumentId&&<Button loading={changeState} positive onClick={async () => addCatalogHandle() }>Добавить</Button>}
                    </Form>
                </Modal.Content>

            </Modal>
        </PanelLayout>
    </>)
}

interface IProps {
    user: any,
    shop: any,
}

const mapStateToProps = ({shop}: IProps) => ({
    shop
});
export default connect(mapStateToProps, null)(Panel);