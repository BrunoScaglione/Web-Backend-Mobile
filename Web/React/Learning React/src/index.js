import React from "react";
import ReactDOM from "react-dom";

/////////////
//ReactDOM & JSX

ReactDOM.render(<p> Chupa Confuso </p>, document.getElementById("root"));

// before we would have to do this(vanilla javascript):
// var myNewP = document.createElement("p")
// myNewP.innerHTML = "This is a paragraph"

///////////
// functional components

// always camelcase and first letter as capital letter
function MyInfo() {
    // tudo que retorna tem que ser envolvido por uma tag só
    return (<div>
                <h1>Bruno</h1>
                <p>Alguma coisa sobre mim</p>
                <ul>
                    <li>eu</li>
                    <li>sou </li>
                    <li>foda</li>
                </ul>
            </div>)
}

ReactDOM.render(<MyApp/>, document.getElementById("root"));

////////////
/// move compondents into separate  files

import MyInfo from "./components/MyInfo";

ReactDOM.render( <MyInfo/> , document.getElementById("root"));


///////////
//parent/child Components

import App from "./components/App"

ReactDOM.render( <App/> , document.getElementById("root"));

//////////
// TODO APP PHASE 1

import App from "./components/App"

ReactDOM.render( <App/> , document.getElementById("root"));


////////////
///styling react with css classes
// / lets go back to the app that we did before
// / a gente mudoou o Header


///////////
//// JSX to Javascript and Back


import React from "react";
import ReactDOM from "react-dom";

function App() {
    const firstName = "Bruno";
    const lastName = "Scaglione";

    return (
        <h1>Hello {`${firstName} ${lastName}`}</h1>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));

function App() {
    const date =  new Date();
    const hours = date.getHours();
    let timeOfDay;

    if (hours < 12) {
        timeOfDay = "morning";
    } else if (hours >= 12 && hours < 17) {
        timeofDay = "afternoon";
    } else {
        timeOfDay = "night";
    }

    return (
        <h1>Good {timeOfDay}</h1>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));

//////
// / inline styles withthe style property

function App() {
    const date =  new Date();
    const hours = date.getHours();
    let timeOfDay;

    if (hours < 12) {
        timeOfDay = "morning";
    } else if (hours >= 12 && hours < 17) {
        timeofDay = "afternoon";
    } else {
        timeOfDay = "night";
    }
    // pseudo selector such as hover has cant be done inline simply like this
    const styles = {
        color: "#FF8C00",
        backgroundColor: "aFF2D06",
        // me must put as strings units
        fontSize: "200px"
    }
    return (
        // since we are in JSX there are some things different
        // style expect a javascript objject when inline
        // tem que colocar duas chaves pq todas vez que trbaalhamos com javascript no JSX tem que ter {}
        // outra coisa eh que trocamos tudo que tem trainho por camelCase : background-color virou backgroundColor
        // da pra colocar em uma variavel styles 
        <h1 style={styles}>Good {timeOfDay}</h1>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));


// now lets make it more dynamic:

function App() {
    const date =  new Date();
    const hours = date.getHours();
    let timeOfDay;
    const styles = {
        fontsize: 30
    }

    if (hours < 12) {
        timeOfDay = "morning";
        styles.color = "#04756F"
    } else if (hours >= 12 && hours < 17) {
        timeofDay = "afternoon";
        styles.color = "#2E0927"
    } else {
        timeOfDay = "night";
        styles.color = "#0900000"
    }
    return (
        <h1 style={styles}>Good {timeOfDay}</h1>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));


////////////
////TODO APP PHASE 2

import App from "./App"

ReactDOM.render(<App />, document.getElementById("root"))

/////////
/// now lets talk abput props:
/// properties that let us alter the components
// just like we have properties for html tags
// we will just add parametrs do the functons now!

/////////////
//////Mapping Components






