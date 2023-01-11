import "react-toastify/dist/ReactToastify.css";
import UserForm from "../UserForm/UserForm";

const Register = () => {
  return (
    <UserForm formType="register" initialValues={{
      email: "",
      password: "",
      city: "",
      street: "",
      houseNumber: 0,
      postCode: "",
    }}/>
  );
};

export default Register;
