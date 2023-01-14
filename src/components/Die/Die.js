import React from "react"
import '../Die/die.css'

export default function Die(props){

    // const styles = {backgroundImage: `url(${props.isHeld===true ? "https://i.imgur.com/i3J6PhY.jpg" : "none"}")`}
    const styles = {
        backgroundImage: props.isHeld==false ? "none" : "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLpQzVn3ZysCknc_KQcvh_iz_yjgqtmNL7bg&usqp=CAU)",
        backgroundSize: props.isHeld==false ? "auto" : "cover",
        backgroundRepeat: props.isHeld==false ? "auto" : "no-repeat",
        color: props.isHeld==false ? "black" : "white"
    }

    function handleClick(){
        props.handleDiceClicked(props.id);
    }

    return(
        <div className="die-face" style={styles} onClick={handleClick}>
            <h2 className="die-face-num">{props.value}</h2>
        </div>
    )
}
