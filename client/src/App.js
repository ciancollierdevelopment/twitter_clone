import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    );
  }
}

export default App;
