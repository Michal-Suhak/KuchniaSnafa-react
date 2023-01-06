import React from "react";
import { OfferType } from "../../types/OfferType";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setLoggedUser, updateCart } from "../../Redux/userSlice";

type OfferProps = {
  setDetails: React.Dispatch<React.SetStateAction<OfferType | undefined>>;
};

const Offer: React.FC<OfferType & OfferProps> = ({
  id,
  title,
  description,
  price,
  calories,
  photoUrl,
  setDetails,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userData);
  const handleClick = () => {
    setDetails({ id, title, description, price, calories, photoUrl });
    navigate(title);
  };
  const handleAdd = () => {
    dispatch(updateCart({ id, title, description, price, calories, photoUrl }));
  };

  return (
    <>
      <div className="offer">
        <img className="offerImage" src={photoUrl} alt="Zdjecie :D " />
        <div className="offerInfo">
          <h1> {title} </h1>
          <div className="buttons">
            <button onClick={() => (user.id ? handleAdd() : navigate("login"))}>
              Dodaj do koszyka
            </button>
            <button onClick={handleClick}>Szczegóły</button>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default Offer;
