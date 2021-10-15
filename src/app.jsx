import { createRef, useEffect, useImperativeHandle, useState } from 'react';
import './app.css';

const csrfRef = createRef();

function App({authService}) {

  const [csrfToken, setCsrfToken] = useState(undefined);

  useImperativeHandle(csrfRef, () => csrfToken);

  useEffect(() => {
    authService.getCsrfToken().then(setCsrfToken).catch();
  }, [ authService ]);

  return (
    <h1>Hello World</h1>
  );
}

export default App;
export const getCsrfToken = () => csrfRef.current;