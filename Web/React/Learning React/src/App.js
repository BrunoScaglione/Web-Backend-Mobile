import React from "react";
// import Header from "./components/Nav";
// import Main from "./components/Main";
// import Footer from "./components/Footer";




function App() {
    return (
        <div>
            <Nav />
            <Main />
            <Footer />
        </div>
    )
}

export default App;

/////////
/ TODO APP PHASE 1

function App() {
    return (
        <div>
            <input type="checkbox" />
            <p>Placeholder text here</p>

            <input type="checkbox" />
            <p>Placeholder text here</p>

            <input type="checkbox" />
            <p>Placeholder text here</p>

            <input type="checkbox" />
            <p>Placeholder text here</p>
        </div>

    )
}

export default App;


function App() {
    return (
        <div>
            <Nav />
            <Main />
            <Footer />
        </div>
    )
}

export default App;


/// lets go back to our todo list 
/////////
/ TODO APP PHASE 2


import TodoItem from "./components/TodoItem";
// nao precisava fazer esse import era meio magico, mas eu quero ver
import "./components/style.css";


function App() {

    
    return (
        <div className = "todo-list">
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
        </div>

    )
}

export default App;


/////////
/ TODO APP PHASE 3

import TodoItem from "./components/TodoItem";
// nao precisava fazer esse import era meio magico, mas eu quero ver
import "./components/style.css";
import todosData from "./todosData";

function App() {

    const todoItems = todosData.map(item => <TodoItem key={item.id} item={item}/>);
    return (
        <div className = "todo-list">
            {todoItems}
        </div> 
    )
}

export default App;

/////////////
////Class Based Components

does things that function cant do

class App extends React.Component {

// the only chage is now to access props we have to do this.props instead of just props
    yourMethodHere() {
        // any display logic, style, conditional rendering etc
    }

    render() {
        this.yourMethodHere()
        return (
            <div> 
            {/*  nao precisa passar props como argumento igual an funcao */}
                <h1>{this.props}}</h1>
            </div>
        )
    }
}

export default App;

/////////
////State

// is a way that a component can maintaing its own data and CHANGE its own data of it needs to
// props were imutable for the component receiving it
// needs to be class based component

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            answer: "Yes"
        }
    }

    render() {
        return (
            <div>
                <h1>Is state important to know?{this.state.answer}</h1>
                {/* passing values down through props */}
                <ChildComponent answer={this.state.answer}/>
            </div>
        )
    }
}


export default App


////////
///State practice

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoggedIn: "Yes"
        }
    }

    render() {

        let wordDisplay;
        if (this.state.isLoggedIn) {
            wordDisplay = "in"
        } else {
            wordDisplay = "out"
        }

        return (
            <div>
                <h1>Tou are currrently logged {wordDisplay}</h1>
            </div>
        )
    }
}


export default App

///////
// TODO APP PHASE 4

import TodoItem from "./components/TodoItem";
// nao precisava fazer esse import era meio magico, mas eu quero ver
import "./components/style.css";
import todosData from "./todosData";
import { render } from "react-dom";

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: todosData  
        }
    }
    render() {
        const todoItems = todosData.map(item => <TodoItem key={item.id} item={item}/>);
        return (
        <div className = "todo-list">
            {todoItems}
        </div> 
        )
    }   
}

export default App;

/////////
//Handling Events in React


function handleClick(){
    console.log("clicked");
}

function App() {
    return(
        <div>
            <img onMouseOver={()=> console.log("hovered")} src="https://www.fillmurray.com/200/100"/>
            <br/>
            <button onClick={handleClick}>Click me</button>
        </div>
    )
}


export default App;

/////////////
// changing state


class App extends Component {
    constructor() {
        super()
        this.state = {
            count: 0
        }
        // sempre que a gente for fazer um setState dentro de um metodo,
        // a gente vai ter que dar bind do metodo com a classe
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(prevState => {
            return ({
                count: prevState.count + 1
        })
    }
    }

    render() {

        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.handleClick}>Change!</button>
                {/* we could add a child component that receives the state
                everytime the state changes its re-rendered, this ChildComponent doest exist*/}
                <ChildComponent count={this.state.count}/>
            </div>
        )
    }
}

export default App

///////
// TODO APP PHASE 5

