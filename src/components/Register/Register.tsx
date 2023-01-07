import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="formWrapper">
      <h1>Zarejestruj się</h1>
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
          <form className="form" onSubmit={handleSubmit}>
            <input
              name="email"
              type="text"
              placeholder="Adres e-mail"
              className={errors.email && "error"}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p>{errors.email}</p>
            <input
              name="password"
              type="password"
              placeholder="Hasło"
              className={errors.password && "error"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p>{errors.password}</p>
            <input
              name="city"
              type="text"
              placeholder="Miasto"
              className={errors.city && "error"}
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p>{errors.city}</p>
            <input
              name="street"
              type="text"
              placeholder="Ulica"
              className={errors.street && "error"}
              value={values.street}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p>{errors.street}</p>
            <input
              name="houseNumber"
              type="number"
              placeholder="Numer domu"
              className={errors.houseNumber && "error"}
              value={values.houseNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p>{errors.houseNumber}</p>
            <input
              name="postCode"
              type="text"
              placeholder="Kod Pocztowy"
              className={errors.postCode && "error"}
              value={values.postCode}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p>{errors.postCode}</p>
            <button type="submit" disabled={!(dirty && isValid)}>
              Zarejestruj
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
