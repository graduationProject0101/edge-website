import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/index'
import middleware from './middleware'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import 'aos/dist/aos.css'
import Axios from 'axios'


// http://192.168.1.7:3000/
// https://evening-cliffs-75470.herokuapp.com/

Axios.defaults.baseURL= "https://evening-cliffs-75470.herokuapp.com/";

const store = createStore(rootReducer, middleware)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
