
import React from "react";

function FormComponent(props) {

    // this componnt doesent have state or function  it will be these through props
    return (
        <main>
        {/* // ai pegaria a informacao com event.target acho  */}
        <form onSubmit={props.handleSubmit}>
        {/* value is to show what currently is the state, the thing that is being typed 
        we are receiving an event from user, updating state and telling to the tag what
            is the value it should be displaying*/}

            {/* we are wrapping with <label></label> so that if the user clicks on the text it will trigger event aswell
            props happnes because its a parent element */}
            <label>
                <input
                    type="text" 
                    value={props.data.firstName} 
                    name="fistName" 
                    placeholder="First Name" 
                    onChange={props.handleChange}
                />
            </label>
            

                <br/>
            <label>
                <input
                    type="text"
                    value={props.data.lastName}
                    name="lastName" 
                    placeholder="Last Name" 
                    onChange={props.handleChange} 
                />

            </label>
            {/* text area is now a self closing tag */}
            <textarea
                value={props.data.description}
                name="description"
                placeholder="Put your description"
                onChange={props.handleChange}
                />

            {/* in checkboxes we dont have value, we have checked 
            and it will be handled by handleChange aswell but we will have do make some modifications */}
            
            <label>
                <input 
                    type="checkbox"
                    name="isFriendly"
                    checked={props.data.isFriendly}
                    onChange={props.handleChange}
                    placeh
                />
            </label>

            <label>
            <input 
                type="radio"
                name="gender"
                value="male"
                checked={props.data.gender === "male" }
                onChange={props.handleChange}
            />
            </label> 

            <label>
            <input 
                type="radio"
                name="gender"
                value="female"
                checked={props.data.isFriendly === "female"}
                onChange={props.handleChange}
            />
            </label>

            {/* select box */}

            <select
                // value of one of the options (the choosen one)
                value ={props.data.favColor}
                onChange={props.handleChange}
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

        </main>
    )
}


export default FormComponent;

