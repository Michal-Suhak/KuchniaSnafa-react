import axios from "axios";
import { toast } from "react-toastify";
import {UserType} from "./types/UserType";

export const deleteUser = (userData: UserType) =>  {
    axios.delete("http://localhost:3000/users/" + userData.id)
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
    }).catch(()=>{
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
    })
}

export const getUser = (setData: React.Dispatch<React.SetStateAction<UserType[] | undefined>>): Promise<any> => {
    return axios("http://localhost:3000/users")
    .then((response) => {
        setData(response.data);
    })
}