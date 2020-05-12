import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import AuthContext from './context/authContext';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <AuthContext.Provider value={{ name: 'higor' }}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthContext.Provider>
      <GlobalStyle />
    </>
  );
};

export default App;
