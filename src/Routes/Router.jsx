import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../Layout/Dashboard";
import Error from "../Pages/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <Signup></Signup>
            },
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>
    },
    {
        path: '*',
        element: <Error></Error>
    }
]);