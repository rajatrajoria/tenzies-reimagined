import React from "react"
import './App.css';
import Die from "./components/Die/Die.js"
import Confetti from "react-confetti"
import handleSubmit from "./handles/handlesubmit";
import { collection, getDocs } from "firebase/firestore";
import {db} from './firebase';
import Leaderboard from "./components/Leaderboard/Leaderboard"

function App() 
{
	const [dice, setDice] = React.useState(getNewDices())
	const [tenzies, setTenzies] = React.useState(false)
	const [moves, setMoves] = React.useState(0);
	const [record, setRecord] = React.useState(JSON.parse(localStorage.getItem("record")) || "-")

	React.useEffect(() => {
        const firstValue = dice[0].value;
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
		if(tenzies)
		{
			const date = new Date();
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var ampm = hours >= 12 ? 'pm' : 'am';
			hours = hours % 12;
			hours = hours ? hours : 12; 
			minutes = minutes < 10 ? '0'+minutes : minutes;
			var strTime = hours + ':' + minutes + ' ' + ampm;

			let current_time = strTime;
			let current_date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
			handleSubmit(name, moves, current_time, current_date);
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

	const [name, setName] = React.useState(JSON.parse(localStorage.getItem("playerName")) || "Player")
	// const [name, setName] = React.useState("Player");
	function handleNameChange(event){
		setName(event.target.value);
		localStorage.setItem("playerName",JSON.stringify(event.target.value));
	}

/********************************************Fetching the Scoreboard********************************* */
	
	const [scoreboard, setScoreboard] = React.useState([]);
	const fetchPost = async () => {
		await getDocs(collection(db, "test_data"))
			.then((querySnapshot)=>{               
				const newData = querySnapshot.docs
					.map((doc) => ({...doc.data(), id:doc.id }));
				setScoreboard(newData);             
			})
	}
	React.useEffect(()=>{
		fetchPost();
	}, [tenzies])

/************************************************************************************************** */

	return (
		<div className="app-container">
			<nav>
				<h1>Tenzies</h1>
			</nav>
			<form onSubmit={(e)=>{e.preventDefault()}}>
				<input
					type="text"
					className="input-name"
					placeholder="Type your name here"
					maxLength={30}
					onChange={handleNameChange}
					id="player-name"
					value={name}
				/>
			</form>
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
			<div className="global-score-board">
				<Leaderboard data={scoreboard}/>
			</div>
		</div>
	);
}

export default App;
