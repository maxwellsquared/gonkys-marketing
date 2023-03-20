import './App.css';
import React from 'react';
import { useState } from 'react';



function App() {
  const fruit = process.env.REACT_APP_GONKY_FRUIT;
  console.log(" env is ", process.env);
  console.log(" fruit is ", fruit);

  return (
    <div className="App">
      <header className="App-header">
        <img src={'./gonky-marketing-m.png'} className="App-logo" alt="logo" />
        <p>
          My name is Gonky and I'm here to provide<br />
          some funky marketing content, server-side!<br />
          I'll write tweets and blogs to make your app explode<br />
          and give your startup team more time to code!<br />
        </p>
        <p>Hey funky folks! Did you know my favourite fruit is {fruit}?</p>

      </header>
    </div>
  );
}

export default App;
