
import { useField,useResource } from './hooks/hooks'
const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')
  console.log(content)
  console.log(name)
  console.log(number)

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    // console.log('notesubmitter',event.target[0].value)
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    console.log(event)
    // console.log('phonesubmitter',event.target[0].value,event.target[1].value)
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes===undefined?<p>nothing yet</p>:notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons===undefined?<p>nothing yet</p>:persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App