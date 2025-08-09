import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddForm = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //  console.log(import.meta.env.VITE_API_URL)
  // }, [])
  

  const handleChange = (e) => {
    let val = e.target.name === "file" ? e.target.files[0] : e.target.value;
    setData((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("file", data.file);
    formData.append("price", data.price);
    formData.append("location", data.location);
    formData.append("country", data.country);

    console.log(formData);

    await axios
      .post(
        `${import.meta.env.VITE_API_URL}listings`,
        formData,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((data) => {
        // console.log(data);
        setLoading(false);
        navigate("/");
      });
  };

  return (
    <div>
      {loading && (
        <div className="loading fixed top-0 h-full w-full bg-black opacity-30"></div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full  flex flex-col items-center sm:px-0 px-2"
      >
        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          className="bg-orange-200 sm:w-1/2 w-full p-2 sm:p-4 my-4 rounded-md"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Enter description"
          name="description"
          className="bg-orange-200 sm:w-1/2 w-full p-2 sm:p-4 my-4 rounded-md"
          onChange={handleChange}
          required
        />
        <input
          type="file"
          placeholder="choose file"
          name="file"
          className="bg-orange-200 sm:w-1/2 w-full p-2 sm:p-4 my-4 rounded-md"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="enter price"
          name="price"
          className="bg-orange-200 sm:w-1/2 w-full p-2 sm:p-4 my-4 rounded-md"
          onChange={handleChange}
          required
          min={0}
        />
        <input
          type="text"
          placeholder="Enter location"
          name="location"
          className="bg-orange-200 sm:w-1/2 w-full p-2 sm:p-4 my-4 rounded-md"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Enter country"
          name="country"
          className="bg-orange-200 sm:w-1/2 w-full p-2 sm:p-4 my-4 rounded-md"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className={`w-1/3 p-2 sm:p-4 bg-amber-600 rounded-lg ${
            loading
              ? "bg-opacity-75 cursor-not-allowed "
              : "bg-opacity-100 hover:bg-amber-700"
          }`}
          disabled={loading}
        >
          {loading ? "submitting..." : "submit"}
        </button>
      </form>
    </div>
  );
};

export default AddForm;
