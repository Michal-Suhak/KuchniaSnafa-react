import React from "react";
import { OfferType } from "../../types/OfferType";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";

const OfferDetails: React.FC<OfferType> = ({
  description,
  price,
  calories,
  photoUrl,
}) => {
  const {title} = useParams();
  const navigate = useNavigate();
  return (
    <>
      <div className="detailWrapper">
        <div className="itemWrapper">
          <button style={{ margin: "2em 0" }} onClick={() => navigate("/")}> {"<"} Powrót</button>
          <div className="details">
            <div>
              <img
                src={photoUrl}
                alt="offerPhoto"
                width="600px"
                height="400px"
              />
            </div>
            <div className="info">
              <h2>Dieta: {title}</h2>
              <h3>Opis</h3>
              <p>{description}</p>
              <h3>Kaloryczność</h3>
              <p>{calories}</p>
              <h3>Cena\dzień</h3>
              <p>{price} PLN</p>
              <h3>Cena\miesiąc</h3>
              <p>{price * 31} PLN</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferDetails;
