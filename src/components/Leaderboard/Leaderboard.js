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
        return ((hr%12)+(ampm=="pm"?12:0))*60 + mint;
    }

    function compareTimes(t1, t2){
        return convertTime(t1) > convertTime(t2);
    }

    function compareDates(d1, d2){      // returns true if d1 > d2;
        let a = d1.split('/');
        let b = d2.split('/');
        let d1day = parseInt(a[0]), d1month = parseInt(a[1]), d1year = parseInt(a[2]);
        let d2day = parseInt(b[0]), d2month = parseInt(b[1]), d2year = parseInt(b[2]);
        if(d1year > d2year)
            return true;
        else if(d1year < d2year)
            return false;
        else
        {
            if(d1month > d2month)
                return true;
            else if(d1month < d2month)
                return false;
            else
            {
                if(d1day > d2day)
                    return true;
                else
                    return false;
            }
        }
    }
    
    props.data.sort((a, b) => {
        if(a.Score < b.Score)
            return -1;
        else if(a.Score > b.Score)
            return 1;
        else
        {
            if(a.Date==b.Date)
            {
                if(compareTimes(a.Time, b.Time))
                    return -1;
                else
                    return 1;
            }
            else if(compareDates(a.Date, b.Date))
                return -1;
            else
                return 1;
        }
    });

    let count = 1;
    let leaderboard_ele = props.data.map(item=>{
        return(
            <tr style={{backgroundImage: count==1 ? "linear-gradient(to bottom, white ,gold" : count==2 ? "linear-gradient(to bottom, white ,silver" : count==3?"linear-gradient(to bottom, white , #CD7F32" : ""}}>
                <td>{count++ + (count == 2 ? "🥇" : (count == 3 ? "🥈" : (count == 4 ? "🥉" : "")))}</td>
                <td style={{fontWeight: count==2||count==3|| count==4 ? "bold" : ""}}>{item.Name}</td>
                <td style={{fontWeight: count==2||count==3|| count==4 ? "bold" : ""}}>{item.Score}</td>
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