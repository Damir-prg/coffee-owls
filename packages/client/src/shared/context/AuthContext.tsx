import { ReactNode, createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

type TAuthProviderProps = {
  children: ReactNode;
};

type TAuthContext = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const emptyFunc = () => {
  // Установка пустой функции для setIsLoggedIn, чтобы предотвратить ошибки
};

const AuthContext = createContext<TAuthContext>({
  isLoggedIn: false,
  setIsLoggedIn: emptyFunc,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: TAuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>;
};
