
import { Link, NavLink } from 'react-router-dom';
import logo from '/logo.png'
import useAuth from '../Hook/useAuth';
const Navbar = () => {

    const { user, logoutUser } = useAuth()

    const handleLogOut = () => {
        logoutUser()
            .then(() => console.log("You logged out successfully"))
            .catch(error => console.error(error))
    }


    return (
        // <div>
        //     <img src={logo} alt="" />
        // </div>

        < div className="relative">
            <div className=" lg:block bg-[#04364A] hidden text-white py-2">
                <div className=" text-[#DAFFFB] flex items-center justify-around gap-10">

                    <div>
                        <img className="rounded-full w-[120px]" src={logo} alt="" />
                    </div>


                    <div className='flex gap-20 text-2xl'>
                        <NavLink to="/">


                            Home

                        </NavLink>
                        <NavLink to="/aboutus">


                            About Us

                        </NavLink>
                        <NavLink to="/contact">


                            Contact

                        </NavLink>

                    </div>


                    <div className="flex ">
                        {user ?
                            <>

                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="" src={user.photoURL} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#176B87] text-lg text-[#DAFFFB] rounded-box w-52">
                                        <li>
                                            {user.displayName}
                                        </li>
                                        <NavLink to='/dashboard/target'>DashBoard</NavLink>
                                        <NavLink onClick={handleLogOut}> Log Out</NavLink>
                                    </ul>
                                </div>
                            </>
                            : <NavLink to='/login ' className={"lg:p-2 p-1 mr-2 lg:text-xl text-sm rounded-lg bg-red text-white hover:bg-hoverclr bg-redclr lg:block"}>
                                Login</NavLink>}
                    </div>

                </div>

            </div>

            <div className="drawer absolute lg:hidden">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button text-4xl lg:hidden">

                        <i className="fa-solid fa-bars"></i>
                    </label>
                </div>
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-[#176B87] text-white gap-3">
                        <Link smooth={true} to="home">


                            Home

                        </Link>
                        <Link smooth={true} to="about">


                            About

                        </Link>
                        <Link smooth={true} to="services">


                            Services

                        </Link>
                        <Link smooth={true} to="project">


                            Projects

                        </Link>
                        <Link smooth={true} to="education">


                            Education

                        </Link>
                        <Link smooth={true} to="contact">


                            Contact

                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;