import TodoItem from "./components/TodoItem";
// nao precisava fazer esse import era meio magico, mas eu quero ver
import "./components/style.css";
import todosData from "./todosData";
import { render } from "react-dom";
import {Component} from "react";

class App extends Component {

    constructor() {
        super()
        this.state = {
            todos: todosData  
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(id) {

        // since we are working with an array in our state, wcannot simply loop trought it and modify an item
        // we have to give a whol new state (changing clothes hehe)

        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
            return {
                todos: updatedTodos
            }
        })

        // console.log("Changed", id)
    }

    render() {
        const todoItems = todosDatathis.state.todos.map(item => <TodoItem key={item.id} item={item} 
            handleChange={this.handleChange}
        />);
        return (
        <div className = "todo-list">
            {todoItems}
        </div> 
        )
    }   
}

export default App;

//////////////
////LifeCycle Method Part 1
import {Component} from "react"

class TodoList extends Component {
    constructor() {
        super();
        this.state = {};
    }

    // render is one
    render() {};

    componentDidMount() {}; // get the data i need to correccly display

    componentWillReceiveProps(nextProps) {} ;// wont be a part of react anymore

    shouldComponentUpdate(nextProps, nextState) {};
        // sometimes a component is re rendered even if nothing has changed
        //this  can become costly
        // so we can implement here some logic that says whether or not is important to update}
        //return true if we want it to update 
        // return false if not

    componentWillUnmount() {
        // Ex: remove event listener
        // (In general, teardown or cleanup your code before your component disapears)
    }

    //new methods
    static getDerivedStateFromProps(props, state)
    // component sets is own state upon receiving props
    // IMPORTANT:  WE GENERALLY WONT BE USING THIS
    //THE REACT TEAM SAID IT HAS APLICATIONS ONLY IN VERY SPECIFIC CASES

    getSnapshotBeforeUpdate() {
        //create a backup of the current way things are
        //IMPORTANT: not very common
    }


/////////////
////ConditionalRendering

// can be done in a few ways besides this one

import {Component} from 'react'
import Conditional from "./Conditional"


class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true 
        }
    }

    // rememmber that we are rendering App.js in index.js
    // case usage : we need this info to diplay the thinngs we want to display
    componentDidMount() {
        // pretending that we are making a call to an api that takes 1500ms
        setTimeout(() => {
            // finished loading data from api
            this.setstate({isLoading: false})
        }, 1500);
    }
    // when satate changes this willl be re-rendered
    render() {
        return (
            <div>
                {this.state.isLoading ?
                <h1>Loading...</h1>: < Conditional/>}
                {/* weare not using the below code anymore because we tranfered the logic to here */}
                {/* // passing the state as props */}
                {/* <Conditional isLoading={this.state.isLoading}/> */}
            </div>
        )
    }

}

import {Component} from 'react'
import Conditional from "./Conditional"


class App extends Component {
    constructor() {
        super();
        this.state = {
            unreadMessages: [
                "Call your mom!",
                "New spam email available. All links are definitely safe to click"
            ] 
        }
    }

    // && are actually works like this something && otherthing
    // if something is true it looks at the other thing
    // if something is false it neglects
    // we are going to use it for conditional rendering


    render() {
        return (
            <div>
                {this.state.unreadMessages.lenght > 0 &&
                <h2>You have {this.state.unreadMessages.lenght} unread messages!</h2>}
            </div>
        )
    }


}


/////////
//conditional rendering practice


import { Component } from 'react';



class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        };
        this.Loginout = this.Loginout.bind(this);
    }

    Loginout() {
        this.setState(prevState => {
            return ({
                isLoggedIn: !prevState.isLoggedIn
            });
        })
    }

    render() {
        let buttonText = this.LoggedIn ? "LOG OUT" : "LOG IN"
        return ( <div>
                    <button onClick = { this.Loginout } > {buttonText} </button> 
                </div>
        )
    }

}
   
export default App;

//////////
// Fetching data from an API


import {Component} from "react"

class App extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            character: {}
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        fetch("https://swapi.co/api/people/1")
        .then(response => response.json)
        .then(data => {
            this.setState({
                character:  data,
                loading: false
            })
        })
        // now if we dont save this data it will dissapear
        // the way we save data in a component is by its state
    }


    render() {
        const text = this.state.loading? "Loading" : this.state.character.name;
        return(
            <div>
                <p>{text}</p>
            </div>
        )
    }
}


