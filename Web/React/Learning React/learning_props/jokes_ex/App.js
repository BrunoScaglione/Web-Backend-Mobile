import React from "react";
import Joke from "./components/Joke"
import jokesData from "./components/jokesData"

function App() {
    
    
    // lets remember that we can do high order methods on arrays like map:
    // const nums =[1,2,3,4];
    // const doubled = nums.map(function(num) {
    //     return num*2
    // })
    // console.log(doubled)
    
    // array of compnents
    // we need to give key so that react can place everything like it wants to
    const jokeComponents = jokesData.map(joke => < Joke key={joke.id} question={joke.question} punchLine={joke.punchLine} />);
    
    return (
        <div className= "jokes">
            {/* <Joke question="question1" punchLine = "punchLine1"/>
        
            <Joke question="question2" punchLine = "punchLine2"/>
     
            <Joke question="question3" punchLine = "punchLine3"/>
            
            <Joke question="question4" punchLine = "punchLine4"/>
          
            <Joke question="question5" punchLine = "punchLine5"/> */}

            {jokeComponents}
     
        </div>
        
    )
}

export default App;
