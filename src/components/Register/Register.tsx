import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserType } from '../../types/UserType';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useNavigate } from 'react-router-dom';
import ValidationComponent from '../../Validators/ValidationComponent';


const Register = () => {
    const [user, setUser] = useState<UserType>({
        email: '',
        password: '',
        city: '',
        street: '',
        houseNumber: 0,
        postCode: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const postUser = (user: UserType) => {
        axios.post("http://localhost:4000/users", {
            email: user.email,
            password: user.password,
            city: user.city,
            street: user.street,
            houseNumber: user.houseNumber,
            postCode: user.postCode
        })
        .then((response) => {
            setUser(response.data)
        })
        .catch(error => {
            console.error("Error fetchnig: ", error);
            setError(error);
        })
    }
    
    const handleInput = (value: string, name: string) => {

        setUser((prevUser) => ({
            ...prevUser, [name]: value
        }))
    }
    const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        handleInput(event.currentTarget.value, event.currentTarget.name)
    }

    return(
        <>
        <form method="POST">
            <label>Email</label>
            <input name="email" type="text" placeholder="email" onChange={handleOnChange}/>
            <label>Password: </label>
            { <input name="password" type="password" placeholder="Password" onChange={handleOnChange}/> }
            <label>City</label>
            { <input name="city" type="text" placeholder="City" onChange={handleOnChange}/> }
            <label>Street</label>
            { <input name="street" type="text" placeholder="Street" onChange={handleOnChange}/> }
            <label>House Number</label>
            { <input name="houseNumber" type="number" placeholder="House Number" onChange={handleOnChange}/> }
            <label>Post Code</label>
            { <input name="postCode" type="text" placeholder="Post Code" onChange={handleOnChange}/> }
        </form>
        <ValidationComponent {...{user}} onClickFn={postUser}/>
        <Outlet/>
        <ToastContainer/>
        </>
    )
}

export default Register;