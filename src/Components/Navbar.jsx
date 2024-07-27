import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const Navbar = () => {
  const { isAuthenticated, user: userAtuh0, logout } = useAuth0();

  const { user, setUser } = useContext(UserContext);
  const { username, isAuthentic } = user;

  const logoutUser = async () => {
    if (user.signedInWithGoogle) {
      logout();
    }

    try {
      const resp = await fetch("/api/v1/user/signout", {
        method: "get",
      });

      console.log(resp);

      setUser({
        userId: null,
        username: null,
        isAuthentic: false,
        signedInWithGoogle: false,
      });

      if (!resp.ok) return console.log("Error Logging out");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className='navbar bg-neutral text-zinc-300'>
      <div className='navbar-start'>
        <Link to={"/"} className='btn btn-ghost text-xl '>
          Scrapi
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1 text-lg'>
          <li>
            <Link to={"/"}>Search Products</Link>
          </li>
          {isAuthentic && (
            <li>
              <Link to={"/user/favourites"}>Favourites Page</Link>
            </li>
          )}
        </ul>
      </div>
      <div className='navbar-end'>
        {isAuthentic ? (
          <div className='dropdown dropdown-end'>
            <div tabIndex={0} role='button' className='btn m-1'>
              <span>Hey, {user?.username} </span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='18'
                width='16'
                viewBox='0 0 448 512'
              >
                <path d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z' />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-neutral border-2 border-slate-400 rounded-box z-[1] w-52 p-2 shadow'
            >
              <li>
                <Link to={"/user/favourites"} className='link-accent'>
                  Favourites
                </Link>
              </li>
              <li className='link-accent'>
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to={"/signin"} className='btn'>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
