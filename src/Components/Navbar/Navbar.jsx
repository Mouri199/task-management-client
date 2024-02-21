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

        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full flex justify-around h-[100px] navbar bg-[#081325]">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>

                    <div className="">
                        <Link to="/"> <img data-aos="zoom-out-left" className="lg:w-[100px] w-[80px] rounded-full mx-4" src={logo} alt="" /></Link>
                    </div>



                    <div className="flex-none  hidden lg:block">

                        <ul className="menu gap-10 text-2xl font-semibold menu-horizontal ">

                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/contact">Contact Us</NavLink>
                            <NavLink to='/aboutus'>About Us</NavLink>
                        </ul>
                    </div>

                    <div className="flex ">
                        {user ?
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
                                    <NavLink to='/dashboard/profile'>Profile</NavLink>
                                    <NavLink onClick={handleLogOut}> Log Out</NavLink>
                                </ul>
                            </div>
                            : <NavLink to='/login ' className={"lg:p-2 p-1 mr-2 lg:text-xl text-sm rounded-lg bg-red text-white hover:bg-hoverclr bg-redclr lg:block"}>
                                Login</NavLink>}
                    </div>




                </div>

            </div>
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80  min-h-full bg-base-200">


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

                    <hr />

                    <br />
                    <li className='py-3'>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">Contact Us</NavLink>
                    </li>

                    <li className='py-3'>
                        <NavLink to='/aboutus'>About Us</NavLink>
                    </li>
                    <br />

                </ul>


            </div>

        </div >
    );
};

export default Navbar;