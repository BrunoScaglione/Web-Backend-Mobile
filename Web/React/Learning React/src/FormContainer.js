import React  from 'react'
import FormComponent from "./FormComponent"

// differently form vanilla javascript, that all of the data is gathered at the end, whn it is submited
// in react,we are going to keep track of all the changes in the state

// OBSERVATION: FORMIK API CAN BE USED TO CREATE FORMS EASIER

import {Component} from "react"

class Form extends Component {
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

        const {name, value, type, checked} = event.target
        type == "checkbox" ? this.setState({[name]: checked}) : this.setState({[name]: value})
        // this.setState({
        //     // we have to put [] because we want the value inside the string
        //     [name]: value
        // })
    }


    render(){
        return(
            <FormComponent 
            handleChange={this.handleChange}
            data={this.state}
            />
        )
        
    }

}


export default Form