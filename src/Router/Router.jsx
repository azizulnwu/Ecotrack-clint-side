import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Components/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/register";
import AddChallenges from "../Components/AdminComponent/AddChallenges";
import ForgotPassword from "../Pages/ForgetPassword/ForgotPassword";

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
  },
  {
    path:"/addChallenges",
    element:<AddChallenges></AddChallenges>
  },
  {
    path:"/forgotPassword",
    element:<ForgotPassword></ForgotPassword>
  }

]);