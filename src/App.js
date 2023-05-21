import React from "react"
import "./App.css"
import Die from './Die.js'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
export default function App() {

  const [dice, setdice] = React.useState(newdice())
  const [tenz, settenz] = React.useState(false)
  const [count, setCount] = React.useState(50)
  const [ct, setCt] = React.useState(0)
  const [data, setData] = React.useState(0)
  const { width, height } = useWindowSize()



  React.useEffect(() => {

    setCt(`${count * 25}`)
  }, [count])



  React.useEffect(() => {

    const hld = dice.every(ele => ele.isheld)
    const st = dice[0].val
    const sm = dice.every(ele => ele.val === st)

    if (hld && sm) {
      settenz(true)
      console.log("u won")
    }
  }, [dice])



  function generate() {
    return ({
      val: Math.ceil(Math.random() * 6),
      isheld: false,
      id: nanoid()
    })
  }

  function newdice() {
    const arr = []

    for (let i = 0; i < 10; i++) {
      arr.push(generate())
    }
    return arr
  }

  function holdDice(id) {
    setdice(
      prevState => prevState.map(die => {
        return die.id == id ? { ...die, isheld: !die.isheld } : die
      })

    )
  }


  const diceele = dice.map(ele => (<Die key={ele.id} val={ele.val} isheld={ele.isheld} holdDice={() => holdDice(ele.id)} />
  ))

  function setdie() {

    if (!tenz) {
      setdice(
        prevState => prevState.map(die => {
          return die.isheld ? die : generate()

        })
      )


    }
    else {
      settenz(false)
      setdice(newdice())
      setCount(41)
      setData(-1)
    }

    setCount(prevCount => prevCount - 1)
    setData(prevData => prevData + 1)



  }

  return (

    <main>

      {tenz && <Confetti
       width={width}
       height={height}
       />}
      <div className="x">
        <div className="box">
          <h1><b>Tenzies</b></h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="y">

            {diceele}

          </div>

          <button className="but" onClick={setdie}>
            {tenz ? "New Game" : "Roll"}
          </button>
        </div>




      </div>
      {tenz && <div className="mark">

        <h1 className="op">You Won!!!</h1>
        <h3>no of rolls:{data}</h3>
        <h3>score:{ct}</h3>



      </div>}
    </main>

  )
}