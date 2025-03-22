import { useState, useEffect } from 'react'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  const fetchNotes = async () => {
    const res = await fetch('/api/notes')
    const data = await res.json()
    setNotes(data)
  }

  const addNote = async () => {
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newNote })
    })
    setNewNote('')
    fetchNotes()
  }

  const deleteNote = async (id) => {
    await fetch(`/api/notes/${id}`, { method: 'DELETE' })
    fetchNotes()
  }

  useEffect(() => { fetchNotes() }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Notes</h1>
      <input
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="New note"
      />
      <button onClick={addNote}>Add</button>
      
      {notes.map(note => (
        <div key={note.id} style={{ marginTop: 10 }}>
          {note.content}
          <button 
            onClick={() => deleteNote(note.id)}
            style={{ marginLeft: 10 }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default App