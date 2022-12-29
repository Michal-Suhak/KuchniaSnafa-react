import React, { useEffect, useState } from "react";
import { OfferType } from "../../types/OfferType";
import axios from "axios";
import Offer from "../Offer/Offer";
import { ToastContainer } from "react-toastify";

type OfferListProps = {
  setDetails: React.Dispatch<React.SetStateAction<OfferType | undefined>>;
};

const OfferList: React.FC<OfferListProps> = ({ setDetails }) => {
  const [data, setData] = useState<OfferType[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("")

  useEffect(() => {
    axios("http://localhost:3000/offers")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetchnig: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e: { target: { value: string; }; }) => {
    setQuery(e.target.value);
  };

  return (
    <>
    <input type="text" onChange={handleChange} />
         {data?.map((data) => {
             if (query == "" || data.title.toLowerCase().includes(query.toLowerCase())) {
                 return (
                     <li key={data.id}>
                         <p>{data.title}</p>
                         <img src={data.photoUrl} alt="image" />
                     </li>
                 );
             }
             return null;
          })}
    </>
  );
};

export default OfferList;
