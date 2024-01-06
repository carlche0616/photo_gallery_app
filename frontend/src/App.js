import React, { Component } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  return (
    <div className="App">
      <Header />
      <Main/>
    </div>
  );
}

}

export default App;
