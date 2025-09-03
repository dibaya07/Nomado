import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./ListingItem.css";

export default function ListingItem() {
  const location = useLocation();
  const { itemId } = location.state || {};
  const [listing, setListing] = useState({});
  const [reviews, setReviews] = useState({});
  const [allReviews, setAllReviews] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        await axios
          .get(`${import.meta.env.VITE_API_URL}/user/owner`, {
            withCredentials: true,
          })
          .then((res) => {
            setCurrentUser(res.data.id);
          });
      } catch (err) {
        console.log("getUser" + err);
      }
    };
    getUser();
  }, []);

  const item = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/listings/${itemId}`)
      .then((res) => {
        setListing(res.data);
      });
  };

  useEffect(() => {
    item();
  }, []);

  const handleDelete = async () => {
    await axios
      .delete(`${import.meta.env.VITE_API_URL}/listings/${itemId}`, {
        withCredentials: true,
      })
      .then(() => {
        console.log("listing deleted");
        navigate("/");
      });
  };

  // const [rating, setRating] = useState("0")

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
      <div className="listing px-2 sm:px-32 w-full">
        <div className="heading  py-6 font-medium sm:font-medium text-lg sm:text-4xl">
          {listing.title}
        </div>
        <div className="img flex flex-col sm:flex-row w-full h-80 overflow-hidden ">
          {listing.image?.url && (
            <>
              <span className="img flex h-full w-full sm:w-1/2 overflow-hidden py-2 px-2">
                <img
                  className="rounded-xl object-cover  w-full h-full "
                  src={listing.image?.url}
                  alt="imgae"
                />
              </span>
              <span className="img flex overflow-hidden sm:w-1/2 w-full flex-wrap ">
                <img
                  className="rounded-xl w-1/2 h-1/2 object-cover p-2"
                  src={listing.image?.url}
                  alt="imgae"
                />
                <img
                  className="rounded-xl  w-1/2 h-1/2 object-cover  p-2"
                  src={listing.image?.url}
                  alt="imgae"
                />
                <img
                  className="rounded-xl  w-1/2 h-1/2 object-cover  p-2"
                  src={listing.image?.url}
                  alt="imgae"
                />
                <img
                  className="rounded-xl  w-1/2 h-1/2 object-cover  p-2"
                  src={listing.image?.url}
                  alt="imgae"
                />
              </span>
            </>
          )}
        </div>
        <div className="details">
          <p className="my-4">
            <b>Listed by: </b> {listing.owner?.username}
          </p>
          <p className="my-4">
            <b>Description: </b> {listing.description}
          </p>
          <p className="my-4">
            <b>Price:</b> {listing.price}
          </p>
          <p className="my-4">
            <b>Location: </b>
            {listing.location}
          </p>
          <p className="my-4">
            <b>Country: </b>
            {listing.country}
          </p>
          {listing?.owner?._id === currentUser && (
            <>
              <Link
                to={`/edit/${itemId}`}
                className="bg-red-300 py-2 px-4 rounded-lg mx-1"
              >
                Edit
              </Link>

              <button
                className="bg-red-300 py-2 px-4 rounded-lg mx-1"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>

        <div className="review-heading py-6 font-medium text-4xl">Reviews</div>
        <div className="allReviews flex ">
          {allReviews.map((item, index) => {
            return (
              <div
                className="reviews flex flex-col w-1/2 px-3 py-8"
                key={index}
              >
                <span>{item.owner?.username}</span>

                
              {item.rating &&  <p className="starability-result" data-rating={item.rating}>
                  Rated: 3 stars
                </p>}
                {/* {console.log(item._id)} */}
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
            className="bg-green-400"
            onClick={handleReviewSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
