import { useState } from 'react'
import Note from './components/Note'


const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newText, setNewText] = useState('');
  const maxId = notes.reduce((accum, note) => Math.max(accum, note.id), 0)

  const updateForm = e => setNewText(e.target.value);

  function submit(ev) {
    ev.preventDefault();
    /*
    Create new note using maxId
    Update notes
    */
    setNotes([
      ...notes,
      {
        id: maxId + 1,
        content: newText,
        important: false,
      }
    ]);
    setNewText('')
  }

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={submit}>
        <label htmlFor="new-note">New note: </label>
        <input name="new-note" type="text" value={newText} onChange={updateForm}/>
      </form>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App 