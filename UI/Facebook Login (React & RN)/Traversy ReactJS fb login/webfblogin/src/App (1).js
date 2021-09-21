import React from 'react';
import logo from './logo.svg';
import './App.css';

import Facebook from './components/Facebook'

function App() {
  return (
    <div className="App">
      <p>To get started, authenticate with facebook</p>
      <Facebook />
    </div>
  );
}

export default App;
