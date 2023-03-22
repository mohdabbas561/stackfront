import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import UserList from './UserList';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RegistrationForm} />
        <Route exact path="/UserList" component={UserList} />
      </Switch>
    </Router>
  );
}

export default App;
