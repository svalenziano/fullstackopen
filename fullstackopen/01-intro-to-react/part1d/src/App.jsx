import { useState, useEffect } from 'react';

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
    }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
    }

  function reset() {
    setAll([]);
    setLeft(0);
    setRight(0);
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <History clickHistory={allClicks}/>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

function History({ clickHistory }) {
  let result;
  if (clickHistory.length > 0) {
    result = (
      <>
        <p>History:{clickHistory.join("")}</p>
        <p>Total: {clickHistory.length}</p>
      </>
    )
  } else {
    result = <p>Click a button to get started!</p>
  }
  return <div>{result}</div>
}

export default App