import React, {useContext} from "react";
import {UserContext} from "../UserContext";
import login from "";

function Index() {
    const {user, setUser} = useContext(UserContext);

    //// the cool thing about this, is that this is affecting all pages that need the users
    /// its like giving props to everyone in the tree of components 

    return (
        <div>
            <h2>Home</h2>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            {/* if we have a user display logout button(with logout logic), 
            otherwise display login button with login logic */}
            {user ? (
                <button onClick={() => {
                    //call logout
                    setUser(null)
                }}>
                    logout
                </button>) : (
            <button onClick={async () => {
                const user = await login();
                setUser(user);
            }}>
                login
            </button>
            )}
        </div>
    )
}

export default Index;