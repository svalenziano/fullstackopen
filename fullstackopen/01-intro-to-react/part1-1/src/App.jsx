const App = () => {
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

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

function Header({course}) {
  return <h1>{course}</h1>
}

function Content({parts}) {
  let num = 0;
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