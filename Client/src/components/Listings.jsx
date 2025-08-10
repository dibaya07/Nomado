import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Listings = () => {
  const listings = useLoaderData();
  const [listingItems, setListingItems] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setListingItems(listings);
  }, [listings]);

  const handleClick = (id) => {
    navigate("/listingItem", { state: { itemId: id } });
  };

  return (
    <>
      <h2 className="text-xl sm:text-4xl font-normal tracking-wider my-2 sm:my-8 pl-8">
        All Listed Places &gt;{" "}
      </h2>
      <div className="listings flex flex-wrap justify-evenly ">
        {listingItems?.map((item) => {
          return (
            <div
              className="listing  sm:h-96 sm:w-64 h-48 w-32  m-4 pb-6 overflow-hidden"
              key={item._id}
              onClick={() => handleClick(item._id)}
            >
              <span className="img flex h-3/4 w-full ">
                <img
                  className="rounded-3xl  h-[91%] w-full"
                  src={item.image?.url}
                  alt="image"
                />
              </span>
              <div className="details flex flex-col px-3">
                <span className="text-sm font-semibold overflow-hidden h-10">{item.title}</span>
                <span className="text-sm font-semibold text-gray-500">
                  {item.price}/night
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Listings;
