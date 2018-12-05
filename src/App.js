import React, { Component } from 'react';
import './App.css';
import TogglePage from "./TogglePage"
const pageList = ["one", "two", "three", "four", "five", "six"]
class App extends Component {
  render() {
    return (
      <div className="App">
        {
          pageList.map((page , index) => {
           return <section id={page} key={index} className={`page page-${page}`} />
          })
        }
        <TogglePage></TogglePage>
      </div>
    );
  }
}

export default App;
