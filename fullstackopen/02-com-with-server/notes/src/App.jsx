import axios from 'axios'
import { useState, useEffect } from 'react';

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/notes")
      .then(data => setNotes(data.data))
  }, [])

  return (
    <div>
      <h1>Notes</h1>
      <Notes notes={notes} />
    </div>
  )
}

function Notes({ notes }) {
  return (
    <>
      <ul>
        {notes.map(note =>
          <li key={note.id}>{note.content}</li>
        )}
      </ul>
    </>
  )
}

export default App