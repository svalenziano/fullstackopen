import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPersons = filter 
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) 
    : persons;
  const maxId = persons.reduce((accum, person) => Math.max(accum, person.id), 0);
  const names = persons.map(p => p.name);

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
      .then(r => setPersons(r.data))
  },[])

  function newContact(ev) {
    ev.preventDefault();
    if (names.includes(newName)) {
      alert(`"${newName}" is already in the phonebook. Try a different name.`)
      return;
    }
    setPersons([
      ...persons,
      {
        id: maxId + 1, 
        name: newName,
        phone: newPhone,
      }
      
    ])
    setNewName('');
    setNewPhone('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <AddNew onSubmit={newContact} newName={newName} newPhone={newPhone} setNewName={setNewName} setNewPhone={setNewPhone}/>
      <Phonebook persons={filteredPersons}/>
    </div>
  )
}

function Filter({ filter, setFilter }) {
  return (
    <div>
      <h3>Filter</h3>
      type and smile: <input type="text" value={filter} onChange={e => setFilter(e.target.value)}/>
    </div>
  )
}

function AddNew({
  onSubmit,
  newName,
  newPhone,
  setNewName,
  setNewPhone,
}) {
  return (
    <div>
      <h3>Add new</h3>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={e => setNewName(e.target.value)}/>
        </div>
        <div>
          phone: <input value={newPhone} onChange={e => setNewPhone(e.target.value)}/>
        </div>
        <div>
          <button type="submit" disabled={!newName}>+</button>
        </div>
      </form>
    </div>
  )
}

function Phonebook({ persons }) {
  const toDisplay = persons.length > 0
    ? <ul>{persons.map(p => <li key={p.id}>{p.name} {p.number ? p.number : ''}</li>)}</ul>
    : <p>Nothing to see here</p>
    
  return (
    <div>
      <h3>Numbers</h3>
      {toDisplay}
    </div>
  )
}

export default App