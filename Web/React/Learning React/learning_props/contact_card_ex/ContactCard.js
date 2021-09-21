import React from "react"
import "style.css"
// props is in object with properties name, imgUrl, phone, email
function ContactCard(props) {
    return (
        <div className="contact-card">
                <img src= {props.imgUrl}/>
                <h3>{props.name}</h3>
                <p>Phone: {props.phone}</p>
                <p>Email: {props.email}</p>
            </div>
    )
}

export default ContactCard;