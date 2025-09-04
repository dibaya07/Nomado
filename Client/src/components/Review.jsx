import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./Context.jsx";




export default function Review({currentUser}) {
  
  const location = useLocation();
  const { itemId } = location.state || {};
  const {isLogin } = useContext(AuthContext); 
  
    const [reviews, setReviews] = useState({});
    
      const [allReviews, setAllReviews] = useState([]);
      
  const handleReviews = (e) => {
    let val = e.target.value;
    // setRating = e.target.value
    setReviews((prev) => ({ ...prev, [e.target.name]: val, listing: itemId }));
  };

  const handleReviewSubmit = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, reviews, {
        withCredentials: true,
      });
    setReviews({});
  };

    const handleReviewDelete = async (id) => {
    const res = await axios
      .delete(`${import.meta.env.VITE_API_URL}/reviews/${id}`, {
        withCredentials: true,
      });
      // console.log(res.data)
      setAllReviews(res.data.reviews)
    };
      // console.log("ln 77 review deleted");
      // .then(() => {
        // navigate("/listingItem");
      // });


      // {console.log(itemId,"ln 83")}
  useEffect(() => {
    const review = async () => {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/reviews/${itemId}`)
        .then((res) => {
          setAllReviews(res.data);
          // console.log(res.data[6].owner.username)
        });
    };
    review();
  }, [reviews]);

  return (
    <>
        <div className="review-heading py-6 font-medium text-4xl">Reviews</div>
        <div className="allReviews flex flex-wrap ">
          {allReviews.map((item, index) => {
            return (
              <div
                className="reviews flex flex-col w-1/2 px-3 py-8 border border-black border-solid"
                key={index}
              >
                <span>{item.owner?.username}</span>
              {item.rating &&  <p className="starability-result" data-rating={item.rating}>
                  Rated: 3 stars
                </p>}
                <span>{item.comment}</span>
                {item?.owner?._id === currentUser && <button
                className="bg-red-300 py-2 px-4 rounded-lg mx-1"
                onClick={()=>handleReviewDelete(item._id)}
              >
                Delete
              </button>}
              </div>
            );
          })}
        </div>
        <div className="review  text-black  h-fit p-4 flex flex-col">
          <fieldset className="starability-slot" >
            <legend>rating:</legend>
            <input
              type="radio"
              id="no-rate"
              className="input-no-rate"
              name="rating"
              value="0"
              aria-label="No rating."
                checked
                onChange={handleReviews} 
            />
            <input type="radio" id="first-rate1" name="rating" value="1" checked={reviews.rating === "1"} onChange={handleReviews} />
            <label htmlFor="first-rate1" title="Terrible">
              1 star
            </label>
            <input type="radio" id="first-rate2" name="rating" value="2" checked={reviews.rating === "2"} onChange={handleReviews}/>
            <label htmlFor="first-rate2" title="Not good">
              2 stars
            </label>
            <input type="radio" id="first-rate3" name="rating" value="3" checked={reviews.rating === "3"} onChange={handleReviews}/>
            <label htmlFor="first-rate3" title="Average">
              3 stars
            </label>
            <input type="radio" id="first-rate4" name="rating" value="4" checked={reviews.rating === "4"} onChange={handleReviews}/>
            <label htmlFor="first-rate4" title="Very good">
              4 stars
            </label>
            <input type="radio" id="first-rate5" name="rating" value="5" checked={reviews.rating === "5"} onChange={handleReviews}/>
            <label htmlFor="first-rate5" title="Amazing">
              5 stars
            </label>
          </fieldset>

          <textarea
            name="comment"
            placeholder="Add Review"
            cols={50}
            rows={5}
            className="bg-yellow-100 border-black border border-solid"
            value={reviews.comment || ""}
            onChange={handleReviews}
          ></textarea>
          <button
            type="submit"
            className="bg-green-400 disabled:opacity-75 disabled:cursor-not-allowed"
            onClick={handleReviewSubmit}
            disabled={!isLogin}
          >
            Submit
          </button>
        </div>
</>

  )
}