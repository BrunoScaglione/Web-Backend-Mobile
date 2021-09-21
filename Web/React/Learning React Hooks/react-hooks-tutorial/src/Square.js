//BAD WAY
// GETS RENDERED IN ALL RENDER CYCLES 

import React from "react";

const Square = React.memo(function Hello ({n, onClick}) {   
    const renders = useRef(0)                          
    console.log("hello renders: ", renders.current++)
    return (
        <button onClick={onClick}>{n}</button>
    );
});

export default Square;

//GOOD WAY, ONLY GETS  RENDERED AGAIN WHEN PROPS CHANGE

import React from "react";

const Square = React.memo(function Hello ({n, increment}) {   
    const renders = useRef(0)                          
    console.log("hello renders: ", renders.current++)
    return (
        <button onClick={() => increment(n)}>{n}</button>
    );
});

export default Square;
