import { useEffect, useState } from 'react';
import useAuth from '../Hook/useAuth';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const { user, logoutUser } = useAuth()

    const [userData, setUserData] = useState(null);

    const handleLogOut = () => {
        logoutUser()
            .then(() => console.log("You logged out successfully"))
            .catch(error => console.error(error))
    }

    useEffect(() => {
        if (user) {
            fetch(`https://task-management-server-silk.vercel.app/profile?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    // Assuming the API returns an array of users, find the one that matches the email
                    const matchedUser = data.find((userData) => userData.email === user.email);
                    setUserData(matchedUser);
                })
                .catch((error) => console.error("Error fetching data:", error));
        }
    }, [user]);
    return (
        <>

            <div className="card mt-20 lg:ml-[550px] lg:mx-0 mx-5 lg:w-96 bg-[#176B87] shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={user?.photoURL} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-[#DAFFFB]">{user?.displayName}</h2>
                    <p className='text-[#DAFFFB]' >{user?.email}</p>
                    <div className="card-actions">
                        <Link to='/'><button onClick={handleLogOut} className="btn text-[#DAFFFB] btn-primary bg-[#04364A]">Sign Out</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;