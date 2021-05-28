import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {Index} from './Index'
import {Branches} from './Branches' 
import {Commits} from './Commits' 
import {CommitDetails} from './CommitDetails' 

export default function App() {
  return <Routes/>
}

function Routes() {
  return ( 
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Index/>}/>  
          <Route exact path="/branches" render={() => <Branches/>}/>  
          <Route exact path="/commits/:BranchName" render={() => <Commits/>}/>  
          <Route exact path="/commit/:CommitHash/:CommitMessage" render={() => <CommitDetails/>}/>  
        </Switch>
      </Router> 
  );
}
