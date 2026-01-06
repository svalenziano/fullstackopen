import { useState, useEffect } from 'react';
let defaultAnecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

defaultAnecdotes = defaultAnecdotes.reduce((accum, cur) => {
  return [...accum, {text: cur, votes: 0}];
}, []);


const App = () => {

  const [anecdotes, setAnecdotes] = useState(defaultAnecdotes);
  const [selected, setSelected] = useState(0)
  const votes = anecdotes[selected].votes;

  function setRandom() {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  function vote() {
    setAnecdotes(anecdotes.map((quoteObj, idx) => {
      return idx === selected ? {...quoteObj, votes: quoteObj.votes + 1} : {...quoteObj};
    }));
  }


  return (
    <div>
      <div>
        <button onClick={setRandom}>Next</button>
        <button onClick={vote}>Vote</button>
      </div>
      <blockquote>{anecdotes[selected].text}</blockquote>
      <p>Votes: {votes}</p>
    </div>
  )
}

export default App