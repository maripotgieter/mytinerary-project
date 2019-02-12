import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './Containers/LandingPage';
// import SignUp from './Components/SignUp';
// import Login from './Components/Login';
// import Cities from './Components/Cities';

import './index.css';

ReactDOM.render(
  <Router>
      <div className="router">
        <Route exact path="/web/home" component={LandingPage} />
        {/* <Route exact path="/web/signup" component={SignUp} /> */}
        {/* <Route exact path="/web/login" component={Login} /> */}
        {/* <Route exact path="/web/cities" componet ={Cities} /> */}
      </div>
  </Router>,
  document.getElementById('root')
)
