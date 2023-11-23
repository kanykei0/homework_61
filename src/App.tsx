import { useEffect, useState } from "react";
import CountriesList from "./components/CountriesList/CountriesList";
import Country from "./components/Country/Country";
import { CountryConf, CountryInfoConf } from "./type";
import axios from "axios";
import Preloader from "./components/Preloader/Preloader";

const COUNTRIS_ALPHACODE = "https://restcountries.com/v2/alpha/";

function App() {
  const [countries, setCountries] = useState<CountryConf[]>([]);
  const [countryInfo, setCountryInfo] = useState<CountryInfoConf | null>(null);
  const [preloader, setPreloader] = useState(false);

  const getCountriesData = async () => {
    const countriesResponse = await axios.get<CountryConf[]>(
      "https://restcountries.com/v2/all?fields=alpha3Code,name"
    );

    const promises = countriesResponse.data.map(async (country) => {
      return {
        name: country.name,
        alpha3Code: country.alpha3Code,
      };
    });

    const newCountries = await Promise.all(promises);

    setCountries(newCountries);
  };

  const getCountryDetails = async (alpha3Code: string) => {
    setPreloader(true);

    const countryInfoResponse = await axios.get<CountryInfoConf>(
      COUNTRIS_ALPHACODE + alpha3Code
    );

    const data = countryInfoResponse.data;

    const bordersData = await Promise.all(
      data.borders?.map(async (border) => {
        const borderResponse = await axios.get<CountryInfoConf>(
          COUNTRIS_ALPHACODE + border
        );
        return borderResponse.data.name;
      }) || ["no borders"]
    );

    const dataCountry = {
      name: data.name,
      capital: data.capital,
      population: data.population,
      borders: bordersData,
    };

    setCountryInfo(dataCountry);
    setPreloader(false);
  };

  useEffect(() => {
    void getCountriesData();
  }, [getCountriesData]);

  const onSelectCountry = (alpha3Code: string) => {
    void getCountryDetails(alpha3Code);
  };

  return (
    <>
      <Preloader show={preloader} />
      <div className="container row">
        <div className="col countries-list">
          <CountriesList
            countries={countries}
            onSelectCountry={onSelectCountry}
          />
        </div>
        <div className="col">
          <Country countryInfo={countryInfo} />
        </div>
      </div>
    </>
  );
}

export default App;
