import React from "react";
import { OfferType } from "../../types/OfferType";


const OfferDetails:React.FC<OfferType> = ({id,
    title,
    description,
    price,
    calories,
    photoUrl}) => {

    return(
        <>
            <p>{id}</p>
            <p>{title.toUpperCase()}</p>
            <p>{description.toUpperCase()}</p>
            <p>{price} PLN/dzień {price * 31} PLN/miesiąc</p>
            <p>{calories}</p>
            <img src={photoUrl}></img>
        </>
    )
}

export default OfferDetails