import React from 'react'
import NavBar from '../navbar'

const ForgotPass = () => {
    return (
        <>
            <NavBar />
            <form>
                <div className="form-group">
                    <label>Enter your email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />

                    <button type="submit" className="btn btn-primary btn-block m-1">

                        Submit
                        </button>
                </div>
            </form>
        </>
    )
}

export default ForgotPass
