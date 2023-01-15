import React from "react";
import "./leaderboard.css"

export default function Leaderboard(props){

    const leaderboard_ele = props.data.map(item=>{
        return(
            <tr>
                <td>{item.Name}</td>
                <td>{item.Score}</td>
                <td>{item.Time}</td>
                <td>{item.Date}</td>
            </tr>
        )
    })

    console.log(props.data);

    return(
        <div className="leaderboard-container">
            <div className="leaderboard-container-heading">
                <h1>🏆GLOBAL LEADERBOARD🏆</h1>
            </div>
            <table id="leaderboard-table">
                <tr>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Time</th>
                    <th>Date</th>
                </tr>
                {leaderboard_ele}
            </table>
        </div>
    )
}