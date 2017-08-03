import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// window.onbeforeunload = function() {
   // return "Do you really want to leave Pomodoro app?";
   //if we return nothing here (just calling return;) then there will be no pop-up question at all
   //return;
// };

ReactDOM.render(<App/>, document.getElementById('app'));
