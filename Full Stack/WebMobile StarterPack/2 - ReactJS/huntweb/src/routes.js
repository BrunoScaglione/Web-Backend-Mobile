import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/main';
import Product from './pages/product';

// import {useHistory} from 'react-router-dom'
// let history = useHistory 
// tem os métodos useHistory.goBack() que eh mt util 

const Routes = () => (
    <BrowserRouter>
        <Switch>
            {/* o exact eh pra especifiicar que o path tem que ser exataente uma barra
            porque por default se o path comecar com uma barra ele jah aceita como satisfeito
            e ai renderiza  primeiro <Route/>, quando na verdade a gente queria renderizar o outro  */}
            <Route exact path="/" component={Main} />
            <Route path="/products/:id" component={Product}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;