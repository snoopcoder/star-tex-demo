import React from 'react';
import { nanoid } from 'nanoid';

// eslint-disable-next-line react/prop-types
const TokenLoader = ({ children }) => {
  const [token, setToken] = React.useState(null);
  React.useEffect(() => {
    const tokenPrepare = async () => {
      let tk = await localStorage.getItem('token');
      if (tk) {
        setToken(tk);
      } else {
        tk = nanoid();
        setToken(tk);
        await localStorage.setItem('token', tk);
      }
    };
    tokenPrepare();
  }, []);
  return <>{children({ token })}</>;
};

export default TokenLoader;
