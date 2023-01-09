import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setLoggedUser } from "../../Redux/userSlice";

import { deleteUser } from "../../APICalls"
import { useNavigate } from "react-router-dom";


const UserEdit = () => {
  const navigate = useNavigate();
  const initialValues = useAppSelector((state) => state.user.userData);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    deleteUser(initialValues);
    navigate("/");
  }

  return (
    <div className="formWrapper">
      <h1>Edytuj swoje dane</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) =>
          axios
            .patch("http://localhost:3000/users/" + initialValues.id, {
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
          <form className="form" onSubmit={handleSubmit}>
            <>
              <input
                name="email"
                type="text"
                placeholder="Email"
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
                placeholder="Numer Domu"
                className={errors.houseNumber && "error"}
                value={values.houseNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p>{errors.houseNumber}</p>
              <input
                name="postCode"
                type="text"
                placeholder="Kod pocztowy"
                className={errors.postCode && "error"}
                value={values.postCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p>{errors.postCode}</p>
              <button type="submit" disabled={!(dirty && isValid)}>Zapisz zmiany</button>
              <button type="button" style={{backgroundColor: "red"}} onClick={() => handleDelete()}>Usuń Konto</button>
            </>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UserEdit;
