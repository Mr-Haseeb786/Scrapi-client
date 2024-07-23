import React, { useContext, useEffect, useState } from "react";
import Toast from "./ErrorToast";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [missingFileds, setMissingFields] = useState(false);
  const [incorrectCred, setIncorrectCreds] = useState(false);

  const { loginWithPopup, isAuthenticated, user: userInfoAuth0 } = useAuth0();
  const { user, setUser } = useContext(UserContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (userInfoAuth0 && isAuthenticated) {
      // db query to check if user exists
      // setUser({...userInfoFromDB})
      console.log("Redirecting User if already exists");
      navigate("/");

      // db query to insert user if user does not exist
      console.log("Redirecting after Insertion");
      return;
    }
    console.log("Use effect run");
  }, [userInfoAuth0, isAuthenticated]);

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithPopup();

      // if (isAuthenticated) console.log(user);
    } catch (error) {}

    // console.log("Inserting in Database");
    // console.log(user);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMissingFields(true);
      return;
    }

    // db query
    if (!email) {
      setIncorrectCreds(true);
      return;
    }

    // setUser({userId: db.userId, userName: db.userName, ... })
    // navigate("/")
  };
  return (
    <section className='section-center'>
      {missingFileds && (
        <Toast
          msg={"Please fill al Fields"}
          category={"error"}
          resetFunc={setMissingFields}
        />
      )}
      {incorrectCred && (
        <Toast
          msg={"Incorrect Email or Password"}
          category={"error"}
          resetFunc={setIncorrectCreds}
        />
      )}
      <article className='mt-8 mb-12 mx-auto'>
        <h2 className='text-2xl font-bold text-center mb-8'>Login</h2>
        <form
          onSubmit={handleLoginSubmit}
          className='max-w-xs flex flex-col gap-4 bg-neutral py-12 px-6 rounded-md mx-auto'
        >
          <label className='input input-bordered flex items-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              fill='currentColor'
              className='h-4 w-4 opacity-70'
            >
              <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
              <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
            </svg>
            <input
              type='email'
              className='grow'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              fill='currentColor'
              className='h-4 w-4 opacity-70'
            >
              <path
                fillRule='evenodd'
                d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
                clipRule='evenodd'
              />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              className='grow'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <span
              className='cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='14'
                  width='15.75'
                  viewBox='0 0 576 512'
                >
                  <path d='M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='14'
                  width='17.5'
                  viewBox='0 0 640 512'
                >
                  <path d='M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z' />
                </svg>
              )}
            </span>
          </label>
          <button type='submit' className='btn'>
            Login
          </button>
          <p className='text-white text-center'>Or</p>
          <button className='btn' type='button'>
            Create an Account
          </button>
          <button type='button' className='btn' onClick={handleLoginWithGoogle}>
            Continue With Google
          </button>
        </form>
      </article>
    </section>
  );
};

export default Signin;
