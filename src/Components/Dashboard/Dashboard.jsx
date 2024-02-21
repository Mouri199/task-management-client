import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import logo from '/logo.png'

const Dashboard = () => {

    const { user } = useAuth()

    // Check if the user is a new user by checking localStorage

    return (
        <div className="flex">
            <div className="text-[#DAFFFB] p-4 w-64 min-h-screen bg-[#176B87]">

                <div>
                    <ul>
                        <Link to='/'><img className="rounded-full w-[120px]" src={logo} alt="" /></Link>
                        <li className="py-3">
                            <Link to='/dashboard/target'>Dashboard</Link>

                        </li>
                        <li  >
                            <Link to='/dashboard/profile'>User Profile</Link>
                        </li>
                        <li className="py-3">
                            <Link to='/dashboard/mywork'>Task Management</Link>
                        </li>

                        <div className="divider"></div>
                        <li className="py-3">
                            <NavLink to="/">

                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/order/contactus">

                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>

            </div>
           

            <div>


                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;