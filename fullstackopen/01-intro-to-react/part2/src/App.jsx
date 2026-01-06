const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <>
    <h1>Curriculum</h1>
      {courses.map((c) => {
        return <Course course={c} />
      })}
    </>
  )
}

function Course({ course }) {
  console.log(course.parts)
  return (
    <div>
      <Header text={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

function Header({ text }) {
  return <h2>{text}</h2>
}

function Content({ parts }) {
  return (
    <div>
      {parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises} />)}
    </div>
  )
}

function Part({ name, exercises }) {
  return <p>{name} {exercises}</p>
}

function Total({ parts }) {
  return <p>Total exercises: {parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
}

/*
App
  Course
    Header
    Content
      Part
      Part
      ...
*/

export default App