import React from "react";
import { OfferType } from "../../types/OfferType";
import { Outlet, useNavigate} from "react-router-dom";

type OfferProps = {
    setDetails: React.Dispatch<React.SetStateAction<OfferType | undefined>>;
}

const Offer:React.FC<OfferType & OfferProps> = ({id, title, description, price, calories, photoUrl, setDetails}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        setDetails({id, title, description, price, calories, photoUrl});
        navigate(title);
    }

    return (
        <>
        <div>
            <p> ID - {id} </p>
            <p> title - {title} </p>
            <p> description - {description} </p>
            <p> price - {price} </p>
            <p> calories - {calories} </p>
            <img src={photoUrl} alt="Zdjecie :D " onClick={handleClick}/>
        </div>
        <Outlet/>
        </>
    )
}
export default Offer