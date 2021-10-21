import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createRef, useEffect, useImperativeHandle, useState } from 'react';
import './app.css';
import { SignUp } from './components/signup/signup';
import { MainPage } from './components/mainPage/mainPage';

const csrfRef = createRef();

function App({ authService, fileUploader }) {

  const [csrfToken, setCsrfToken] = useState(undefined);
  useImperativeHandle(csrfRef, () => csrfToken);

  useEffect(() => {
    authService.getCsrfToken().then(setCsrfToken).catch();
  }, [ authService ]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/signup">
            <SignUp authService={ authService }/>
          </Route>
          
          <Route path="/">
            <MainPage 
              authService={ authService }
              fileUploader={ fileUploader }
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
export const getCsrfToken = () => csrfRef.current;