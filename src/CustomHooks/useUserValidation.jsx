import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";

const useUserValidation = () => {
  const [isLoading, setisLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const validationFunc = async () => {
    setisLoading(true);
    try {
      const response = await fetch("/api/v1/user/validation", {
        method: "get",
        // credentials: "include",
      });

      if (!response.ok) {
        setUser({
          userId: null,
          username: null,
          signedInWithGoogle: false,
          isAuthentic: false,
        });
        console.log("User not signed in");
        return;
      }

      // try solving by a loading state

      // const text = await response.text();

      // console.log(text);
      const { user } = await response.json();
      const { userId, username } = user;

      setUser({
        userId,
        username,
        isAuthentic: true,
        signedInWithGoogle: false,
      });
    } catch (error) {
      console.log("There was an error, ", error);
    }
    setisLoading(false);
  };

  useEffect(() => {
    validationFunc();
  }, []);

  return { user, isLoading };
};

export default useUserValidation;
