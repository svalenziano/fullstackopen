import { useState, useEffect } from 'react'
import noteService from "./services/notes.js"
import './App.css'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState('')

  const names = notes.map(p => p.name);
  const filteredPersons = filter 
    ? notes.filter(p => p.name?.toLowerCase().includes(filter.toLowerCase())) 
    : notes;

  useEffect(() => {
    noteService
      .getAll()
      .then(data => {
        setNotes(data);
      })
      .catch(er => setNotification("Server error ☹️, try again later"))
  }, [])

  function newContact(ev) {
    ev.preventDefault();
    if (names.includes(newName)) {
      update(newName);
      setNotification(`Updated ${newName} to ${newPhone}`)

    } else {
      createNewNote();
      setNotification(`Added new note: ${newName}`)
    }
    setNewName('');
    setNewPhone('');
  }

  function notifyAlreadyRemoved(name) {
    setNotification(`${name} has already been removed by someone else!`)
  }

  function update(newName) {
      const { id } = notes.find(note => note.name === newName);

      noteService
        .update(id, {number: newPhone})
        .then(newNote => {
          setNotes(notes.map(note => note.id === newNote.id ? newNote : note))
        })
        .catch(er => notifyAlreadyRemoved('tktk'))
  }

  function createNewNote() {
    noteService
      .create({name: newName, number: newPhone})
      .then((data) => {
        setNotes(notes.concat(data));
      })
    setNotification(`${newName} added! 👍`)
  }

  function handleToggle(ev) {
    const id = ev.target.dataset.id;
    const important = ev.target.dataset.important
    const newImportant = (important === 'false' || !important) ? 'true' : 'false'
    const name = ev.target.dataset.name

    noteService
      .update(id, {important: newImportant})
      .then(data => {
        setNotes(notes.map(note => note.id === id ? data : note));
        setNotification(`Updated "${name}" to ${important === 'true' ? "NOT important" : "important"}`)
      })
      .catch(er => {
        // setNotification("That note doesn't exist, removing it now...");
        notifyAlreadyRemoved(name)
        setNotes(notes.filter(note => note.id !== id));
      })
  }

  function handleDelete(id) {

    const name = notes.find(note => note.id === id)?.name;

    if (window.confirm(`Delete "${name}"?`)) {
      noteService.del(id)
        .then(r => setNotification(`Note for "${name}" deleted`))
        .catch(r => notifyAlreadyRemoved(`Note ${id} did not exist.  Don't worry, it's gone! 👍`))
        .finally(r => setNotes(notes.filter(note => note.id !== id)))
    }   
  }

  const style = {
    fontFamily: "monospace",
  }

  return (
    <div style={style}>
      <NotificationBar key={notification} msg={notification}/>
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

function NotificationBar({ msg }) {
  const style = {
    backgroundColor: "yellow",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    padding: "0.25em",
    opacity: 1,
    animation: "fadeOut 5s ease-out forwards",
  }
  if (msg) {
    return (
      <div style={style}>
        <aside>{msg}</aside>
      </div>
    )
  } else {
    return null;
  }
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
        data-name={name}
        data-important={important}
        onClick={handleToggleImportant}
      >
        {important === 'true' ? "important" : "unimportant"}
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