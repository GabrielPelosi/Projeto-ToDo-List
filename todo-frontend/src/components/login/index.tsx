import React, { useState } from 'react'
import NavBar from '../navbar'
import './index.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import history from '../../utils/historyConfig'
import {BASE_URL} from '../../utils/requests'
import  { Redirect } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert';



type AuthRequest = {
    email: string;
    password: string;
}

type AuthResponse = {
    jwtToken: string;
}

const LoginPage = () => {

    const [successState, setSuccessState] = useState<Boolean>(false);

    const [errorState, setErrorState] = useState<Boolean>(false);


    const [userState, setUserState] = useState<AuthRequest>({
        email: "",
        password: ""
    });

    const onChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setUserState({...userState, [event.target.name]: event.target.value });
    }   

    const onSubmit =  (event:any) => {
        event.preventDefault();
        axios.post(`${BASE_URL}/auth/login`,userState)
        .then(resp => {
            const dataResp = resp.data as AuthResponse;
            localStorage.setItem('jwt-token',`Bearer ${dataResp.jwtToken}`)
            if(resp.status === 200){
                setSuccessState(true)
            }
        }).catch(err => {
            setErrorState(true)
        });
    }

    return (
        <>
        {
            successState ?  <Redirect to = {{ pathname: "/tasks" }} /> : <div></div>
        }
        {
            errorState ?  <Alert severity="error">Credenciais inválidas!!</Alert> : <div></div>
        }
            <NavBar />
            <form onSubmit={onSubmit}>
                <h3>Login</h3>
                <div className="form-group">
                    <label>Email</label>
                    <input onChange={onChange} id="email" name="email" type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input onChange={onChange} id="password" name="password" type="password" className="form-control" placeholder="Enter password" />
                </div>
                
                <button type="submit" className="btn btn-primary btn-block m-2">Submit</button>
                <p className="forgot-password text-right">
                    <Link className="navbar-brand" to={"/forgot-pass"}>Forgot password?</Link>

                </p>
            </form>
        </>
    )
}

export default LoginPage
