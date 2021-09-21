import React from "react";

function TodoItem (props) {



    const commpletedStyle = {

        fontStyle: "italic",
        color: "#cdcdcd",
        textDecoration: "line-through"
    }

    return (
        <div className="todo-item">

        {/* before it was inside checkbox checked={props.item.completed} but now is better we added event
        but still we arent ticking it yet with onChange{() => console.log("thello")*/}
        {/* nao pode  colocar props.handleChange(props.item.id direto, a funcao tem que chamar */}


        <input 
            type="checkbox" 
            checked = {props.item.completed} 
            // nao pode colocar direto pq a funcao depende de argumentos que nao sao event
            onChange={(event) => props.handleChange(props.item.id)}

        />
        <p style={props.item.completed ? completedStyle  : null}>{props.item.text}</p>

        </div>
    )
}

export default TodoItem;