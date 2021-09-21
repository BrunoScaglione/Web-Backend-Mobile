

import React, {useState} from "react";

// function expensiveInititalState () {
//   // for example a function with some for loops etc
//   return 10 // this doenst have anything to do
// }

function App () {
  // if we had an expensive function that has to run we we initialize we use an arrow functionlike this
  // this way it only gets called on the first time, and not on every single time the component renders
  // const [count, setCount] = useState(() => expensiveInititalState())
  const [count, setCount] = useState(10);

  return (
    <div>
      {/* <button onClick={() => setCount(count + 1)}>+</button> */}
      {/* // this way below is ByteLengthQueuingStrategy, because it guarantees that we are getting the most updated previous state
      // avoide problems of simultanealy updating and overriting states */}
      <button onClick={() => setCount(currentCount => currentCount + 1)}>+</button>
      <div>{count}</div>
    </div>
  );
}

export default App;

//////////////////////////////
///////////////// now an example with objects:

import React, {useState} from "react";

function App () {

  const [{count, count2}, setCount] = useState({count: 10, count2: 20});

  return (
    <div>
    {/* we have to use ...currentState because differently from before (with classes), 
    //if we just update one key of the object
    the other keys will be deleted, we have to update putting everything  */}
      <button onClick={() => setCount(currentState => ({
        ...currentState, count: currentState.count + 1}))}>
        +
      </button>
      <div>count 1: {count}</div>
      <div>count 2:{count2}</div>
    </div>
  );
}

export default App;


////////////// now a forms example

import React, {useState} from "react";

function App () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div>
      <input
        name="email"
        value= {email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        name="password"
        name="password"
        value= {password}
        onChange={e => setPassword(e.target.value)}
      />
    </div>
  );
}

export default App;

////// but this is not the best way, we can define a custom hook that will
// substitute the two  hooks 
/// lets create a file called useForm.js to store  it

import React, {useState} from "react";

import useForm from "./useForm"

function App () {
  const [values, setValues] = useForm({email: '', password: ''});

  // instead of building a custom hook, we could have used useState normally
  // and built a custom function handleChange here -- eu acho melhor 


  return (
    <div>
      <input
        name="email"
        value= {values.email}
        onChange={setValues}
      />
      <input
        type="password"
        name="password"
        value= {values.password}
        onChange={setValues}
      />
    </div>
  );
}

export default App;

/////////////////////////////////////////////
//////////////// now lets see useEffect ///////

import React, {useState, useEffect} from "react";

import useForm from "./useForm"

function App () {
  const [values, setValues] = useForm({
  email: '', 
  password: '',
  firstName: '',
  });

  ///OBS: if we have more than 1 useEffect theyare called in order

  // will run after component renders
  useEffect(() => {
    
    function onMouseMove(event) {
      return (console.log(event));
    }

    console.log("render");
    window.addEventListener('mouseover', onMouseMove);

    // funcao que eh executada quando o componente for desmontado
    return () => window.removeEventListener('mousemove', onMouseMove);

    // will only run if thing inse brackets changes
  },[]);

  return (
    <div>
      <input
        name="email" 
        value={values.email} 
        onChange={setValues}
      />
      <input
        name="firstName"
        placeholder="first name"
        value= {values.firstName}
        onChange={setValues}
      />
      <input
        type="password"
        name="password"
        value= {values.password}
        onChange={setValues}
      />
    </div>
  );
}

export default App;


///////////// now lets use an api///////////

// we willcreate a custom hook in a file  called useFetch.
// we need to get some data to display the things we want, so right after it mounts we are getting this data before the render

import React, {useState, useEffect} from "react";

import useForm from "./useForm"
import useFetch from "./useFetch"

function App () {
  const [values, setValues] = useForm({
  email: '', 
  password: '',
  firstName: '',
  });

  // const [count, setCount] = useState(0);

  // // the function (or custom hook) use fetch returns an object, so we are destructuring it 
  // const {data, loading} = useFetch(`http://numbersapi.com/${count}/trivia`)


 ///What if we want to refresh the page and start the ccount from the number we left off?
 // we save the count to local storage and then retrive from there like this: 

  // look how here we use thearrow function in Use State because we only want to call it at the first render 
  const [count, setCount] = useState(() => JSON.parse(localStorage.getItem("count")));

  const {data, loading} = useFetch(`http://numbersapi.com/${count}/trivia`)

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  },[count]);




  return (
    <div>
      <div>{loading? "loading..." : data}</div>
      <div>count: {count}</div>
      <button onClick={() => setCount(currentcount => currentcount + 1)}>increment</button>
      <input
        name="email" 
        value={values.email} 
        onChange={setValues}
      />
      <input
        name="firstName"
        placeholder="first name"
        value= {values.firstName}
        onChange={setValues}
      />
      <input
        type="password"
        name="password"
        value= {values.password}
        onChange={setValues}
      />
    </div>
  );
}

export default App;

///////////////////////////////////////////////
//////////now lets see useRef

//////////// USE CASES: /////////

////1) most obvious use case which is storing a reference to a component, and then being able to reference 
// component in your aplication:
// we are going to make a button, and whenever we click the button its going to focus the input field!77

