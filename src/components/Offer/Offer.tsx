import React from "react";
import { OfferType } from "../../types/OfferType";

const Offer:React.FC<OfferType> = ({id, title, description, price, calories, photoUrl}) => {
    return (
        <div>
            <p> ID - {id} </p>
            <p> title - {title} </p>
            <p> description - {description} </p>
            <p> price - {price} </p>
            <p> calories - {calories} </p>
            <img src={photoUrl} alt="Zdjecie :D " />
        </div>
    )
}
export default Offer