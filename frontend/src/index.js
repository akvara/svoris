import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
// import Loading from './components/loading';

window.onbeforeunload = function() {
   return "Do you really want to leave this app?";
};

ReactDOM.render(<App/>, document.getElementById('app'));
