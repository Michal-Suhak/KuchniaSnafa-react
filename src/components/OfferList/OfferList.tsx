import React, { useEffect, useState } from "react";
import { OfferType } from "../../types/OfferType";
import axios from "axios";
import Offer from "../Offer/Offer";
import "./styles.css";

type OfferListProps = {
  setDetails: React.Dispatch<React.SetStateAction<OfferType | undefined>>;
};

const OfferList: React.FC<OfferListProps> = ({ setDetails }) => {
  const [data, setData] = useState<OfferType[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

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

  const handleChange = (e: { target: { value: string } }) => {
    setQuery(e.target.value);
  };

  return (
    <div className="wrapper">
      <h1>Lista dostępnych cateringów</h1>
      <input
        className="filter"
        type="text"
        placeholder="Wyszukaj catering"
        onChange={handleChange}
      />
      <div className="offersWrapper">
        {data?.map((data) => {
          if (
            query == "" ||
            data.title.toLowerCase().includes(query.toLowerCase())
          ) {
            return <Offer key={data.id} {...data} {...{ setDetails }} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default OfferList;
