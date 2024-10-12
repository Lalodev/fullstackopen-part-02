import axios from "axios";
import { useEffect, useState } from "react";

export const Country = ({ selects }) => {
  const [countryDetails, setCountryDetails] = useState([]);
  const [weather, setWeather] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${selects}`)
      .then((response) => {
        setCountryDetails(response.data);
      });
  }, [selects]);

  useEffect(() => {
    if (countryDetails?.capitalInfo?.latlng) {
      const lat = countryDetails.capitalInfo.latlng[0];
      const lng = countryDetails.capitalInfo.latlng[1];
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

      axios.get(url).then((response) => {
        setWeather(response.data);
      });
    }
  }, [countryDetails]);

  const languages = countryDetails?.languages
    ? Object.values(countryDetails?.languages)
    : [];

  return (
    <div>
      <h3>{countryDetails?.name?.common}</h3>
      <p>
        {countryDetails?.capital}
        <br />
        {countryDetails?.area}
      </p>
      <h4>Languages:</h4>
      <ul>
        {languages?.map((language, i) => (
          <li className="list-disc" key={i}>
            {language}
          </li>
        ))}
      </ul>
      <img
        className="image"
        src={countryDetails?.flags?.svg}
        alt={countryDetails?.flags?.alt}
      />

      <h3>Weather in {countryDetails?.capital}</h3>
      <p>{`temperature ${weather?.main?.temp} celcius`}</p>
      {weather?.weather && (
        <>
          <img
            src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
            alt="Weather icon"
          />
          <p>
            {weather?.weather[0]?.description}{" "}
            {`- wind ${weather?.wind?.speed} m/s`}
          </p>
        </>
      )}
    </div>
  );
};
