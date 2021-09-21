import React, {useRef} from "react";

///////about React.memo //////////
// If your function component renders the same result given the same props, 
// you can wrap it in a call to React.memo for a performance boost in some cases 
// by memoizing the result. This means that React will skip rendering the component, 
// and reuse the last rendered result.

// React.memo only checks for prop changes. If your function component wrapped in React.memo 
// has a useState or useContext Hook in its implementation, it will still rerender when state or context change.

///////about React.memo //////////

// em vez de fazer props.increment da pra desestruturar desse jeito tb
const Hello = React.memo(function Hello ({increment}) {   /// the problem here is increment is changing al the time
    // const renders = useRef(0)                          /// so it keeps re-rendering (so this were useCallback kicks in)
    // console.log("hello renders: ", renders.current++)
    return (
        <button onClick={increment}>hello</button>
    );
});

export default Hello;