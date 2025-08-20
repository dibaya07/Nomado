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
    const { isLogin, setIsLogin, token, setToken,allListings,setAllListings } = useContext(AuthContext);


  const getAllListings = async () => {
    // let allListings = [];
   let res = await axios.get(`${import.meta.env.VITE_API_URL}/listings`) 
      // console.log(res.data.isToken)
      setIsLogin(res.data.isToken)
      // console.log(res.data.val)
      setAllListings(res.data.val);
    
    // return allListings;
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
