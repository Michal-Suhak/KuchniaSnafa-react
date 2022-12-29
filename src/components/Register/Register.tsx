import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

import { UserType } from "../../types/UserType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import ValidationComponent from "../../Validators/ValidationComponent";

const Register = () => {
  const [user, setUser] = useState<UserType>({
    email: "",
    password: "",
    city: "",
    street: "",
    houseNumber: 0,
    postCode: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // const postUser = (user: UserType) => {
  //   axios
  //     .post("http://localhost:4000/users", {
  //       email: user.email,
  //       password: user.password,
  //       city: user.city,
  //       street: user.street,
  //       houseNumber: user.houseNumber,
  //       postCode: user.postCode,
  //     })
  //     .then((response) => {
  //       setUser(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetchnig: ", error);
  //       setError(error);
  //     });
  // };

  // const handleInput = (value: string, name: string) => {
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     [name]: name === "houseNumber" ? Number(value) : value,
  //   }));
  // };
  // const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
  //   handleInput(event.currentTarget.value, event.currentTarget.name);
  // };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        city: "",
        street: "",
        houseNumber: 0,
        postCode: "",
      }}
      onSubmit={async (values) =>
        axios
          .post("http://localhost:3000/users", {
            email: values.email,
            password: values.password,
            city: values.city,
            street: values.street,
            houseNumber: values.houseNumber,
            postCode: values.postCode,
          })
          .then((response) => {
            toast.success("Zarejestrowano pomyślnie", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            response.status === 200 && navigate("/");
          })
          .catch((error) => {
            console.error("Error fetchnig: ", error);
            setError(error);
          })
      }
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Wpisany e-mail jest nie poprawny")
          .required("Email jest wymagany"),
        password: Yup.string()
          .min(4, "Minimalna długość hasła to 4")
          .required("Hasło jest wymagane"),
        city: Yup.string().required("Miasto jest wymagane"),
        street: Yup.string().required("Ulica jest wymagana"),
        houseNumber: Yup.string().required("Numer domu jest wymagany"),
        postCode: Yup.string()
          .length(6)
          .matches(
            /^[0-9]{2}-[0-9]{3}$/,
            "Kod pocztowy powinien mieć formę 12-345"
          )
          .required("Kod pocztowy jest wymagany"),
      })}
    >
      {({
        values,
        errors,
        dirty,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            name="email"
            type="text"
            placeholder="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email}
          <label>Password: </label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label>City</label>
          <input
            name="city"
            type="text"
            placeholder="City"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label>Street</label>
          <input
            name="street"
            type="text"
            placeholder="Street"
            value={values.street}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label>House Number</label>
          <input
            name="houseNumber"
            type="number"
            placeholder="House Number"
            value={values.houseNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label>Post Code</label>
          <input
            name="postCode"
            type="text"
            placeholder="Post Code"
            value={values.postCode}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.postCode}
          <button type="submit" disabled={!(dirty && isValid)}>
            Zarejestruj
          </button>
        </form>
      )}
    </Formik>

    // <>
    //   <form method="POST">
    //     <label>Email</label>
    //     <input
    //       name="email"
    //       type="text"
    //       placeholder="email"
    //       onChange={handleOnChange}
    //     />
    //     <label>Password: </label>
    //     {
    //       <input
    //         name="password"
    //         type="password"
    //         placeholder="Password"
    //         onChange={handleOnChange}
    //       />
    //     }
    //     <label>City</label>
    //     {
    //       <input
    //         name="city"
    //         type="text"
    //         placeholder="City"
    //         onChange={handleOnChange}
    //       />
    //     }
    //     <label>Street</label>
    //     {
    //       <input
    //         name="street"
    //         type="text"
    //         placeholder="Street"
    //         onChange={handleOnChange}
    //       />
    //     }
    //     <label>House Number</label>
    //     {
    //       <input
    //         name="houseNumber"
    //         type="number"
    //         placeholder="House Number"
    //         onChange={handleOnChange}
    //       />
    //     }
    //     <label>Post Code</label>
    //     {
    //       <input
    //         name="postCode"
    //         type="text"
    //         placeholder="Post Code"
    //         onChange={handleOnChange}
    //       />
    //     }
    //   </form>
    //   <ValidationComponent {...{ user }} onClickFn={postUser} />
    //   <Outlet />
    //   <ToastContainer />
    // </>
  );
};

export default Register;
