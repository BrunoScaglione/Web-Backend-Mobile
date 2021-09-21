import {useState} from "react"

// this component doenst render anything, just uses logic

// initial values will be an object 
// ex: {email: '', password: ''}


function useForm (initialValues) {
    const [values, setValues] = useState(initialValues);

    return [
        values,
        e => {
            setValues({
                ...values,
                // here we use brackets because its a string, and we want the value 
                [e.target.name]: e.target.value

            });
        }
    ];
}

export default useForm 


