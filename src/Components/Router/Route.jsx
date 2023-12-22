import {
    createBrowserRouter
} from "react-router-dom";
import Home from "../Home/Home";
import MainBody from "../MainBody/MainBody";
import Login from "../Login/Login";
import Register from "../Register/Register";
import AboutUs from "../About Us/AboutUs";
import Contact from "../Contact/Contact";
import Dashboard from "../Dashboard/Dashboard";
import TargetAudience from "../Dashboard/TargetAudience";
import MyWork from "../Dashboard/MyWork";
import WorkDetails from "../Dashboard/WorkDetails";
import UserProfile from "../Dashboard/userProfile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainBody></MainBody>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/aboutus',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },

            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/dashboard/target',
                element: <TargetAudience></TargetAudience>
            },
            {
                path: '/dashboard/mywork',
                element: <MyWork></MyWork>,

            },
            {
                path: '/dashboard/profile',
                element: <UserProfile></UserProfile>
            },
            {
                path: '/dashboard/wrokdetails/:id',
                element: <WorkDetails></WorkDetails>,
                loader: ({ params }) => fetch(`https://task-management-server-silk.vercel.app/workdatas/${params.id}`)
            }
        ]
    },

]);