export default App



/////////////////
//////Forms Part 1

// differently form vanilla javascript, that all of the data is gathered at the end, whn it is submited
// in react,we are going to keep track of all the changes in the state

// OBSERVATION: FORMIK API CAN BE USED TO CREATE FORMS EASIER

import {Component} from "react"

class App extends Component {
    constructor() {
        super();
        // names will have to match state and property (this. etc) !!
        this.state({
            firstName: "",
            lastName: "",
            gender: "",
            favColor: "blue",
            isFriendly: false,
            description: ""
        })
        this.handleChange = this.handelChange.bind(this);
    }

    handleChange(event){
        // object destructuring, do always this way is better for not bugging
        // is important to make a copy of name and value before setting the state


        //IMPORTANT : this value below is what is typed into a text box, and changed is the state of checked
        // not to confuse with the value that the sate is passing to the tag, and checked an so on
        const {name, value, type, checked} = event.target
        type == "checkbox" ? this.setState({[name]: checked}) : this.setState({[name]: value})
        // this.setState({
        //     // we have to put [] because we want the value inside the string
        //     [name]: value
        // })
    }

    render() {
        return(
            <div>
            {/* ai a funcao handleSubmit pega os valores do estado e por exemplo faz um post
            numa api criada pela  gente (ai da pra usar fectch com method post, ou usar a bibilioteca 
            axios como o Diego fez no starter da rocketseat de ReactJS)*/}
            <form onSubmit={this.handleSubmit}>
            {/* value is to show what currently is the state, the thing that is being typed 
            we are receiving an event from user, updating state and telling to the tag what
             is the value it should be displaying*/}

             {/* we are wrapping with <label></label> so that if the user clicks on the text it will trigger event aswell
             this happnes because its a parent element */}
                <label>
                    <input
                        type="text" 
                        value={this.state.firstName} 
                        name="fistName" 
                        placeholder="First Name" 
                        onChange={this.handleChange}
                    />
                </label>
                

                 <br/>
                <label>
                    <input
                        type="text"
                        value={this.state.lastName}
                        name="lastName" 
                        placeholder="Last Name" 
                        onChange={this.handleChange} 
                    />

                </label>
                {/* text area is now a self closing tag */}
                <textarea
                    value={this.state.description}
                    name="description"
                    placeholder="Put your description"
                    onChange={this.handleChange}
                    />

                {/* in checkboxes we dont have value, we have checked 
                and it will be handled by handleChange aswell but we will have do make some modifications */}
                
                <label>
                    <input 
                        type="checkbox"
                        name="isFriendly"
                        checked={this.state.isFriendly}
                        onChange={this.handleChange}
                    />
                </label>

                <label>
                <input 
                    type="radio"
                    name="gender"
                    value="male"
                    checked={this.state.gender === "male" }
                    onChange={this.handleChange}
                />
                </label> 

                <label>
                <input 
                    type="radio"
                    name="gender"
                    value="female"
                    checked={this.state.isFriendly === "female"}
                    onChange={this.handleChange}
                />
                </label>

                {/* select box */}

                <select
                    // value of one of the options (the choosen one)
                    value ={this.state.favColor}
                    onChange={this.handleChange}
                    name="favColor"
                >
                    <option value= "">-- Please Choose a color --</option>
                    <option value= "blue">Blue</option>
                    <option value= "green">Green</option>
                    <option value= "red">Red</option>
                </select>
             {/* when a button is inside a form it does already the submission */}
            
            <button>Submit</button>

            </form>

            </div>
        )
    }
}

// TO REMEMBER , JAVASCRIPT DOESNT DISPLAY BOOLEANS, TOU HAVE TO MAKE A TERNAIRY OR IF STATEMANT WITH "YES" OR "NO"

export default App;



//////////////////////
/////Container?component

// / LETS ORGANIZE THE CODE THAT WE JUST MADE

// 1) put everything thing that we mande in another file called FormContainer.js, because this file App.js will render it
// 2) but form is still doing everything so we will create another file FormComponent.js (that will be rendered by FormContaier) 

import Form from "./FormContainer"

function App() {
    return (
        <Form />
    )
}

export default App;



/////////////////////////
//////////writing modern react apps




