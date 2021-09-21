import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import Launches from './components/Launches';
import './App.css';

const client =  new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})

function App() {
  return (
    // o ApolloProvider vai me deixar fazer as requicisoes em qualquer componente dentro dele 
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Space X</h1>
        <Launches />
      </div>
    </ApolloProvider>
  );
}

export default App;
