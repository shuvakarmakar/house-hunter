import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../Layout/Dashboard";
import Error from "../Pages/Error";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
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