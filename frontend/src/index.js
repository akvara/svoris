import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Loading from './components/loading';

window.onbeforeunload = function() {
   return "Do you really want to leave Pomodoro app?";
   // if we return nothing here (just calling return;) then there will be no pop-up question at all
   return;
};

ReactDOM.render(<App/>, document.getElementById('app'));
ReactDOM.render(<Loading what = "input"/>, document.getElementById('input'));
ReactDOM.render(<Loading what = "output"/>, document.getElementById('output'));
ReactDOM.render(<Loading what = "chart"/>, document.getElementById('chart'));
