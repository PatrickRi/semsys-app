import React, {Component} from 'react';
import './App.scss';
import NavBar from "./navigation/NavBar";
import {Route, Switch} from "react-router-dom";
import QueryEditor from "./tabs/QueryEditor";
import Home from "./Home";
import GenericEditor from "./tabs/GenericEditor";

class App extends Component {

  render() {
    return (
      <div>
        <NavBar/>
        <Main/>
      </div>
    );
  }
}

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/queries' component={QueryEditor}/>
        <Route exact path='/editor' component={GenericEditor}/>
      </Switch>
    </main>
  )
}


export default App;
