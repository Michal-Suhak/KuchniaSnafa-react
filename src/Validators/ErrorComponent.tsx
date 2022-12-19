import React from "react";

interface ErrorProps {
    email: boolean,
    password: boolean,
    allValid: boolean,
    postCode: boolean,
}

const ErrorComponent: React.FC<ErrorProps> = ({
    email,
    password,
    allValid,
    postCode
}) => {
  return (
    <div>
      <p style={{ color: "red" }}>
        {email
          ? "Email jest nieprawidłowy": ""}
      </p>
      <p style={{ color: "red" }}>
        {password
          ? "Hasło musi zawierać minimum 4 znaki"
          : ""}
      </p>
      <p style={{ color: "red" }}>
        {allValid
          ? "Wszystkie pola muszą być uzupełnione": ""}
      </p>
      <p style={{ color: "red" }}>
        {postCode
          ? "Nieprawidlowy kod pocztowy": ""}
      </p>
    </div>
  );
};

export default ErrorComponent;
