import {connect} from "react-redux";
import DefaultLayoutPage from "@/layouts/default-layout/default-layout-page";
import {Button, Container, Form, Message, Step} from "semantic-ui-react";
import {useState} from "react";

interface ProductCardData{
    fio: string;
    milo: string;
    tel: string;
    nalichka: boolean;
}

const Oformit = ()=>{
    const [oformit, setOformit] = useState<boolean>(false);
    const [ofo, setOfo] = useState(false);
    const [step, setStep] = useState(1);
    const [dataa, setDataa] = useState({
        fio: '',
        milo: '',
        tel: '',
        nalichka: false,
    });

    const editHandle = <K extends keyof ProductCardData>(key: K, value: ProductCardData[K]) => {
        let data: ProductCardData = {...dataa};
        data[key] = value;
        setDataa(data);
    }

    return (
        <>
            <DefaultLayoutPage>
                <Container>
                    <h1 className="page-title">Оформить заказ</h1>
                    {!oformit&&<div className="oformit">
                        <Step.Group ordered>
                            <Step completed={step > 1} active={step === 1}>
                                <Step.Content>
                                    <Step.Title>Личные данные</Step.Title>
                                    <Step.Description>Введите личные данные</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step completed={step > 2} active={step === 2}>
                                <Step.Content>
                                    <Step.Title>Способ оплаты</Step.Title>
                                    <Step.Description>Выберите способ оплаты</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step >
                                <Step.Content completed={step > 3} active={step === 3}>
                                    <Step.Title>Подтверждение</Step.Title>
                                </Step.Content>
                            </Step>
                        </Step.Group>
                    </div>}

                    {(step === 1)&&(
                        <div className="step_1 mt-5">
                            <Form>
                                <Form.Field>
                                    <label>ФИО</label>
                                    <input onInput={(e)=>editHandle('fio', e.currentTarget.value)} placeholder='ФИО' />
                                </Form.Field>
                                <Form.Field>
                                    <label>E-mail</label>
                                    <input onInput={(e)=>editHandle('milo', e.currentTarget.value)} placeholder='E-mail' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Телефон</label>
                                    <input onInput={(e)=>editHandle('tel', e.currentTarget.value)} placeholder='Телефон' />
                                </Form.Field>
                                <Button onClick={()=>setStep(2)} color={'green'}>Дальше</Button>
                            </Form>
                        </div>
                    )}
                    {(step === 2)&&(
                        <div className="step_2 mt-5">
                            <Form>
                                <div className="d-flex">
                                    <Form.Field className={'mr-1'}>
                                        <label>Номер карты</label>
                                        <input style={{width:"145px"}} placeholder='Номер карты' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Имя владельца карты</label>
                                        <input style={{width:"145px"}} placeholder='Имя владельца карты' />
                                    </Form.Field>
                                </div>
                                <Form.Field >
                                    <label>Срок действия карты</label>
                                    <div className="d-flex align-items-center">
                                        <input className={'mr-1'} style={{width:"59px"}} placeholder='00' />
                                        <input style={{width:"59px"}} placeholder='00' />
                                    </div>
                                </Form.Field>

                                <Form.Field>
                                    <label>Защитный код карты</label>
                                    <div className="d-flex align-items-center">
                                        <input style={{width:"59px"}} placeholder='Защитный код карты' />
                                    </div>
                                </Form.Field>
                                <div className="d-flex align-items-center">
                                    <Button onClick={()=> {
                                        editHandle('nalichka', false)
                                        setStep(3)
                                    }} color={'green'}>Дальше</Button>
                                    <Button onClick={()=> {
                                        editHandle('nalichka', true)
                                        setStep(3)
                                    }}>Заплатить наличными</Button>
                                </div>
                            </Form>
                        </div>

                    )}
                    {(step === 3)&&(
                        <div className="step_3 mt-5">
                            <div className={'mb-2'}>ФИО:{dataa.fio}</div>
                            <div className={'mb-2'}>Номер телефона:{dataa.milo}</div>
                            <div className={'mb-2'}>E-mail:{dataa.tel}</div>
                            <div className={'mb-2'}>Способ оплаты:{dataa.nalichka?'Наличными':'Картой'}</div>

                            <Button color={'green'} loading={ofo} onClick={()=> {
                                setOfo(true)
                                setTimeout(()=>{
                                    setOfo(false)
                                    setOformit(true)
                                    setStep(4);
                                }, 2000)
                            }}>Оформить</Button>
                        </div>
                    )}
                    {(step === 4)&&(
                        <Message color={'green'}>
                            Спасибо за покупку!
                        </Message>
                    )}
                </Container>
            </DefaultLayoutPage>
        </>
    )
}

const mapStateToProps = ()=>({

});

export default connect(mapStateToProps, null)(Oformit)