////2) for varibles that dont affect re-renders (varibales of logic) that we shouldnt put as state (i react native course he did this)
// we will use file Hello.js fro the example . Obs: we use .current after like:
  // const isCurrent = useRef(true)
  // if isCurrent.current === true {
      // something
  //}

import React, {useState, useEffect, useRef} from "react";

import useForm from "./useForm"
import useFetch from "./useFetch"
import Hello from "./Hello"

function App () {
  const [values, setValues] = useForm({
  email: '', 
  password: '',
  firstName: '',
  });

  const [count, setCount] = useState(() => JSON.parse(localStorage.getItem("count")));

  const {data, loading} = useFetch(`http://numbersapi.com/${count}/trivia`)
  const inputRef = useRef();

  const [showHello, setShowHello] = useState(true)


  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  },[count]);


  return (
    <div>
      <div>{loading? "loading..." : data}</div>
      <div>count: {count}</div>
      <button onClick={() => setCount(currentcount => currentcount + 1)}>increment</button>
      <button onClick={() => setShowHello(!showHello)}>toggle</button>
      {showHello && <Hello />}
      <input
        ref = {inputRef}
        name="email" 
        value={values.email} 
        onChange={setValues}
      />
      <input
        name="firstName"
        placeholder="first name"
        value= {values.firstName}
        onChange={setValues}
      />
      <input
        type="password"
        name="password"
        value= {values.password}
        onChange={setValues}
      />
      <button onClick = {inputRef.current.focus()}>
        focus
      </button>
    </div>
  );
}

export default App;

/////////////////////////////////////////////////////////
///////////////////// now lets see useCallback hook ////////

// is good for when you want to prevent a function for being created on every single render 

import React, { useEffect } from 'react';
import Hello from "./Hello"

function App () {

  const [count, setCount] = useState(0);

  // so lets use usecallBack now:
  // usually it shines when we are using React.memo(see Hello.js)

  // SYNTAX:
  // const  yourVariable = useCallback(() => {
  //   yourFunction;
  // }, [yourDependecies]);
  // HOW IT WORKS:
  // only when dependencies change the function will be changed and stored in the variable 



  //first, this is BAD USAGE: problem continues 
  // bbecause increment keeps changing so we keep passing props that cchanges to <Hello />
  // and it keep re-rendering
  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count, setCount]);

  // this is GREAT USAGE:
  // now we take advantege of arrow function of previous state
  // so we take off the count dependency
  // increment wont change so we will pass a prop that doesnt change to <Hello />
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, [setCount]);


  ////and the same thing appilies if we are using useEffect like:

  useEffect(() => {

  }, [increment]) // we dont want increment to be changing and useEffect kepp firing off

  return (
    <div>
      <Hello increment= {() => setCount(count + 1)}/>
      <div>count: {count}</div>
    </div>
  );
}

export default App;

////////now lets see a pratical example of when this comes up a lot
// when we are looping throw an array of something

// we will create a file called Square.js like Hello.js

import React from 'react';
import Hello from "./Hello"

function App () {
  const [count, setCount] = useState(0);
  const favoriteNums = [7, 21, 37];



  const increment = useCallback( n => {
    setCount(count + n);
  }, [count, setCount]);

  const increment = useCallback( n => {
    setCount(c => c + n);
  }, [setCount]);

  return (
    <div>
      <Hello increment = {increment}/>
      <div>count: {count}</div>
      {favoriteNums.map(n => {
        return (
          // this way is bad we are creating a function every render 
          // <Square onClick={() => increment(n)} n={n} key={n} /> 
          // this is better because we are passing increment which is alwas the same (props wont change in Square.js)
          <Square increment={increment} n={n} key={n} />
        )
      })}
    </div>
  );
}

export default App;

/////////////////////////////////////////////////////////////
////////////////////// now lets see useMemo hook

//// this is a hook that is great whe you want to optimize computed values
/// we are going to start with an example without it and then see how it can imporve things

// /Recomendation : start project without this hook and only when you see things are slow  think about adding it 

// we are going to use kny west api, that gives all hes tweets in json format 
// we are going to display the largest word 

// basically the same thing as React.memo warping a functional component, but instead of props being the dependencies
// we set manually dependencies and the thing we want to meorize in a variable, as along as its dependencies dont change
//  const variable = useMemo(() => what we are returning (the thing), [dependencies])

import React, {useState} from 'react';

function useFetch (url) {
  const [state, setState] = useState({data: null, loading: true});

  useEffect(() => {
      setState(state => ({data: state.data, loading:  true}));
      fetch(url)
          .then(x => x.json())
          .then(y => {
              setState({data: y, loading: false});
          });
  }, [url, setState]);

  return state 
}

