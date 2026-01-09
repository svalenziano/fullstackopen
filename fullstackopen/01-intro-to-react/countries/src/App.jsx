import { useState, useEffect } from 'react'
import db from "./services/countries.js"
import './App.css'


function App() {
  const [allCountries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const names = filtered
    .map(c => c.name.common);

  useEffect(() => {
    db.getAll().then(data => setCountries(data));
  },[])

  function filter(ev) {
    console.log(ev.target.value)
    if (!allCountries) return;
    const query = ev.target.value.toLowerCase()

    setFiltered(allCountries.filter(country => {
      country = country.name.common.toLowerCase();
      return country.includes(query)
    }))
  }

  function resultsDisplay() {
    switch (filtered.length) {
      case 0:
        return <p>Type a query pls ☝️</p>
      case 1:
        return <CountryProfile country={filtered[0]}/>
        return <p>{JSON.stringify(filtered[0])}</p>    
      default:
        return <ListOfThings strings={names}/>
        // return filtered.length <= 10 
          // ? <ListOfThings strings={names}/> 
          // : <p>Too many results, please be more specific.</p>
    }
  }

  return (
    <div>
      <SearchBox onChange={filter} />
      {resultsDisplay()}
    </div>
  )
}

function SearchBox({ onChange }) {
  const style = {
    margin: "0.5rem",
  }
  return <>find countries <input type="text" onChange={onChange} style={style}/></>
}

function ListOfThings({ strings }) {
  if (!strings) return null;

  return (
    <ul>
      {strings.map(s => <li key={s}>{s}</li>)}
    </ul>
  )
  
}

function CountryProfile({ country }) {
  if (!country) return null;
  // console.log(Object.values(country.languages));
  // console.log(country)
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages:</h2>
      <ListOfThings strings={Object.values(country.languages)}/>
      <Img src={country.flags.svg}/>
    </div>
  )
}

function Img( {src} ) {
  const style = {
    display: "block",
    width: "100%",
    maxWidth: 400,
    // aspectRatio: '',
  }
  return <img src={src} style={style}/>
}

export default App

/*

*/