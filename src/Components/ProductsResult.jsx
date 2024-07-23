import React, { useState } from "react";
import ProductSpecialStat from "./ProductSpecialStat";
import { products } from "./tempAsset";
import { Link } from "react-router-dom";

const ProductsResult = () => {
  let productsArry = products;

  let highestRatedProdID = null;
  let highestRating = 0;

  let lowestPriceProdID = null;
  let lowestPrice = 99999;

  let mostReviewdProdID = null;
  let mostReviews = 0;

  productsArry.forEach((prod) => {
    if (highestRating < parseFloat(prod.ratings)) {
      highestRating = parseFloat(prod.ratings);
      highestRatedProdID = prod.id;
    }

    if (lowestPrice > prod.price) {
      lowestPrice = prod.price;
      lowestPriceProdID = prod.id;
    }

    if (mostReviews < prod.reviews) {
      mostReviews = prod.reviews;
      mostReviewdProdID = prod.id;
    }
  });

  if (productsArry.length === 0) {
    return (
      <article className='grid place-items-center my-16 w-[400px] mx-auto min-h-60 bg-gray-200 rounded-md py-4 px-3'>
        <h2 className='text-zinc-500 italic'>Search for Products</h2>
      </article>
    );
  }

  return (
    <article className='grid grid-cols-3 place-items-center gap-4 my-16 max-w-5xl mx-auto min-h-60 bg-gray-200 rounded-md py-4 px-3 relative'>
      {productsArry.map((product) => {
        let showHighRatedStat = false;
        let showLowestPriceStat = false;
        let showMostReviewdStat = false;

        if (highestRatedProdID === product.id) {
          showHighRatedStat = true;
        }

        if (lowestPriceProdID === product.id) {
          showLowestPriceStat = true;
        }

        if (mostReviewdProdID === product.id) {
          showMostReviewdStat = true;
        }

        return (
          <div
            className='card card-compact bg-base-100 w-80 shadow-xl relative'
            data-produid={`${product.id}`}
            key={product.id}
          >
            <span className='bg-slate-300 max-w-max p-3 absolute top-0 left-0 cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='20'
                width='20'
                viewBox='0 0 512 512'
              >
                <path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z' />
              </svg>
            </span>
            <figure>
              <img
                src='https://m.media-amazon.com/images/I/71ysHVMH4FL._AC_SX679_.jpg'
                alt='Shoes'
                className='px-2 py-3'
              />
            </figure>
            <div className='card-body'>
              <p className='card-title max-w-64 truncate inline-block'>
                {product.name}
              </p>
              <p>$ {product.price}</p>
              <div className='flex justify-between'>
                <p>{product.ratings}</p>
                <p className='text-right'>Reviews: {product.reviews}</p>
              </div>
              <div className='card-actions justify-end'>
                <Link to={`${"/"}`} className='btn btn-primary'>
                  Visit Product
                </Link>
              </div>
            </div>
            {showHighRatedStat && (
              <div className='absolute top-4 right-0'>
                <ProductSpecialStat
                  title={"Most Rated"}
                  bgClr='bg-yellow-500'
                />
              </div>
            )}
            {showLowestPriceStat && (
              <div className='absolute top-4 right-0'>
                <ProductSpecialStat
                  title={"Lowest Price"}
                  bgClr='bg-green-500'
                />
              </div>
            )}
            {showMostReviewdStat && (
              <div className='absolute top-4 right-0'>
                <ProductSpecialStat title={"Most Reviewed"} bgClr='bg-accent' />
              </div>
            )}
          </div>
        );
      })}
    </article>
  );
};

export default ProductsResult;
