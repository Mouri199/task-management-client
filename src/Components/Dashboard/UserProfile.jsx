import  { useEffect, useState } from 'react';
import useAuth from '../Hook/useAuth';

const UserProfile = () => {
    const { user, load } = useAuth()
    const [userData, setUserData] = useState(null);
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
        <div>
            <div className="lg:w-[1000px]">
                <div className="lg:flex justify-between items-end px-10 lg:px-20">
                    <div className="lg:flex lg:items-end lg:gap-10">
                        <img className="lg:w-[300px] w-[100px]" src={user?.photoURL} alt="" />
                        <h3 className="lg:text-3xl font-bold">{user?.displayName}</h3>
                    </div>


                    <button className="bg-redclr text-lg rounded-lg lg:p-1" onClick={() => document.getElementById('my_modal_1').showModal()}>Edit Profile</button>
                    {/* <dialog id="my_modal_1" className="modal  modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <input type="text" className='text-white' defaultValue={userData?._id} {...register("id")} />
                                <div className="flex gap-10 ">
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Full Name</span>
                                        </label>
                                        <label>
                                            <input type="text" readOnly defaultValue={user.displayName} name="photo" {...register("name")} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <label>
                                            <input type="text" readOnly defaultValue={user.email} name="photo" {...register("email")} className="input input-bordered w-full" />
                                        </label>
                                    </div>

                                </div>
                                <div className="flex gap-10 ">
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">District</span>
                                        </label>
                                        <label>
                                            <input type="text" defaultValue={userData?.district} name="photo" {...register("district")} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Upazila</span>
                                        </label>
                                        <label>
                                            <input type="text" name="photo" defaultValue={userData?.upazila} {...register("upazila")} className="input input-bordered w-full" />
                                        </label>
                                    </div>

                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Blood Group</span>
                                    </label>
                                    <label>
                                        <input type="text" name="photo" defaultValue={userData?.blood} {...register("blood")} className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <input type="submit" value="Update Profile" className="btn bg-redclr mx-auto  hover:bg-hoverclr w-full my-10" />

                            </form>
                            <div className="modal-action">

                                <form method="dialog">

                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog> */}
                </div>

                <div>
                    {userData && (


                        <div key={userData._id} className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-xs text-gray-900 uppercase ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">

                                        </th>
                                        <th scope="col" className="px-6 py-3">

                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white ">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            Full Name
                                        </th>
                                        <td className="px-6 py-4">
                                            {userData.name}
                                        </td>
                                    </tr>
                                    <tr className="bg-white ">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            Email
                                        </th>
                                        <td className="px-6 py-4">
                                            {userData.email}
                                        </td>
                                    </tr>
                                

                                </tbody>
                            </table>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;