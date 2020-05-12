import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { AuthProvider } from './hooks/AuthContext';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
