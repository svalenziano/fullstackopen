function Course({ course }) {
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

export default Course;