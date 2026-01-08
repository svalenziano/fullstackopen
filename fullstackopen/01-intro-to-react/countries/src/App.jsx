import { useState, useEffect } from 'react'
import db from "./services/countries.js"
import './App.css'


function App() {
  const [countries, setCountries] = useState([]);
  const names = (c => c.name.common);

  useEffect(() => {
    db.getAll().then(data => setCountries(data));
  },[])

  return (
    <div>
      {JSON.stringify(countries.map(c => c.name.common))}
    </div>
  )
}

export default App