import { useState, useEffect } from 'react';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const sum = good + neutral + bad;
  const average = (good / sum).toFixed(2);

  return (
    <div>
      <h1>give feedback</h1>
      <Button label={"good"} onClick={() => setGood(i => i + 1)}></Button>
      <Button label={"neutral"} onClick={() => setNeutral(i => i + 1)}></Button>
      <Button label={"bad"} onClick={() => setBad(i => i + 1)}></Button>
      <h1>statistics</h1>
      <Stats good={good} neutral={neutral} bad={bad} sum={sum} average={average}/>
    </div>
  )
}

function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>
}

function Stats({ good, neutral, bad, sum, average }) {
  if (sum === 0) {
    return <p>No feedback given, yet...</p>
  }
  return (
    <>
      <StatsLine text="good" value={good}/>
      <StatsLine text="neutral" value={neutral}/>
      <StatsLine text="bad" value={bad}/>
      <StatsLine text="sum" value={sum}/>
      <StatsLine text="average" value={average + '%'}/>
    </>
  )
}

function StatsLine({ text, value }) {
  return <p>{text} {value}</p>
}

export default App