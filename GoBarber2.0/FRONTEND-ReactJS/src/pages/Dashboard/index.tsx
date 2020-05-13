import React from 'react';
import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <h1>
      DASHBOARD
      <button type="button" onClick={signOut}>
        Sair
      </button>
    </h1>
  );
};

export default Dashboard;
