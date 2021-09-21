import React from 'react';

import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import isAuthenticated from './auth'

//custom component
const PrivateRoute = ({component: Component, ...rest}) => (
    // se eu quiser passar props  pro meu componente atraves do Route
    // aqui podemos redefinir o render co uma funcao que recebe props
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            // state: {from: props.location} pra manter o historico de navegacao do cara
            <Redirect to={{pathname: "/", state: {from: props.location}}} />
        )

    )}/> 
);




const Routes = () => (
    <BrowserRouter>
    <Switch>

        <Route exact path = "/" component={() => <h1>Hello World</h1>} />
        <PrivateRoute path = "/app" component={() => <h1>Voce está logado</h1>} />

    </Switch>
    </BrowserRouter>
);

export default Routes;