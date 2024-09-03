/* Todo:* unicafe valmis -> anekdootit*/

import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const getRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const voteForAnecdote = () => {
    const copy = new Uint8Array(votes);
    copy[selected] += 1;
    setVotes(copy);
  };
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [total, setTotal] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setAll(all + 1);
    setTotal(total + 1);
    setPositive(positive + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setTotal(total - 1);
  };
  let average;

  if (all > 0) {
    average = total / all;
  } else {
    average = 0;
  }
  let percent;

  if (all > 0) {
    percent = (good / all) * 100;
  } else {
    percent = 0;
  }
  return (
    <>
      <div>
        <p>{anecdotes[selected]}</p>
        <p>Has {votes[selected]} votes</p>
        <Button handleClick={voteForAnecdote} text="Vote" />
        <Button handleClick={getRandomAnecdote} text="Next Anecdote" />
        <h2>Anecdote with the most votes</h2>
        <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
        <p>Has {Math.max(...votes)} votes</p>
      </div>

      <div>
        <h1>give feedback</h1>
        <Button handleClick={handleGood} text="good" />
        <Button handleClick={handleNeutral} text="neutral" />
        <Button handleClick={handleBad} text="bad" />
        <Tilasto
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          percent={percent}
        />
      </div>
    </>
  );
};
/* Todo:* unicafe valmis -> anekdootit*/

const Tilasto = (props) => {
  if (props.all < 1) {
    return (
      <>
        <h2>statistics</h2>
        <p>no feedback given</p>
      </>
    );
  } else {
    return (
      <>
        <h2>statistics</h2>
        <table>
          <tbody>
            <Tilastorivi text="good" value={props.good} />
            <Tilastorivi text="neutral" value={props.neutral} />
            <Tilastorivi text="bad" value={props.neutral} />
            <Tilastorivi text="all" value={props.all} />
            <Tilastorivi text="average" value={props.average} />
            <Tilastorivi text="percent positive" value={props.percent} />
          </tbody>
        </table>
      </>
    );
  }
};

const Tilastorivi = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

export default App;
