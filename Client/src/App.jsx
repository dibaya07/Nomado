import "./App.css";
import Home from "./components/Home";
import Listings from "./components/Listings";
import Navbar from "./components/Navbar";
// import Searchbar from './components/SearchBar'
import AddForm from "./components/AddForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import MainNavigation from "./components/MainNavigation";
import ListingItem from "./components/ListingItem";
import Edit from "./components/Edit";
import AuthForm from "./components/AuthForm";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./components/Context";

function App() {
    const { setIsLogin,setAllListings } = useContext(AuthContext);


  const getAllListings = async () => {
    let res = await axios.get(`${import.meta.env.VITE_API_URL}/listings`) 
    setIsLogin(res.data.isToken)
      setAllListings(res.data.val);
  };

  useEffect(() => {
    getAllListings();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainNavigation />,
      children: [
        // { path: "/", element: <Home />, loader: getAllListings },
        { path: "/", element: <Home />},
        { path: "/add-list", element: <AddForm /> },
        { path: "/listingItem", element: <ListingItem /> },
        { path: "/edit/:id", element: <Edit /> },
        { path: "/authForm", element: <AuthForm /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

    // let allListings = [];
    // console.log(res.data.isToken)
    // console.log(res.data.val)