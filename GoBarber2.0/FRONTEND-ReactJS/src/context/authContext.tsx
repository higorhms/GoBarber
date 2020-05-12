import { createContext } from 'react';

interface AuthContextData {
  name: string;
}

const AuthContext = createContext({} as AuthContextData);

export default AuthContext;