function App () {
  const [count, setCount] = useState(0);

  // useFectch  we created
  const {data} = useFetch("https://raw.githubusercontent.com/ajzbc/kanye.rest/master/quotes.json");

  // now we garantee that this function is not being recreated and "changing"
  const computesLongestWord = useCallback(function computeLongestWord (arr) {
    if (!arr) {
      return [];
    }

    ///// whats happening: when we increment the count by clicking the button 
    // this function gets re-rendered every time, but it doesent have to, since it is returning always the same thing
    // (but only use when we see lags)
    console.log("computing longest word")

    let longestWord = "";

    arr.forEach(sentence =>
      sentence.split("").forEach(word => {
        if (word.lenght > longestWord.lenght) {
          longestWord = word;
        }
      })
    );

      return longestWord;
      // doesnt depend on anything changing
  }, [])

  ////////USAGE///////
  //computeLongestWord will be called in all the renders unnecisarily
  // Solution: or we put the function outside our component or we use useCallback on it , we will do this. 
  const longestWord = useMemo(() => computeLongestWord(data), [computeLongestWord, data])
// in this case  computeLongestWord(data) is the thing that we will memorize in longest word, and will change ots value
// only if computeLongestWord changes. But we guaranteed in useCallback that computeLongestWord  function remains the same stored in
// computesLongestWord


  return (
    <div>
      <div>count: {count}</div>
      <button onClick={()=> setCount(count + 1)}>increment</button>
      {/* <div>{computeLongestWord(data)}</div>  with useMemo changes to below:*/}
      <div>{longestWord}</div>
    </div>
  );
}

export default App;

//////////////////////////////////////////////////////////
///////////////////now lets see useReducer////////////

// / this hook is for storing state and is an alternative 

// / 1) Basic Example 

import React from 'react';

// outside functional component
function reducer(state, action)  {
  switch (action.type) {
    case "increment":
      return state + 1; // obs: this can't be state++
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}

function App () {
  // people usually use dispatch as the name 
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <div>count: {count}</div>
      {/* // the object that we pass to dispatch is the action */}
      <button onClick={() => dispatch({type: "increment"})}>increment</button> 
      <button onClick={() => dispatch({type: "decrement"})}>decrement</button> 
    </div>
  );
}

export default App;


/////// 2) Now lets type something in an input field (in a form) press enter and we will add 
/// to a todo list that we will show

import React, {useReducer, useState} from "react";

// action eh um objeto 
function reducer(state, action) {
  switch (action.type) {
    case "add-todo":
      return {
        // todos will be array of objects 
        todos: [...state.todos, {text: action.text, completed: false}]
      };
    case "toggle-todo":
      return {
        // todos will be array of objects 
        // iterate through todos list and if th index is equal the index that we clicked (coming through action),
        // will flip the value of completed (boolean)
        todos: state.todos.map((t, idx) => idx === action.idx ? {...t, completed: !t.completed} : t)
      };
    default:
      return state;
  }
}

function App () {
  // meu state vai ser isso: {todos: []}
  // {todos} eh uma desestruturacao do meu estado, nao vai ser usado na parte de logica, mas eh onde eu vou poder ter 
  // acesso ao estado para fazer coisas como renderizar a lista (como faremos) 
  const [{todos}, dispatch] = useReducer(reducer, {todos: []});
  const [text, setText] = useState();

  return (
    <div>
      <form 
      // sem o preventDefault() ele iria renderizar denovo o form 
      onSubmit={event => {event.preventDefault();
      dispatch({type: "add-todo", text});
      setText("");
      }}
      >
      <input value={text} onChange={event => setText(event.target.value)}/>
      </form>
      {/* // idx is index */}
      {todos.map(t, idx => (
        // {type: 'toggle-todo', idx} é valido pois javascript entende que eh idx: idx e usa só idx
        <div 
        key={t.text} 
        onClick={() => dispatch({type: 'toggle-todo', idx})}
        style={{
          textDecoration: t.completed ? 'line-through' : ''
        }}>
          {t.text}
        </div>
      ))}
      {/* <pre>{JSON.stringify(todos, null, 2)}</pre>  to vizualize object in the screen*/}
    </div>
  )
};


export default App;



/////////The question now: useReducer vs useState vs Useredux 

// ----> use useState as default

// ----> but if the state gets big is useReducer, 
// because with actions we can change multiple things in state

// ----> and for the last, if the state is big AND you use state in more than 1 component 
// (in this example we used only 1) use useRedux


///////////////////////////////////////////////////////
/////////////////////now lets see useContext (storing a User) ///

//// will be using files inside folder pages: Index.js and About.justify-content-around
// and also file UserContext.js to create Context

///we want to be able to grid who the current user is in the Home and About pages

import React, {useState, useMemo} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import About from "./pages/About";
import Index from "./pages/Index";
import UserContext from "./UserContext";

function AppRouter() {

  const [user, setUser] = useState(null)

  const providerValue =  useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
          </ul>
        </nav>
        {/* we wrap UserContext around whataver components we want to be able to get the context */}
        {/* the advantage of useContext is that we can get the value of something
        no matter what the position the component is in the component tree */}
        {/* {value, setvalue} is short syntax for {value: value, setvalue: setValue} */}
        <UserContext value= {providerValue}> 
          <Route path="/" exact component={Index}/>
          <Route path="/about/" component={About}/>
        </UserContext>
      </div>
    </Router>
  );
}

export default AppRouter;