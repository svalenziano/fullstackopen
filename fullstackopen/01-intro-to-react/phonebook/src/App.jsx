import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPersons = filter 
    ? notes.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) 
    : notes;
  const maxId = notes.reduce((accum, person) => Math.max(accum, person.id), 0);
  const names = notes.map(p => p.name);

  function fetchPeople() {
    axios.get("http://localhost:3001/persons")
      .then(r => setNotes(r.data))
    }

  useEffect(() => fetchPeople(), [])

  function newContact(ev) {
    ev.preventDefault();
    if (names.includes(newName)) {
      alert(`"${newName}" is already in the phonebook. Try a different name.`)
      return;
    }

    axios({
      method: "post",
      url:"http://localhost:3001/persons",
      data: {name: newName, number: newPhone},
    }).then((res) => {
      setNotes(notes.concat(res.data));
      setNewName('');
      setNewPhone('');
    })

  }

  function handleToggle(ev) {
    const id = ev.target.dataset.id;
    const important = ev.target.dataset.important
    console.log(`Toggling importance of ${ev.target.dataset.id}, tktk`)

    axios({
      method: "patch",
      url: `http://localhost:3001/persons/${id}`,
      data: {important: important === "true" ? false : true},
    }).then(r => setNotes(notes.map(note => note.id === id ? r.data : note)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <AddNew onSubmit={newContact} newName={newName} newPhone={newPhone} setNewName={setNewName} setNewPhone={setNewPhone}/>
      <Phonebook persons={filteredPersons} handleToggleImportant={handleToggle}/>
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

function Phonebook({ persons, handleToggleImportant }) {
  const toDisplay = persons.length > 0
    ? <ul>{persons.map(p => 
      <BookEntry 
        key={p.id} 
        id={p.id} 
        name={p.name} 
        number={p.number} 
        important={p.important}
        handleToggleImportant={handleToggleImportant}
      />
    )}</ul>
    : <p>Nothing to see here</p>
    
  return (
    <div>
      <h3>Numbers</h3>
      {toDisplay}
    </div>
  )
}

function BookEntry({ id, name, number, important, handleToggleImportant }) {

  return (
    <li data-id={id}>
      {name} {number ? number : ''}
      <button 
        data-id={id} 
        data-important={important}
        onClick={handleToggleImportant}
      >
        {important ? "important" : "unimportant"}
      </button>
    </li>
 )
}

export default App

/*
Goal: when imporant is toggled, POST to server, then update the local state

Idea 1: When person is updated, you only need to update that person?? or do you wish to update the entire persons object?
*/