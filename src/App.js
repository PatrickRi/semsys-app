import React, {Component} from 'react';
import './App.scss';
import NavBar from "./navigation/NavBar";
import {Route, Switch} from "react-router-dom";
import Sparql1 from "./tabs/sparql1";
import Sparql2 from "./tabs/sparql2";
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
        <Route exact path='/sparql1' component={Sparql1}/>
        <Route exact path='/sparql2' component={Sparql2}/>
        <Route exact path='/editor' component={GenericEditor}/>
      </Switch>
    </main>
  )
}


export default App;
