import React, { useEffect, useState } from "react";
import { OfferType } from "../../types/OfferType";
import Offer from "../Offer/Offer";
import "./styles.css";
import { getData } from "../../APICalls";

type OfferListProps = {
  setDetails: React.Dispatch<React.SetStateAction<OfferType | undefined>>;
};

const OfferList: React.FC<OfferListProps> = ({ setDetails }) => {
  const [data, setData] = useState<OfferType[]>();
  const [query, setQuery] = useState("");

  useEffect(() => {
    getData("offers", setData);
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
        {data?.map((element) => {
          if (
            query == "" ||
            element?.title?.toLowerCase().includes(query.toLowerCase())
          ) {
            return <Offer key={element.id} {...element} {...{ setDetails }} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default OfferList;
