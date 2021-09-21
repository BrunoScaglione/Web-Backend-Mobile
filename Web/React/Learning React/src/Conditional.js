import React from "react"

// function Conditional(props) {
    
//     return ( <div>
//                 <h1>Something</h1>

//                 {prps.isLoading ? <h1>Loading...</h1> :  <h1> Some cool stuff about conditional rendering</h1>}

//                 <h1> Something 2</h1>

//             </div>)
// }
    // is  the same as:
    //     if(props.isLoading == true) {
    //         return (
    //             <h1>Loading...</h1>
    //         )
    //     } else {
    //         return (

    //             <h1> |Some cool stuff about conditional rendering</h1>
    //         )
    //     }
    // }

//////////
// genrally child components like these will only display something, and we will let the logic
// of if it will display or not to the parent that is dealing with the state (App.js)
// sonow  we wll tranfer the logic to App.js

function Conditional() {

    return ( <div>
                <h1>Something</h1>

                <p> Some cool stuff about conditional rendering</p>

                <h1> Something 2</h1>

            </div>)
}


export default Conditional;