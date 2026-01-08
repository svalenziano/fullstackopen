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

    // setFiltered(allCountries.filter(country => {
    //   console.log(country)
    //   return country.name.common.toLower().includes(ev.target.value)
    // }))
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
  console.log(strings)
  if (!strings) return null;
  if (strings.length > 10) {
    return <p>Greater than 10 results</p>
  } else {
    return (
      <ul>
        {strings.map(s => <li key={'4'}>{s}</li>)}
      </ul>
    )
  }
}

export default App

/*

*/