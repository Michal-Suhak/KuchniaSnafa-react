import React from "react";
import { OfferType } from "../../types/OfferType";
import { Outlet, useNavigate } from "react-router-dom";

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

  const handleClick = () => {
    setDetails({ id, title, description, price, calories, photoUrl });
    navigate(title);
  };

  return (
    <>
      <div className="offer">
        <img className="offerImage" src={photoUrl} alt="Zdjecie :D " />
        <div className="offerInfo">
          <h1> {title} </h1>
          <div className="buttons">
            <button onClick={handleClick}>Szczegóły</button>
          </div>
        </div>
        {/* <p> ID - {id} </p> */}
        {/* <p> description - {description} </p>
            <p> price - {price} </p>
            <p> calories - {calories} </p> */}
      </div>
      <Outlet />
    </>
  );
};
export default Offer;
