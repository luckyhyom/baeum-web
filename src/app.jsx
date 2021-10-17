import { createRef, useEffect, useImperativeHandle, useState } from 'react';
import './app.css';
import { Login } from './components/login/login'

const csrfRef = createRef();

function App({authService}) {

  const [user, setUser] = useState(undefined);
  const [csrfToken, setCsrfToken] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useImperativeHandle(csrfRef, () => csrfToken);

  useEffect(() => {
    authService.getCsrfToken().then(setCsrfToken).catch();
  }, [ authService ]);

  useEffect(() => {
    authService.me().then(setUser)
    .then(setErrorMessage(undefined))
    .catch(console.error)
  }, [ authService ])

  const login = async (userId, password) => {
    await authService.login(userId,password)
      .then(setUser)
      .then(setErrorMessage(undefined))
      .catch(LoginException);
  };

  const LoginException = (error) => {
    setErrorMessage(error.message)
  }

  return (
    <>
      { user ? <h1>Login Success</h1>:'non-login' }
      <Login authService={ authService } onLogin={ login } />
      { errorMessage && <p style={{ color: 'red' }}>{ errorMessage }</p> }
    </>
  );
}

export default App;
export const getCsrfToken = () => csrfRef.current;