import React from "react"
import '../Die/die.css'

export default function Die(props){

    const styles = {backgroundColor: props.isHeld===true ? "#59E391" : "white"}

    function handleClick(){
        props.handleDiceClicked(props.id);
    }

    return(
        <div className="die-face" style={styles} onClick={handleClick}>
            <h2 className="die-face-num">{props.value}</h2>
        </div>
    )
}
