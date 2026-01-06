import { useState } from 'react'

const defaultPeople = [
  { id: 0, name: 'Arto Hellas', phone:'555-123-4567' },
  { id: 1, name: 'Albert Einstein', phone:'555-123-1111' },
  { id: 2, name: 'Hanna Boops', phone:'333-222-1111' },
  ];

const App = () => {
  const [persons, setPersons] = useState(defaultPeople);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('')
  const maxId = persons.reduce((accum, person) => Math.max(accum, person.id), 0);
  const names = persons.map(p => p.name);

  function newContact(ev) {
    ev.preventDefault();
    console.log(newName);
    console.log(names);
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
      <form onSubmit={newContact}>
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
      <Phonebook persons={persons}/>
    </div>
  )
}

function Phonebook({ persons }) {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p => <li key={p.id}>{p.name} {p.phone ? p.phone : ''}</li>)}
      </ul>
    </div>
  )
}

export default App