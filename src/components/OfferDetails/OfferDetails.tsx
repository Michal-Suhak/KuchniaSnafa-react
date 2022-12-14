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
            <p>{title}</p>
            <p>{description}</p>
            <p>{price}</p>
            <p>{calories}</p>
            <p>{photoUrl}</p>
        </>
    )
}

export default OfferDetails