import React from "react"
import ContactCard from "./ContactCard"
import "style.css"
function App() {
    return (
        <div className="contacts">
            <ContactCard 
                // geralmente se passa em objetos 
                // contact = {{name: " ",
                //             imgUrl: "",
                //             phonne:" ",
                //             email:" "}}
                // ai no props ficaria props.contact.name etc
                name="Fluffykins" 
                imgUrl="http://placekitten.com/400/200" 
                phone="(212) 555-2345" 
                email="fluff@me.com"/>
            <ContactCard 
                name="Destroyer" 
                imgUrl="http://placekitten.com/400/300" 
                phone="(212) 555-3456" 
                email="ofworlds@yahoo.com"/>
            <ContactCard 
                name="Felix" 
                imgUrl="http://placekitten.com/200/100" 
                phone="(212) 555-4567" 
                email="Email: thecat@hotmail.com"/>  
        </div>
    )
}

export default App