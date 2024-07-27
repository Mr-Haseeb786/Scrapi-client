import React, { useState } from "react";
import ProductsResult from "../Components/ProductsResult";
import useUserValidation from "../CustomHooks/useUserValidation";

const FavouritesPage = () => {
  // const { user } = useUserValidation();
  console.log("fav page");
  // console.log(user);
  console.log("end fav page");

  const [products, setProducts] = useState([]);
  return (
    <section className='section-center'>
      <article>
        <h2 className='text-2xl font-semibold text-center my-8'>
          Your Favourites
        </h2>
        <ProductsResult />
      </article>
    </section>
  );
};

export default FavouritesPage;
