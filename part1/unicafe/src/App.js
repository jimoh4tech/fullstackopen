import React, {useState} from "react";

const Header = (props) => <h1>{props.value}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <table>
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  </table>
)

const Statistics = (props) => {
  const {good, neutral, bad } = props;

  const total = good + neutral + bad
  const average = (good + (neutral * 0) + (bad * -1)) / total
  const positive = (good / total) * 100

  if(good === 0 && neutral === 0 && bad === 0)
    return (
      <StatisticLine text="No feedback given"/>
    )
  return (
    <>
      <StatisticLine text="good " value={good}/>
      <StatisticLine text="neutral " value={neutral}/>
      <StatisticLine text="bad " value={bad}/>
      <StatisticLine text="all " value={total}/> 
      <StatisticLine text="average " value={average}/>
      <StatisticLine text="positive " value={positive + " %"}/>
    </>
  )
}


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header value={"give feedback"}  />
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="Bad"/>
      <Header value ={"statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
export default App;
