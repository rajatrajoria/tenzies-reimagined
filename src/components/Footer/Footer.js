import React from "react";
import footerlinks from "../../data/footerlinks";
import './footer.css';

export default function Footer(){
    function handler(){
        var access = document.getElementById("completenavbar");
        access.scrollIntoView();
    }
    const footerLinkElements = footerlinks.footlinks.map(item=>{
        return(
            <a href={item.link} target="_blank"><img src={item.image} href={item.link}/></a>
        );
    }) 
    return(
        <div className="footer-container">
            <div className="footer-container-upper">
                <h2>{footerlinks.footname}</h2>
                <div className="footer-container-upper-icons">
                    {footerLinkElements}
                </div>
            </div>
            <div className="footer-container-lower">    
                <div className="footer-container-lower-text">
                    <p>&#169; No copyright 2023.</p>
                    <h4>Made with ❤️ by Rajat R.</h4>
                </div>
            </div>
        </div>
    );
}