import React from "react";

function Header() {
    return (
        // he have to use className because JSX is using vailla javascript DOM api under the hod
        // vanilla javascript DOM example: document.getElementById("something").className += "new-class-name"
        // can only apply className to HTML and not components made by us
        <header className="navbar">This is the header</header>
    )
}

export default Header;