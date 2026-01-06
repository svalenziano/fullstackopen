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
  const mostPopular = getMostPopular();

  function setRandom() {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  function vote() {
    setAnecdotes(anecdotes.map((quoteObj, idx) => {
      if (idx === selected) {
        return {...quoteObj, votes: quoteObj.votes + 1};
      }
      return {...quoteObj};
    }));
  }

  function getMostPopular() {
    /*
    Input = anecdotes
    Output = most popular anecdotes
    Idea: Iterate thru anecdotes, keeping track of maxVotes and maxIdx.
      If votes > maxVotes, update maxVotes and maxIdx
      Return the quote at maxIdx
    */
    let maxVotes = 0;
    let maxIdx = 0;
    for (let i = 0; i < anecdotes.length; i++) {
      const a = anecdotes[i];
      if (a.votes > maxVotes) {
        maxVotes = a.votes;
        maxIdx = i;
      }
    }
    return maxVotes === 0 ? "No votes yet" : anecdotes[maxIdx].text;
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        <button onClick={setRandom}>Next</button>
        <button onClick={vote}>Vote</button>
      </div>
      <blockquote>{anecdotes[selected].text}</blockquote>
      <p>Votes: {votes}</p>
      <h1>Most popular</h1>
      <p>{mostPopular}</p>
    </div>
  )
}

export default App