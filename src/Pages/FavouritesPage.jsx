import React, { useState } from "react";
import ProductsResult from "../Components/ProductsResult";

const FavouritesPage = () => {
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
