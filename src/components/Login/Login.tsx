import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../../types/UserType";
import { ToastContainer, toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { setLoggedUser } from "../../Redux/userSlice";
import "react-toastify/dist/ReactToastify.css";

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
    <div className="formWrapper">
      <h1>Zaloguj się</h1>
      <form
        className="form"
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
        <input name="login" type="text" placeholder="Adres e-mail" />
        <input name="password" type="password" placeholder="Hasło" />
        <button>Zaloguj</button>
      </form>
      <a style={{ cursor: "pointer" }} onClick={() => navigate("/register")}>
        Nie masz jeszcze konta?
      </a>
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Login;
