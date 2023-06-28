import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/success" component={SuccessPage} />
      </Switch>
    </Router>
  );
}

export default App;
