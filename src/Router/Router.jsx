import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Components/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/register";

export const router = createBrowserRouter([
  {
    path: "/",
   Component:RootLayout, 
   children:[
    {
      index:true,
      Component:Home,
    }
   ]
  },
  {
    path:"/login",
    Component:Login
  },
  {
    path:"/register",
    Component:Register,
  }

]);