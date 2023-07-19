import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../Layout/Dashboard";
import Error from "../Pages/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import ManageHouse from "../Pages/Dashboard/OwnerDashboard/ManageHouse";
import AddHouse from "../Pages/Dashboard/OwnerDashboard/AddHouse";
import ManageBookings from "../Pages/Dashboard/RenterDashboard/ManageBookings";

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
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // Owner Route
            {
                path: "manageHouses",
                element: <ManageHouse></ManageHouse>
            },
            {
                path: "addhouse",
                element: <AddHouse></AddHouse>
            },
            // Renter Route
            {
                path: "managebookings",
                element: <ManageBookings></ManageBookings>
            }
        ]
    },

    {
        path: '*',
        element: <Error></Error>
    }
]);