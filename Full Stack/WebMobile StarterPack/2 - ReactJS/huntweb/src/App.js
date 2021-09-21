import React from 'react';
import Routes from './routes';

import "./styles.css"

import Header from './components/Header'
import Main from "./pages/main"

// obs: nao estamos usando react hooks nessa aplicacao

function App() {
  return (
    <div className="App">
      <Header />
      <Routes/>
    </div>
  );
}

export default App;
