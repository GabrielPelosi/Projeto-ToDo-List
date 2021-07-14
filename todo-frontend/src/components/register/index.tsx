import React from 'react'
import '../login/index.css'
import NavBar from '../navbar'
import { Link } from 'react-router-dom';
import { useState } from "react";
import { BASE_URL } from '../../utils/requests'
import axios from "axios";


type UserState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
const SignUp = () => {



    const [userState, setUserState] = useState<UserState>({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const onChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserState({...userState, [event.target.name]: event.target.value });
        console.log(userState);
    }

    const onSubmit =  () => {
        axios.post(`${BASE_URL}/auth/register`,userState)
        .then(resp => {
            console.log(resp.data)
        });
    }


    return (
        <>
            <NavBar />
            <form onSubmit={onSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input onChange={onChange} id="firstName" name="firstName" type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input onChange={onChange} id="lastName" name="lastName" type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input onChange={onChange} id="email" name="email" type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={onChange} id="password" name="password" type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block m-1">Sign Up</button>
                <p className="forgot-password text-right">
                    <Link className="navbar-brand" to={"/"}>Already registered sign in?</Link>
                </p>
            </form>
        </>
    )
}

export default SignUp
