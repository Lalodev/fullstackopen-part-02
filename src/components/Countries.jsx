import axios from "axios";
import { useEffect, useState } from "react";
import { Country } from "./Country";

export const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [selects, setSelects] = useState([]);

  const handleChangeInput = (event) => {
    const country = event.target.value;

    setCountry(country);

    const countryList = country
      ? countries.filter((countryName) =>
          countryName.toLowerCase().includes(country.toLowerCase())
        )
      : [];

    setSelects(countryList);
  };

  const selectCountry = (countryName) => {
    setSelects([countryName]);
  };

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        const countryNames = response.data.map(
          (country) => country.name.common
        );

        setCountries(countryNames);
      });
  }, []);

  return (
    <div>
      <h2>Countries</h2>
      find countries <input value={country} onChange={handleChangeInput} />
      {selects?.length > 9 ? (
        <p>"Too many matches, specify another filter"</p>
      ) : selects?.length === 1 ? (
        <Country selects={selects} />
      ) : (
        <ul>
          {selects?.map((country) => (
            <li key={country}>
              {country}
              <button onClick={() => selectCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
