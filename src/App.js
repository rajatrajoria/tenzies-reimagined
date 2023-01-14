import React from "react"
import './App.css';
import Die from "./components/Die/Die.js"
import Confetti from "react-confetti"

function App() 
{

	const [dice, setDice] = React.useState(getNewDices())
	const [tenzies, setTenzies] = React.useState(false)
	const [moves, setMoves] = React.useState(0);
	const [record, setRecord] = React.useState(JSON.parse(localStorage.getItem("record")) || "-")

	React.useEffect(() => {
        const firstValue = dice[0].value
        const allHeld = dice.every(die => die.isHeld)
        const allSameNumber = dice.every(die => die.value === firstValue)
        if(allHeld && allSameNumber) {
            setTenzies(true)
        }
    }, [dice])

	React.useEffect(()=>{
		if(tenzies && (record=="-" || moves <= record))
		{
			localStorage.setItem("record", JSON.stringify(moves));
			setRecord(moves);
		}
	},[tenzies])

	function getRandomValue(){
		return Math.floor(Math.random() * 6 + 1)
	}

	function getNewDices(){
		const newDice = [];
		for(let i=0;i<10;i++)
		{
			newDice.push({
				value: getRandomValue(),
				isHeld: false,
				id: "dice"+i
			})	
		}
		return newDice;
	}

	function handleRoll(){
		if(!tenzies)
		{
			setDice(oldDie=>oldDie.map(die=>{
			return die.isHeld===true ? die : {...die, value: getRandomValue(), isHeld: false}
			}));
			setMoves(old=>old+1);
		}
		else{
			setDice(getNewDices()); 
			setTenzies(false); 
			setMoves(0);
		}
	}

	function handleDiceClicked(id){
		setDice(prevDice=>prevDice.map(die=>{
			return (die.id===id) ? {...die, isHeld: !die.isHeld} : die;
		}))
	}

	const diceElements = dice.map(item=>{
		return(
			<Die value={item.value} isHeld = {item.isHeld} handleDiceClicked = {handleDiceClicked} id={item.id}/>
		)
	})

	return (
		<div className="app-container">
			<nav>
				<h1>Tenzies</h1>
			</nav>
			<div className="playground">
				<div className="playground-board">
					<div id="playground-board-moves" className="playground-boxes">
						<span className="heading">Record : </span><span className="value">{record}</span>
					</div>
					<div id="playground-board-elapsedTime" className="playground-boxes">
						<span className="heading">Moves : </span><span className="value">{moves}</span>
					</div>
				</div>
				<main>
					{tenzies && <Confetti/>}
					<p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
					<div className="die-container">{diceElements}</div>
					<button className="roll-button" onClick={handleRoll}>{tenzies? "Reset Game" : "Roll"}</button>
				</main>
			</div>
		</div>
	);
}

export default App;
