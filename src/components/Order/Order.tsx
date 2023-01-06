import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../../Redux/hooks";

const Order = () => {
  const [validCode, setValidCode] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  const totalPrice = user.offers.reduce(
    (price, offer) => price + offer.price,
    0
  );

  const postOrder = () => {
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

  const checkCode = (code: string) => {
    axios("http://localhost:3000/codes").then((response) => {
      if (response.data.includes(code)) {
        setValidCode(true);
      }
    });
  };

  return (
    <>
      {user.offers.map((offer) => (
        <p key={offer.id}>{offer.title}</p>
      ))}
      <p>{validCode ? totalPrice * 0.8 : totalPrice}</p>
      <button type="button" onClick={() => postOrder()}>
        Zamów
      </button>
      <input
        type="text"
        placeholder="Kod promocyjny"
        onChange={(event) => setCodeValue(event.target.value)}
      />
      <button type="button" onClick={() => checkCode(codeValue)}>
        Zaaplikuj koda kurde ten
      </button>
    </>
  );
};

export default Order;
