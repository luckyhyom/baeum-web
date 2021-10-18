import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createRef, useEffect, useImperativeHandle, useState } from 'react';
import './app.css';
import { Login } from './components/login/login'
import { SignUp } from './components/signup/signup';

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

  const logout = async () => {
    await authService.logout()
      .then(setUser(undefined))
      .catch(LoginException)
  }

  const LoginException = (error) => {
    setErrorMessage(error.message)
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={ SignUp } />

          <Route path="/">
            {
              user ?
                <div onClick={logout}>Logout</div>
              : <Login
                  onLogin={ login }
                  authService={ authService }
                  errorMessage={ errorMessage }
                />
            }
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
export const getCsrfToken = () => csrfRef.current;