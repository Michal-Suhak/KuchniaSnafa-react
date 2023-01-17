import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppDispatch } from "./Redux/store";
import { setLoggedUser, UserState } from "./Redux/userSlice";
import { OfferType } from "./types/OfferType";
import { UserType } from "./types/UserType";

export const deleteUser = (userData: UserType) => {
  axios
    .delete("http://localhost:3000/users/" + userData.id)
    .then(() => {
      toast.info("Pomyślnie usunięto użytkownika", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
    .catch(() => {
      toast.error("Ten użytkownik już nie istnieje", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
};

type GetDataSetStateType =
  | React.Dispatch<React.SetStateAction<UserType[] | undefined>>
  | React.Dispatch<React.SetStateAction<OfferType[] | undefined>>;

export const getData = (
  recource: string,
  setData: GetDataSetStateType
): Promise<any> => {
  return axios("http://localhost:3000/" + recource).then((response) => {
    setData(response.data);
  });
};

export const updateUser = (values: UserType, dispatch: AppDispatch) => {
  axios
    .patch("http://localhost:3000/users/" + values.id, {
      email: values.email,
      password: values.password,
      city: values.city,
      street: values.street,
      houseNumber: values.houseNumber,
      postCode: values.postCode,
    })
    .then((response) => {
      toast.info("Pomyślnie zapisano zmiany", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(setLoggedUser(response.data));
    })
    .catch((error) => {
      toast.error("Wystąpił błąd, spróbuj ponownie później", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
};

export const postUser = (
  values: {
    email: string;
    password: string;
    city: string;
    street: string;
    houseNumber: number;
    postCode: string;
  },
  navigate: unknown
) => {
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
    });
};

export const postOrder = (
  user: UserState,
  totalPrice: number,
  validCode: boolean,
  navigate: unknown
) => {

  axios
    .post("http://localhost:3000/orders/", {
      userId: user.userData.id,
      order: user.offers,
      totalPrice: validCode ? totalPrice * 0.8 : totalPrice,
    })
    .then((response) => {
      toast.success("Zamówiono pomyślnie", {
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
    });
};

export const getCodes = (
  code: string,
  setValidCode: (value: React.SetStateAction<boolean>) => void
) => {
  axios("http://localhost:3000/codes").then((response) => {
    if (response.data.includes(code)) {
      setValidCode(true);
    }
  });
};
