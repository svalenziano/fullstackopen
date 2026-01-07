import { useState, useEffect } from 'react'
import noteService from "./services/notes.js"

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

  const names = notes.map(p => p.name);
  const filteredPersons = filter 
    ? notes.filter(p => p.name?.toLowerCase().includes(filter.toLowerCase())) 
    : notes;

  useEffect(() => {
    noteService
      .getAll()
      .then(data => setNotes(data))
  }, [])

  function newContact(ev) {
    ev.preventDefault();
    if (names.includes(newName)) {
      const { id } = notes.find(note => note.name === newName);
      // console.log(id, oldNumber)

      noteService
        .update(id, {number: newPhone})
        .then(newNote => {
          console.log(newNote)
          setNotes(notes.map(note => note.id === newNote.id ? newNote : note))
        });

    } else {
      noteService
        .create({name: newName, number: newPhone})
        .then((data) => {
          setNotes(notes.concat(data));
          setNewName('');
          setNewPhone('');
        })
    }

  }

  function handleToggle(ev) {
    const id = ev.target.dataset.id;
    const important = ev.target.dataset.important

    noteService
      .update(id, {important: important === "true" ? false : true})
      .then(data => {
        setNotes(notes.map(note => note.id === id ? data : note));
      })
      .catch(er => {
        alert("That note doesn't exist, removing it now...");
        setNotes(notes.filter(note => note.id !== id));
      })
  }

  function handleDelete(id) {

    const name = notes.find(note => note.id === id)?.name;

    if (window.confirm(`Delete "${name}"?`)) {
      noteService.del(id)
        .then(r => {
          setNotes(notes.filter(note => note.id !== id));
        })
    } else {
      console.error(`Note ${id} not found!`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <AddNew onSubmit={newContact} newName={newName} newPhone={newPhone} setNewName={setNewName} setNewPhone={setNewPhone}/>
      <Phonebook 
        persons={filteredPersons} 
        handleToggleImportant={handleToggle}
        handleDelete={handleDelete}
      />
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

function Phonebook({ persons, handleToggleImportant, handleDelete }) {
  const toDisplay = persons.length > 0
    ? <ul>{persons.map(p => 
      <BookEntry 
        key={p.id} 
        id={p.id} 
        name={p.name} 
        number={p.number} 
        important={p.important}
        handleToggleImportant={handleToggleImportant}
        handleDelete={handleDelete}
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

function BookEntry({ id, name, number, important, handleToggleImportant, handleDelete }) {

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
      <button onClick={e => handleDelete(id)}>X</button>
    </li>
 )
}

export default App

/*
Goal: when imporant is toggled, POST to server, then update the local state

Idea 1: When person is updated, you only need to update that person?? or do you wish to update the entire persons object?
*/