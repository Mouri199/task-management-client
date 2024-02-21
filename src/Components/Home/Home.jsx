import { Link } from 'react-router-dom';
import banner from '/Banner.jpg'
import useAuth from '../Hook/useAuth';
import Lottie from 'lottie-react';
import ani from '../animation.json'


const Home = () => {
    const { user } = useAuth()

    // Check if the user is a new user by checking localStorage
    const isNewUser = !localStorage.getItem('hasLoggedIn');

    const handleExploreClick = () => {
        // Set a flag in localStorage to indicate that the user has logged in
        localStorage.setItem('hasLoggedIn', 'true');
    };

    return (
        <div>
            <div className="hero h-[140px] lg:h-[700px] " style={{ backgroundImage: `url(${banner})` }}>
                <div className="hero-content text-center text-neutral-content">
                    {
                        user ? <div className="lg:mt-52 mt-16 mr-12 lg:mr-96">
                            <Link to='/dashboard/target'>
                                <button onClick={handleExploreClick} className="p-1 lg:p-3 rounded-lg text-[#04364A] bg-[#00FFF7] z-10 text-lg">Explore More</button>
                            </Link>


                        </div> :
                            <div className="lg:mt-52  lg:mr-96">
                                <Link to='/login'>
                                    <button className="p-1 lg:p-3 rounded-lg text-[#04364A] bg-[#00FFF7] z-10 text-lg">Explore More</button>
                                </Link>

                            </div>
                    }


                </div>


            </div>
            <div className='lg:flex items-center justify-around '>
                <div className='text-[#DAFFFB]'>
                    <h1 className='lg:text-5xl lg:mx-0 mx-5 text-xl my-10 font-medium'>   Build a more productive and
                        <br /> efficient company</h1>
                    <p className='lg:text-xl lg:mx-0 mx-5'> Focus on what matters</p>
                    <br />
                    <p className='lg:text-xl lg:mx-0 mx-5' > Quickly know what’s happening</p>
                    <br />
                    <p className='lg:text-xl lg:mx-0 mx-5' > Make informed decisions</p>
                    <br />
                    <p className='lg:text-xl lg:mx-0 mx-5'> Align and organize your team</p>
                    <br />
                    <p className='lg:text-xl lg:mx-0 mx-5'> Engage and inspire
                    </p>
                    <br />
                    <p className='lg:text-xl lg:mx-0 mx-5'> Measure satisfaction</p>
                </div>
                <div className='lg:w-[700px]'>
                    <Lottie animationData={ani}></Lottie>
                </div>
            </div>
            <div>
                {
                    user ? <div className=" lg:ml-28 ">
                        <Link to='/dashboard/target'>
                            <button onClick={handleExploreClick} className="p-1 lg:p-3 rounded-lg text-[#04364A] bg-[#00FFF7] text-lg">Explore More</button>
                        </Link>


                    </div> :
                        <div className=" lg:ml-28 ">
                            <Link to='/login'>
                                <button className="p-1 lg:p-3 rounded-lg text-[#04364A] bg-[#00FFF7] text-lg">Explore More</button>
                            </Link>

                        </div>
                }
            </div>
        </div>
    );
};

export default Home;