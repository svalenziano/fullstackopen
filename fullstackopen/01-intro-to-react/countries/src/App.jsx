import { useState, useEffect } from 'react';
import db from "./services/countries.js";
import './App.css';

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    db.getAll().then(data => setAllCountries(data));
  }, []);

  function handleFilter(event) {
    const searchQuery = event.target.value.toLowerCase();
    if (!allCountries.length) return;

    const filtered = allCountries.filter(country => {
      const countryName = country.name.common.toLowerCase();
      return countryName.includes(searchQuery);
    });

    setFilteredCountries(filtered);
  }

  function ResultsDisplay() {
    if (filteredCountries.length === 0) {
      return <p>Type a query pls ☝️</p>;
    }

    if (filteredCountries.length === 1) {
      return <CountryProfile country={filteredCountries[0]} />;
    }

    return <ListOfCountries countries={filteredCountries} />;
  }

  return (
    <div>
      <SearchBox onChange={handleFilter} />
      <ResultsDisplay />
    </div>
  );
}

function SearchBox({ onChange }) {
  return (
    <div style={{ margin: "0.5rem" }}>
      find countries <input type="text" onChange={onChange} />
    </div>
  );
}

function ListOfCountries({ countries }) {
  if (!countries) return null;

  return (
    <ul>
      {countries.map(country => (
        <li key={country.name.common}>
          {country.name.common}
          <button>Show</button>
        </li>
      ))}
    </ul>
  );
}

function CountryProfile({ country }) {
  if (!country) return null;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages:</h2>
      <ListOfThings strings={Object.values(country.languages)} />
      <Img src={country.flags.svg} />
    </div>
  );
}

function ListOfThings({ strings }) {
  if (!strings) return null;

  return (
    <ul>
      {strings.map(string => (
        <li key={string}>{string}</li>
      ))}
    </ul>
  );
}

function Img({ src }) {
  return <img src={src} style={{ display: "block", width: "100%", maxWidth: 400 }} />;
}

export default App;

/*

*/