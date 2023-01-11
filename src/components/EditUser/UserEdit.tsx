import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../../Redux/hooks";

import UserForm from "../UserForm/UserForm";


const UserEdit = () => {
  const initialValues = useAppSelector((state) => state.user.userData);

  return (
    <UserForm formType="edit" initialValues={initialValues}/>
  );
};

export default UserEdit;
