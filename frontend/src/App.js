import React, { Component } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Search from "./Components/Search";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  return (
    <div className="App">
      <Header />
      <Search/>
      <Main/>
    </div>
  );
}

}

export default App;
