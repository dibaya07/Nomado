import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Edit() {
  const [data, setData] = useState({});
  const [originalImg, setOriginalImg] = useState();
  // const location = useLocation()
  // const { itemId } = location.state || {}
  const navigate = useNavigate();
  const { id } = useParams();
  // const [listing, setListing] = useState({})

  useEffect(() => {
    // console.log(id)
    let getData = async () => {
      await axios.get(`${import.meta.env.VITE_API_URL}listings/${id}`).then((res) => {
        setData(res.data);
        const transformedImg = res.data.image?.url.replace(
          "/upload",
          "/upload/h_150,w_150"
        );
        //  console.log( res.data.image?.url)
        setOriginalImg(transformedImg);
      });
    };
    getData();
  }, []);
  // console.log(res.data)
  // useEffect(() => {
  //   setOriginalImg(originalImg.replace("/upload","/upload/h_300,w_250"))
  // }, [originalImg])

  const handleChange = (e) => {
    let val = e.target.name === "file" ? e.target.files[0] : e.target.value;
    setData((prev) => ({ ...prev, [e.target.name]: val }));
    // console.log(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`${import.meta.env.VITE_API_URL}listings/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => navigate("/"));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full  flex flex-col items-center sm:px-0 px-2 "
      >
        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          className="bg-orange-200 sm:w-1/2 w-full p-2 sm:p-4 my-4 rounded-md"
          onChange={handleChange}
          value={data.title || ""}
        />
        <input
          type="text"
          placeholder="Enter description"
          name="description"
          className="bg-orange-200 sm:w-1/2 w-full p-2 sm:p-4 my-4 rounded-md"
          onChange={handleChange}
          value={data.description || ""}
        />
        <div>
          <h3>Original Image</h3>
          <img src={originalImg} alt="original image" />
        </div>
        <input
          type="file"
          placeholder="choose file"
          name="file"
          className="bg-orange-200 sm:w-1/2 w-full p-2 sm:p-4 my-4 rounded-md"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="enter price"
          name="price"
          className="bg-orange-200 sm:w-1/2 w-full p-2 sm:p-4 my-4 rounded-md"
          onChange={handleChange}
          value={data.price || ""}
        />
        <input
          type="text"
          placeholder="Enter location"
          name="location"
          className="bg-orange-200 sm:w-1/2 w-full p-2 sm:p-4 my-4 rounded-md"
          onChange={handleChange}
          value={data.location || ""}
        />
        <input
          type="text"
          placeholder="Enter country"
          name="country"
          className="bg-orange-200 sm:w-1/2 w-full p-2 sm:p-4 my-4 rounded-md"
          onChange={handleChange}
          value={data.country || ""}
        />

        <button type="submit" className="w-1/3 p-2 sm:p-4 bg-amber-600 rounded-lg">
          submit
        </button>
      </form>
    </>
  );
}
