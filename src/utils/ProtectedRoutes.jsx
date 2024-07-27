import { Outlet, Navigate, useLocation } from "react-router-dom";
import useUserValidation from "../CustomHooks/useUserValidation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";

const ProtectedRoutes = () => {
  // const { user, isLoading } = useUserValidation();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userValidation = async () => {
      try {
        setIsLoading(true);
        const resp = await fetch("/api/v1/user/validation", {
          method: "get",
        });

        const { user } = await resp.json();

        if (!user) return console.log("User not Signed in from Prot Routes");

        const { userId, username } = user;

        // console.log(user);

        setUser({
          userId,
          username,
          isAuthentic: true,
          signedInWithGoogle: false,
        });

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    // console.log(user);
    userValidation();
  }, []);

  // console.log(user);
  // console.log("After loading", user);

  if (isLoading) return <h2>Loading...</h2>;

  return user.isAuthentic ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default ProtectedRoutes;
