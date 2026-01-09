import { useState, useEffect } from 'react';
import db from "./services/countries.js";
import './App.css';

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [query, setQuery] = useState('');
  const filtered = allCountries.filter(country => {
    const countryName = country.name.common.toLowerCase();
    return countryName.includes(query.toLowerCase());
  });

  console.log(filtered.length)
  
  useEffect(() => {
    db.getAll().then(data => setAllCountries(data));
  }, []);

  return (
    <div>
      <SearchBox value={query} setValue={setQuery} />
      <ResultsDisplay countries={filtered} query={query} setQuery={setQuery}/>
    </div>
  );
}

function ResultsDisplay({ countries, query, setQuery }) {
  if (query.length === 0) {
    return <p>Type a query pls ☝️</p>;
  }

  if (countries.length === 0) {
    return <p>Nothing found ☹️, please try another query.</p>
  }

  if (countries.length === 1) {
    return <CountryProfile country={countries[0]} />;
  }

  return <ListOfCountries countries={countries} setQuery={setQuery} />;
}

function SearchBox({ value, setValue }) {
  return (
    <div style={{ margin: "0.5rem" }}>
      Search <input type="text" size="50" value={value} onChange={(ev) => setValue(ev.target.value)} />
    </div>
  );
}

function ListOfCountries({ countries, setQuery }) {
  if (!countries) return null;

  return (
    <ul>
      {countries.map(country => (
        <li key={country.name.common} >
          {country.name.common}
          <button onClick={(ev) => setQuery(ev.target.dataset.name)} data-name={country.name.common}>Show</button>
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