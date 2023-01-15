import React from "react";
import "./leaderboard.css"
import Confetti from "react-confetti"

export default function Leaderboard(props)
{

    function convertTime(t){
        let arr = t.split(':');
        let hr = Number(arr[0]);
        let arrnew = arr[1].split(' ');
        let mint = Number(arrnew[0]), ampm = arrnew[1];
        return ((hr+(ampm=="pm"?12:0))*60 + mint)
    }

    function compareTimes(t1, t2){
        return convertTime(t1) > convertTime(t2);
    }

    function compareDates(d1, d2){
        return new Date(d1) > new Date(d2);
    }
    
    props.data.sort((a, b) => {
        if(a.Score < b.Score)
            return -1;
        else if(a.Score > b.Score)
            return 1;
        else
        {
            if(compareDates(a.Date, b.Date))
                return -1;
            else if(a.Date==b.Date)
            {
                if(compareTimes(a.Time, b.Time))
                    return -1;
                else
                    return 1;
            }
            else
                return 1;
        }
    });
//(count-1 == 2 ? "🥉" : "")}       (count-1 == 2 ? "🥈" : "") 
    let count = 1;
    let leaderboard_ele = props.data.map(item=>{
        return(
            <tr>
                <td>{count++}</td>
                <td>{item.Name + (count-1 == 1 ? "🥇" : (count-1 == 2 ? "🥈" : count-1 == 3 ? "🥉" : ""))}</td>
                <td>{item.Score}</td>
                <td>{item.Time}</td>
                <td>{item.Date}</td>
            </tr>
        )
    })

    leaderboard_ele = leaderboard_ele.slice(0,200);

    return(
        <div className="leaderboard-container">
            <div className="leaderboard-container-heading">
                <h1>🏆GLOBAL LEADERBOARD🏆</h1>
                <h4>"Top 200"</h4>
            </div>
            <table id="leaderboard-table">
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Moves</th>
                    <th>Time</th>
                    <th>Date</th>
                </tr>
                {leaderboard_ele}
            </table>
        </div>
    )
}