import React from "react";
import "./App.css";
import Microwave from "./components/Microwave";

function App() {
  return (
    <div className="App">
      <main className="App-main">
        {/*         <img
          alt="microwave"
          className="microwave-img"
          src="/my-microwave.jpg"
        /> */}
        <Microwave />
      </main>
    </div>
  );
}

export default App;
