import React from "react";
import { CountryInfoConf } from "../../type";

interface Props {
  countryInfo: CountryInfoConf | null;
}

const Country: React.FC<Props> = React.memo(({ countryInfo }) => {
  return (
    (countryInfo && (
      <div className="card mt-5">
        <div className="card-body">
          <h1>{countryInfo.name}</h1>
          <p>
            <b>Capital: </b>
            {countryInfo.capital}
          </p>
          <p>
            <b>Population: </b>
            {countryInfo.population}
          </p>
          <ul>
            Borders with:
            {countryInfo.borders.map((border, index) => (
              <li key={index}>{border}</li>
            ))}
          </ul>
        </div>
      </div>
    )) || <p className="text-secondary">Choose country!</p>
  );
});

export default Country;
