import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Loading from './components/loading';
import 'react-switch-button/dist/react-switch-button.css';

window.onbeforeunload = function() {
   return "Do you really want to leave Pomodoro app?";
};

ReactDOM.render(<App/>, document.getElementById('app'));
ReactDOM.render(<Loading what="input"/>, document.getElementById('input'));
ReactDOM.render(<Loading what="output"/>, document.getElementById('output'));
ReactDOM.render(<Loading what="stats"/>, document.getElementById('stats'));
ReactDOM.render(<Loading what="chart"/>, document.getElementById('chart'));
