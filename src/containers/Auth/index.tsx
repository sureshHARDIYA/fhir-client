import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import Cookie from "js-cookie";
import { useHistory, useLocation } from 'react-router-dom';

const AuthContext = createContext<{
  onLogout: () => void;
  setToken: (token: string, expires?: number | null) => void;
  isAuthenticated: boolean;
  accessToken: string | null | undefined;
}>({
  onLogout: () => false,
  accessToken: null,
  isAuthenticated: false,
  setToken: (token: string | null, expires?: number | null) => false,
});

export const useAuth = () => {
  const { onLogout, accessToken, setToken, isAuthenticated } = useContext(AuthContext);

  return ({
    onLogout,
    setToken,
    accessToken,
    isAuthenticated,
  });
};

export const Auth: React.FC = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const setToken = useCallback((token: string | null, expires?: number | null) => {
    setAccessToken(token);

    if (!token) {
      Cookie.remove('access_token');
    } else {
      Cookie.set('access_token', token, { expires: expires || 1 });
    }
  }, []);

  useEffect(() => {
    const [, token] = window.location.href.match(/access_token=(.*)&expires_in/) || [];
    const [, expiredAt] = window.location.href.match(/expires_in=(.*)&/) || [];

    if (token && expiredAt) {
      setToken(token, parseInt(expiredAt, 10) / (3600 * 24));
      history.push('/');
    }
  }, [location, setToken, history]);

  const onLogout = () => {
    setToken(null);
    history.replace('/');
  };

  return (
    <AuthContext.Provider value={{
      onLogout,
      setToken,
      accessToken,
      isAuthenticated: !!accessToken,
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};
