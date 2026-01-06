import { useState } from 'react'

const defaultPeople = [{ id: 0, name: 'Arto Hellas' }];

const App = () => {
  const [persons, setPersons] = useState(defaultPeople);
  const [newName, setNewName] = useState('');
  const maxId = persons.reduce((accum, person) => Math.max(accum, person.id), 0)

  function newContact(ev) {
    ev.preventDefault();
    setPersons([
      ...persons,
      {id: maxId + 1, name: newName}
    ])
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={newContact}>
        <div>
          name: <input value={newName} onChange={e => setNewName(e.target.value)}/>
        </div>
        <div>
          <button type="submit" disabled={!newName}>+</button>
        </div>
      </form>
      <Phonebook persons={persons}/>
    </div>
  )
}

function Phonebook({ persons }) {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p => <li key={p.id}>{p.name}</li>)}
      </ul>
    </div>
  )
}

export default App