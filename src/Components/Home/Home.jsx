import { Link } from 'react-router-dom';
import banner from '/Banner.jpg'
import useAuth from '../Hook/useAuth';


const Home = () => {
    const { user } = useAuth()

    // Check if the user is a new user by checking localStorage
    const isNewUser = !localStorage.getItem('hasLoggedIn');

    const handleExploreClick = () => {
        // Set a flag in localStorage to indicate that the user has logged in
        localStorage.setItem('hasLoggedIn', 'true');
    };

    return (
        <div className="hero h-[140px] lg:h-[700px] " style={{ backgroundImage: `url(${banner})` }}>
            <div className="hero-content text-center text-neutral-content">
                {
                    user ? <div className="lg:mt-52 mt-16 mr-12 lg:mr-96">
                        <Link to='/dashboard/target'>
                            <button onClick={handleExploreClick} className="p-1 lg:p-3 rounded-lg text-[#04364A] bg-[#00FFF7] text-lg">Explore More</button>
                        </Link>
                       

                    </div> :
                        <div className="lg:mt-52  lg:mr-96">
                            <Link to='/login'>
                                <button className="p-1 lg:p-2 text-[#04364A] bg-[#00FFF7] text-lg">Explore More</button>
                            </Link>

                        </div>
                }


            </div>
        </div>
    );
};

export default Home;