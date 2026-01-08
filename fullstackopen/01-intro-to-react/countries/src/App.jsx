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

  return (
    <div>
      <SearchBox onChange={filter} />
      <ListOfThings strings={names}/>
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
  if (strings.length > 10) {
    return <p>Greater than 10 results</p>
  } else {
    return (
      <ul>
        {strings.map(s => <li key={s}>{s}</li>)}
      </ul>
    )
  }
}

export default App

/*

*/