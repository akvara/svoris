import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './header'
import Weight from './weight'
import Pressure from './pressure'
import Home from './home'

const App = () => (
    <BrowserRouter>
        <div className="container">
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/weight" component={Weight} />
            <Route path="/pressure" component={Pressure} />
        </div>
    </BrowserRouter>
);

export default App;