import React, {ChangeEvent, useEffect, useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {connect} from "react-redux";
import {ADD_USER_API, LOGIN_USER_API} from "@/api/user/user.api";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useRouter} from "next/router";

const LoginForm = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            if(user) router.push('/').then()
        })
    }, [])

    return (
        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' color='teal' textAlign='center'>
                    Войти в свой акаунт
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input required={true} onInput={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder='example@dom.com'   fluid icon='user' iconPosition='left'/>
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            required={true} onInput={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                        <Button color='teal' fluid size='large'
                                onClick={() => LOGIN_USER_API(email, password)}>Войти</Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}
export default connect(null,null)(LoginForm)