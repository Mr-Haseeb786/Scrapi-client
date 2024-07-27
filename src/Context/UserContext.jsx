import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const userDefault = {
    userId: null,
    username: null,
    signedInWithGoogle: false,
    isAuthentic: false,
  };
  const [user, setUser] = useState(userDefault);

  useEffect(() => {
    const userValidation = async () => {
      if (!user.isAuthentic) {
        try {
          const response = await fetch("/api/v1/user/validation", {
            method: "get",
            // credentials: true,
          });

          const { user } = await response.json();
          if (!user) return console.log("User not logged in");

          const { userId, username } = user;

          setUser({
            userId,
            username,
            isAuthentic: true,
            signedInWithGoogle: false,
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    console.log("UserContext useEffect");
    userValidation();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
