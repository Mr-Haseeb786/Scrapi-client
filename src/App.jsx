import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Navbar from "./Components/Navbar";
import ProductsPage from "./Pages/ProductsPage";
import FavouritesPage from "./Pages/FavouritesPage";
import Login from "./Components/Login";
import Signin from "./Components/Signin";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <main>
      <Navbar />
      <div className=''>
        <Routes>
          <Route path='/' element={<ProductsPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<Signin />} />
          <Route element={<ProtectedRoutes />}>
            <Route path={"/user/favourites"} element={<FavouritesPage />} />
          </Route>
          <Route path='*' element={<h2>Seriously?...</h2>} />
        </Routes>
      </div>
      <footer className='bg-slate-950 h-20 text-white text-4xl'>
        <div className='section-center'>
          <h2>This is a footer</h2>
        </div>
      </footer>
    </main>
  );
}

export default App;
