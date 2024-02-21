import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import login from '../login.json'
import { useState } from "react";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import logo from '/Logo2-removebg-preview.png'

const Login = () => {

    const { loginUser, signInWithGoogle } = useAuth()
    const [signError, setSignError] = useState();
    const [signSuccess, setSignSuccess] = useState();
    const registerNavi = useNavigate()

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        setSignError(" ");
        setSignSuccess(" ");

        if (password.length < 6) {
            setSignError(" Password should be at least 6 characters ")
            return;
        } else if (!/[A-Z]/.test(password)) {
            setSignError('you should use one uppercase character.')
            return;
        } else if (!/[!@#$%^&*]/.test(password))
            setSignError('you should a special character')

        loginUser(email, password)
            .then(result => {

                console.log(result);

                setSignSuccess("User logged in successfully!")
                e.target.reset()
                registerNavi('/');
                Swal.fire({
                    icon: "success",
                    title: "Sign In Successful",
                    text: "You have successfully signed in!",
                });

            })
            .catch(error => {
                console.error(error);
                setSignError(error.message);
                Swal.fire({
                    icon: "error",
                    title: "Sign In Failed",
                    text: "An error occurred during sign in. Please try again.",
                });

            })



    }

    const handleGoogle = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                registerNavi('/');
                Swal.fire({
                    icon: "success",
                    title: "Sign In Successful",
                    text: "You have successfully signed in!",
                });
            })

            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Sign In Failed",
                    text: "An error occurred during sign in. Please try again.",
                })


            })
    }
    return (
        <div className="hero" >
            <div className="lg:flex gap-96 my-20 justify-around ">
                <div className='lg:w-[500px] w-[300px]'>
                    <Lottie animationData={login}></Lottie>
                </div>
                <div className="card w-[700px] max-w-sm mt-20 text-[#DAFFFB] bg-[#176B87] py-10 px-10 rounded-xl">
                    <div className='lg:flex items-center'>
                        <img className='w-28' src={logo} alt="" />
                        <div className='text-2xl lg:mb-4'>Welcome Back <br />
                            Login to continue</div>
                    </div>
                    <form onSubmit={handleLogin} className="">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered " required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered " required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div>
                            <p className='text-center text-[#DAFFFB]'>
                                New Here? Please <Link to='/register'> <span className='hover:text-[#04364A]'>Register</span></Link>
                            </p>
                        </div>
                        <div className="form-control mt-6">

                            <input type="submit" value="Login" className=" lg:p-3 p-2 text-white bg-[#04364A] rounded-lg btn-outline hover:bg-hoverclr " />
                        </div>
                        <div className="mt-4 gap-10">
                            <button onClick={handleGoogle} type="button" className="lg:w-[305px] w-[305px] py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-redclr text-white shadow-sm align-middle hover:bg-hoverclr focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                                    <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                                    <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                                    <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                                    <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
                                </svg>
                                Login with Google
                            </button>
                        </div>

                    </form>
                    {
                        signError && <p className="mx-8 text-red-600">{signError}</p>
                    }
                    {
                        signSuccess && <p className="mx-8 text-green-600">{signSuccess}</p>
                    }

                </div>
            </div>
        </div>
    );
};

export default Login;