import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app.jsx';
import { getCsrfToken } from './app.jsx';
import HttpClient from './network/http';
import AuthService from './service/auth';
import FileUploader from './service/fileUploader';

const baseURL = 'http://127.0.0.1:3000';
const httpClient = new HttpClient(baseURL, getCsrfToken);
const authService = new AuthService(httpClient);
const fileUploader = new FileUploader(httpClient);


ReactDOM.render(
  <React.StrictMode>
    <App 
      authService={ authService }
      fileUploader={ fileUploader }
    />
  </React.StrictMode>,
  document.getElementById('root')
);
