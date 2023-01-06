import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../../types/UserType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, redirect, useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../Redux/hooks";

import { setLoggedUser, updateCart } from "../../Redux/userSlice";

type LoginType = {
  login: string;
  password: string;
};

const Login = () => {
  const [data, setData] = useState<UserType[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.userData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios("http://localhost:3000/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetchnig: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogin = (login: string, password: string) => {
    data?.forEach((item) => {
      if (item.password === password && item.email === login) {
        toast.success("Zalogowano pomyślnie", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // sessionStorage.setItem("user", JSON.stringify(item));
        dispatch(setLoggedUser(item));
        navigate("/");
      } else {
        toast.error("Logowanie nie powiodło się", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  return (
    <>
      <form
        method="POST"
        onSubmit={(event: React.SyntheticEvent) => {
          event.preventDefault();
          const target = event.target as typeof event.target & {
            login: { value: string };
            password: { value: string };
          };
          handleLogin(target.login.value, target.password.value);
        }}
      >
        <label>Login</label>
        <input name="login" type="text" placeholder="Login" />
        <label>Password: </label>
        <input name="password" type="password" placeholder="Password" />
        <input type="submit" value="Zaloguj" />
      </form>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default Login;
