import React, { useEffect, useState } from 'react';
import { OfferType } from '../../types/OfferType';
import axios from 'axios';
import Offer from '../Offer/Offer';

type OfferListProps = {
    setDetails: React.Dispatch<React.SetStateAction<OfferType | undefined>>
}

const OfferList:React.FC<OfferListProps> = ({setDetails}) => {
    const [data, setData] = useState<OfferType[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios("http://localhost:4000/offers")
        .then((response) => {
            setData(response.data)
        })
        .catch(error => {
            console.error("Error fetchnig: ", error);
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [])

    return(
        <>
        { data?.map((element: OfferType) => (
          <Offer 
            key={element.id} 
            {...element} 
            {...{setDetails}}
          />
        ))}
        </>
    )
}

export default OfferList;