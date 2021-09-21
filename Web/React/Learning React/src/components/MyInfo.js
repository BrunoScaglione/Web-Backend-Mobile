// anywhere we are using JSX que need to import react
import React from "react";


function MyInfo() {
    // tudo que retorna tem que ser envolvido por uma tag só
    return (<div>
                <h1>Bruno</h1>
                <p>Alguma coisa sobre mim</p>
                <ul>
                    <li>eu</li>
                    <li>sou </li>
                    <li>foda</li>
                </ul>
            </div>)
}

// tem que ser assim(ES6 e nao node onde eh module.exports = alguma coisa)
export default MyInfo