import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import game_controller from "./game-controller";

window.Player = game_controller.Player;
window.CPU = game_controller.CPU;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


