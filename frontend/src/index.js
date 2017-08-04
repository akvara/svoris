import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import WeightPost from './components/WeightPost';
import WeightGet from './components/WeightGet';

// window.onbeforeunload = function() {
   // return "Do you really want to leave Pomodoro app?";
   //if we return nothing here (just calling return;) then there will be no pop-up question at all
   //return;
// };

// ReactDOM.render(<App/>, document.getElementById('app'));
ReactDOM.render(<WeightPost/>, document.getElementById('weight-post'));
ReactDOM.render(<WeightGet/>, document.getElementById('weight-get'));
ReactDOM.render(<WeightPost/>, document.getElementById('pressure-post'));
ReactDOM.render(<WeightGet/>, document.getElementById('pressure-get'));
