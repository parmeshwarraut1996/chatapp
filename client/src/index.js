import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './CSS/register.css';
import './CSS/login.css';
import './CSS/forgotPassword.css';
import './CSS/resetPassword.css';
import './CSS/dashBoard.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import dotenv from 'dotenv';

// dotenv.config({ path:__dirname +'../.env' });
// console.log(process.env.REACT_APP_BASE_URL)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. 
serviceWorker.unregister();
