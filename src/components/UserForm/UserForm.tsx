import { Formik } from "formik";
import * as Yup from "yup";

import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";

import { deleteUser, getUser, postUser } from "../../APICalls";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../types/UserType";
import React from "react";

interface UserFormProps {
  formType: "edit" | "register";
  initialValues: UserType;
}

const UserForm: React.FC<UserFormProps> = ({ formType, initialValues }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    deleteUser(initialValues);
    navigate("/");
  };

  return (
    <div className="formWrapper">
      <h1>
        {formType === "edit"
          ? "Edytuj swoje dane"
          : formType === "register"
          ? "Zarejestruj się"
          : ""}
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) =>
          formType === "edit"
            ? getUser(values, dispatch)
            : formType === "register"
            ? postUser(values, navigate)
            : undefined
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
              <button type="submit" disabled={!(dirty && isValid)}>
                {formType === "edit"
                  ? "Zapisz zmiany"
                  : formType === "register"
                  ? "Zarejestruj"
                  : ""}
              </button>
              {formType === "edit" ? (
                <button
                  type="button"
                  style={{ backgroundColor: "red" }}
                  onClick={() => handleDelete()}
                >
                  Usuń Konto
                </button>
              ) : null}
            </>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
