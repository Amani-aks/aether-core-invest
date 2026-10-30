import React, { createContext, useContext } from 'react';
const AuthContext = createContext();
const user = { id: 'demo', full_name: 'Demo User', email: 'demo@example.com', role: 'admin' };
export const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={{
    user, isAuthenticated: true, isLoadingAuth: false, isLoadingPublicSettings: false,
    authError: null, appPublicSettings: null, authChecked: true,
    logout: () => {}, navigateToLogin: () => {}, checkUserAuth: async () => {}, checkAppState: async () => {},
  }}>{children}</AuthContext.Provider>
);
export const useAuth = () => useContext(AuthContext);
