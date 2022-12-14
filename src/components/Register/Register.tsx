import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserType } from '../../types/UserType';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useNavigate } from 'react-router-dom';

type LoginType = {
    login: string;
    password: string;
}

const Register = () => {
    const [data, setData] = useState<UserType[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const postUser = (email: string, password: string, city: string, street: string, houseNumber: number, postCode: string) => {
        axios.post("http://localhost:4000/users", {
            email: email,
            password: password,
            city: city,
            street: street,
            houseNumber: houseNumber,
            postCode: postCode
        })
        .then((response) => {
            setData(response.data)
        })
        .catch(error => {
            console.error("Error fetchnig: ", error);
            setError(error);
        })
    }

    // const handleRegister = (email: string, password: string, city: string, street: string, houseNumber: number, postCode: string) => {
    //     postUser(email, password, city, street, houseNumber, postCode);
    //     if (!error) {
    //         navigate("/login")
    //         toast.success('Zarejestrowano porawnie', {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //             });
    //     } 
    //     else {
    //         toast.error('Błąd rejestracji', {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //             });
    //     }
    // }

    const handleEmail = (event: React.FormEvent<HTMLInputElement>) => {
        const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

        const isValid = event.currentTarget.value.match(regex) ? true: false;

        console.log(isValid);
    }

    return(
        <>
        <form method="POST">
            <label>Email</label>
            <input name="login" type="text" placeholder="Login" onChange={handleEmail}/>
            <label>Password: </label>
            {/* <input name="password" type="password" placeholder="Password" onChange={handlePassword}/> */}
            <label>City</label>
            {/* <input name="city" type="text" placeholder="City" onChange={handleInput}/> */}
            <label>Street</label>
            {/* <input name="street" type="text" placeholder="Street" onChange={handleInput}/> */}
            <label>House Number</label>
            {/* <input name="houseNumber" type="text" placeholder="House Number" onChange={handleInput}/> */}
            <label>Post Code</label>
            {/* <input name="postCode" type="text" placeholder="Post Code" onChange={handlePostCode}/> */}
            <input type="submit" value="Zaloguj" />
        </form>
        <Outlet/>
        <ToastContainer/>
        </>
    )
}

export default Register;