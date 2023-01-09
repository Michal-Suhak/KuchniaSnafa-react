import React, { useEffect, useState } from "react";
import { UserType } from "../../types/UserType";
import { ToastContainer, toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { setLoggedUser } from "../../Redux/userSlice";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "../../APICalls";


const Login = () => {
  const [data, setData] = useState<UserType[]>();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.userData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUser(setData);
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
