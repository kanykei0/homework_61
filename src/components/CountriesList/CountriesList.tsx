import React from "react";
import { CountryConf } from "../../type";

interface Props {
  countries: CountryConf[];
  onSelectCountry: (alpha3Code: string) => void;
}

const CountriesList: React.FC<Props> = React.memo(
  ({ countries, onSelectCountry }) => {
    const countryClick = (alpha3Code: string) => {
      onSelectCountry(alpha3Code);
    };

    return (
      <ul>
        <div>
          <b>Countries List:</b>
        </div>
        {countries.map((country, index) => (
          <button
            className="d-block country-btn"
            key={index}
            onClick={() => countryClick(country.alpha3Code)}
          >
            {country.name}
          </button>
        ))}
      </ul>
    );
  }
);

export default CountriesList;
