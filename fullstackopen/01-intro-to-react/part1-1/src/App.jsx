import { useState, useEffect } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  function increment() {
    setCount(i => i + 1);
  }

  function resetCount() {
    setCount(0);
  }

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      <p>{count}</p>
      <Button label={"+"} onClick={increment}/>
      <Button label={"-"} onClick={() => setCount(i => i - 1)}/>
      <Button label={"Reset"} onClick={resetCount}/>
    </div>
  )
}


function Button({label, onClick}) {
  return <button onClick={onClick}>{label}</button>
}

function Header({course}) {
  return <h1>{course}</h1>
}

function Content({parts}) {
  return (
    <>
      {parts.map((c, idx) => <p key={idx}>{c.name} - {c.exercises}</p>)}
    </>
  )
}

function Total({parts}) {
  const total = parts.reduce((a, c) => c.exercises + a, 0)

  return <p>Total exercises - {total}</p>
}

export default App