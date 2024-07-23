import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const userDefault = {
    userId: null,
    userName: null,
    isAuthentic: false,
  };

  const [user, setUser] = useState(userDefault);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
