import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app.jsx';
import { getCsrfToken } from './app.jsx';
import AuthService from './service/auth';
import HttpClient from './network/http';

const baseURL = 'http://127.0.0.1:3000';
const httpClient = new HttpClient(baseURL, getCsrfToken);
const authService = new AuthService(httpClient);


ReactDOM.render(
  <React.StrictMode>
    <App authService={authService}/>
  </React.StrictMode>,
  document.getElementById('root')
);
