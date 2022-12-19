import React, { useEffect, useMemo, useState } from "react";
import ErrorComponent from "./ErrorComponent";
import { UserType } from '../types/UserType';

interface ValidationComponentProps {
  user: UserType;
  onClickFn: (user: UserType) => void;
}

const ValidationComponent: React.FC<ValidationComponentProps> = ({
  user,
  onClickFn,
}) => {
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({
    email: true,
    password: true,
    allValid: true,
    postCode: true,
  });

  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/);
  const postCodeRegex = new RegExp(/^[0-9]{2}-[0-9]{3}$/);

  const error = (errName: string, val: boolean) => {
    setErrors((prevErrors) => {
      let errors = prevErrors;
      errors[errName as keyof typeof errors] = val;
      return errors;
    });
  };

  useEffect(() => {
    let isValid = true;
    if (!user.email.match(regex)) {
        error("email", true);
        isValid = false;
    }
    else
        error("email", false);
    if (user.password.length < 4) {
        error("password", true);
        isValid = false;
    }
    else
        error("password", false);

    if (user.street.toString().length == 0 && user.houseNumber.toString().length == 0 && user.city.toString().length == 0) {
        error("allValid", true);
        isValid = false;
    }
    else
        error("street", false);
    if (!user.postCode.match(postCodeRegex)) {
        error("postCode", true);
        isValid = false;
    }
    else
        error("postcode", false);
    if (isValid) {
        setValidated(true)
    }
    else {
        setValidated(false);
    }
  }, [{ ...user }]);

  return (
    <>
      <button onClick={() => onClickFn(user)} disabled={!validated && true}>
        Register
      </button>
      {!validated && <ErrorComponent {...errors} />}
    </>
  );
};

export default ValidationComponent;