import React from 'react'
import NavBar from '../navbar'
import './index.css'
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <>
    
                        <NavBar />
                        <form>
                            <h3>Login</h3>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>
                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            <p className="forgot-password text-right">
                                <Link className="navbar-brand" to={"/forgot-pass"}>Forgot password?</Link>

                            </p>
                        </form>
        </>
    )
}

export default LoginPage
