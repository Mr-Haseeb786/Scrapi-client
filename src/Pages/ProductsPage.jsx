import React, { useState } from "react";
import ProductsResult from "../Components/ProductsResult";
import styles from "./Products.module.css";
import Toast from "../Components/ErrorToast";

const ProductsPage = () => {
  // const [prodInfo, setProdInfo] =

  const [highPrice, setHighPrice] = useState(1000);
  const [lowPrice, setLowPrice] = useState(500);
  const [currency, setCurrency] = useState("DOLLAR");
  const [searchItem, setSearchItem] = useState("");

  const [amazonSelect, setAmazonSelect] = useState(false);
  const [aliexpSelect, setAliexpSelect] = useState(false);

  const [products, setProducts] = useState([]);

  const [fieldsError, setFieldsError] = useState(false);
  const [lessSearchChars, setLessSearchChars] = useState(false);
  const [selectedSitesError, setSelectedSitesError] = useState(false);

  const searchForProducts = async (e) => {
    e.preventDefault();

    if (!highPrice || !lowPrice || !currency || !searchItem) {
      return setFieldsError(true);
    }

    if (searchItem.length < 2) {
      return setLessSearchChars(true);
    }

    if (!amazonSelect && !aliexpSelect) {
      return setSelectedSitesError(true);
    }

    let sitesToSearch = [];

    if (amazonSelect) sitesToSearch.push("AMAZON");
    if (aliexpSelect) sitesToSearch.push("ALIEXPRESS");

    const reqParams = {
      priceLimits: {
        highPrice,
        lowPrice,
      },
      currency,
      itemToSearch: searchItem,
      sitesToSearch,
    };

    // console.log(reqParams);
    // api call

    let response = null;
    try {
      response = await fetch("api/v1/products/search-products", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqParams),
      });

      response = await response.json();
    } catch (error) {
      response = null;
      console.log("Error " + error);
    }

    if (response) {
      if (response.commulativeProds) {
        setProducts(response.commulativeProds);
      }
    }
  };

  console.log(products);

  return (
    <section className=''>
      {fieldsError && (
        <Toast
          msg={"Please fill in all fields"}
          category={"error"}
          resetFunc={setFieldsError}
        />
      )}
      {selectedSitesError && (
        <Toast
          msg={"Select Atleast One Website to Search from"}
          category={"error"}
          resetFunc={setSelectedSitesError}
        />
      )}
      {lessSearchChars && (
        <Toast
          msg={"Enter Atleast two Characters in the Search Field"}
          category={"error"}
          resetFunc={setLessSearchChars}
        />
      )}
      <section className='mt-8 section-center'>
        <form
          onSubmit={searchForProducts}
          className={`${styles.getInfoSection}`}
        >
          <label
            className={`input input-bordered flex items-center gap-2 pr-0 justify-center grow max-w-2xl min-w-[36rem] ${styles.searchInputField}`}
          >
            <input
              type='text'
              className='grow'
              placeholder='Search'
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <button
              className='bg-orange-300 h-full w-11 text-center'
              // onClick={() => searchForProducts()}
              type='submit'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='h-full w-6 opacity-70 mx-auto'
              >
                <path
                  fillRule='evenodd'
                  d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </label>
          <div className={`flex items-center gap-4 ${styles.priceLimits}`}>
            <div className='input input-bordered flex items-center pl-0'>
              <select
                className='bg-transparent h-full rounded-l-sm px-1 text-lg cursor-pointer'
                onChange={(e) => console.log(e.target.value)}
              >
                <option value={"RUPPEE"}>Rs</option>
                <option value={"DOLLAR"}>$</option>
                <option value={"POUND"}>£</option>
              </select>
              <input
                type='number'
                placeholder='Min'
                className=' w-full max-w-24 text-center'
                value={lowPrice}
                onChange={(e) => setLowPrice(e.target.value)}
              />
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height={14}
              width={12.5}
              viewBox='0 0 448 512'
            >
              <path d='M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z' />
            </svg>
            <input
              type='number'
              placeholder='Max'
              className='input input-bordered w-full max-w-36 text-center'
              value={highPrice}
              onChange={(e) => setHighPrice(e.target.value)}
            />
          </div>
          <h2 className={`${styles.siteChoiceHeading} mt-6 text-2xl font-bold`}>
            Select websites to search from
          </h2>
          <div
            className={`form-control ${styles.sitesToScrap} flex flex-row justify-evenly gap-4`}
          >
            <label className='cursor-pointer label'>
              <div>
                <img src='' alt='' />
                <span className='label-text mr-2'>Amazon</span>
              </div>
              <input
                type='checkbox'
                checked={amazonSelect}
                onChange={(e) => setAmazonSelect(e.target.checked)}
                className='checkbox checkbox-accent'
              />
            </label>
            <label className='cursor-pointer label'>
              <div>
                <img src='' alt='' />
                <span className='label-text mr-2'>Aliexpress</span>
              </div>
              <input
                type='checkbox'
                checked={aliexpSelect}
                onChange={(e) => setAliexpSelect(e.target.checked)}
                className='checkbox checkbox-accent'
              />
            </label>
            <label className='cursor-pointer label'>
              <div>
                <img src='' alt='' />
                <span className='label-text mr-2'>Amazon</span>
              </div>
              <input type='checkbox' className='checkbox checkbox-accent' />
            </label>
          </div>
        </form>
        <ProductsResult />
      </section>
    </section>
  );
};

export default ProductsPage;
