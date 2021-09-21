import React from "react";
import "./style.css";

function Joke(props) {
    return (
        <div className="joke">
            {/* se tiver um apergunta, display regular bock format , e nao tiver display none */}
            <h3 style={{display: props.question ? "block": "none"}}className="question">{props.question}</h3>
            {/* se nao tiver pergunta vai ficar com essa cor. A gente nao tinha usado && desse jeito mas funciona isso */}
            <h3 style={{color: !props.question && "#888888"}}className="punch">{props.punchLine}</h3>
            <hr/>
        </div>
        
    )
}

export default Joke;
