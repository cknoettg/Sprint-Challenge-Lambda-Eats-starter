import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Form from './components/Form';

const App = () => {

  return (
    <div className="app">
    <Router>
      <div>
          <button><Link to="/">Home</Link></button>
          <Route exact path="/" />
          <button><Link to="/pizza">Take Me To Pizza</Link></button>
          <Route path="/pizza" component={Form} />
      </div>
    </Router>
    </div>
  );
};

export default App;