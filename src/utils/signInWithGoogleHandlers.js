export const registerUserWithGoogle = async (
  username,
  email,
  password,
  signedInWithGoogle,
  logoutFromGoogle,
  setError
) => {
  try {
    const resp = await fetch("/api/v1/user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!resp.ok) {
      const { error } = await resp.json();
      console.log(error);
      setError(error);

      if (signedInWithGoogle) logoutFromGoogle();

      return;
    }
  } catch (error) {
    console.log(error);
  }

  return;
};

export const signInUserWithGoogle = async (email, password, setUser) => {
  try {
    const resp = await fetch("/api/v1/user/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        signedInWithGoogle: true,
      }),
    });

    if (resp.status === 401) {
      const { error } = await resp.json();
      console.log(error);
      return resp.status;
    }

    const { userInfo } = await resp.json();
    const { userId, username } = userInfo;

    setUser({ userId, username, isAuthentic: true, signedInWithGoogle: true });

    return 200;
  } catch (error) {
    console.log(error);
  }
};
