import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './Containers/LandingPage';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Cities from './Containers/Cities';
import Itineraries from './Containers/Itineraries';
import Redirect from './Components/Redirect';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './Store/Reducers/rootReducer';
import './index.css';
import thunk from 'redux-thunk';


const store = createStore(rootReducer, applyMiddleware(thunk));

    ReactDOM.render( 
      <Provider store={store}>
        <Router>
          <div className="router">
            <Route exact path="/web/home" component={LandingPage} />
            <Route exact path="/web/itinerary/:name" component={Itineraries} />
            <Route exact path="/web/signup" component={SignUp} />
            <Route exact path="/web/login" component={Login} />
            <Route exact path="/web/city" component ={Cities} />
            <Route exact path="/web/redirect" component ={Cities} />
          </div>
      </Router>
    </Provider>
    ,
    document.getElementById("root")
)



