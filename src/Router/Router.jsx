import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Components/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/register";
import AddChallenges from "../Components/AdminComponent/AddChallenges";
import ForgotPassword from "../Pages/ForgetPassword/ForgotPassword";
import CardDetails from "../Components/CardSection/CardDetails";
import ErrorPage from "../Pages/ErrorPage";
import AllCards from "../Components/CardSection/AllCards";
import MyActivities from "../Components/MyActivity/MyActivities";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Pages/MyProfile";

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
  },
  {
    path:"/cardDetails/:id",
    element:<CardDetails></CardDetails>
  },
  {
    path:"/myActivities",
    element:<MyActivities></MyActivities>
  },
  {
    path:"/myProfile",
    element:<MyProfile></MyProfile>
  },
  {
    path:"*",
    Component:ErrorPage,
  }

]);