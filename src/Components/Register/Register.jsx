import { useForm } from 'react-hook-form';
import logo from '/Logo2-removebg-preview.png'
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hook/useAxiosPublic';
import useAuth from '../Hook/useAuth';
import Swal from 'sweetalert2';
import registered from '../register.json'
import Lottie from 'lottie-react';
import { useDropzone } from 'react-dropzone';
import profile from '../profile.json'
const Register = () => {

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const axiosPublic = useAxiosPublic()
    const { createUser, updateUser, load, signInWithGoogle } = useAuth()
    const registerNavi = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = data => {
        console.log(data)

        createUser(data.email, data.password)

            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUser(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: data.photoURL,


                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset();
                                    Swal.fire({
                                        icon: "success",
                                        title: "Register Successful",
                                        text: "You have successfully registerd!",
                                    });

                                    registerNavi('/');
                                }
                            })


                    })
                    .catch(error => console.log(error))
            })


    }

    const handleGoogle = () => {
        signInWithGoogle()
            .then(result => {
                const googleSign = result.user;
                console.log(googleSign);
                const userInfo = {
                    name: googleSign.displayName,
                    email: googleSign.email,
                    


                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.googleSign.insertedId) {
                            console.log('user added to the database')
                            Swal.fire({
                                icon: "success",
                                title: "Register Successful",
                                text: "You have successfully registerd!",
                            });
                            registerNavi('/');
                        }
                    })


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
        <div className='lg:flex items-center justify-around'>
            <div className='lg:w-[700px]'>
                <Lottie animationData={registered}></Lottie>
            </div>
            <div className='mt-20 text-[#DAFFFB] bg-[#176B87] py-10 px-10 mx-4 lg:w-[500px] rounded-xl'>
                <div className='flex items-center'>
                    <img className='w-36' src={logo} alt="" />
                    <div className='text-2xl lg:mb-4'>Create Account</div>
                </div>
                <div >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input name='image' {...register("image", { required: true })} {...getInputProps()} />
                            <Lottie className='w-[100px] lg:ml-[150px]' animationData={profile}></Lottie>

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-[#DAFFFB]">Photo URL</span>
                            </label>
                            <input type="Photo" name='Photo' {...register("Photo", { required: true })} placeholder="Photo" className="input input-bordered lg:w-[400px]" />
                            {errors.Photo && <span className='text-red-800'>Photo is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-[#DAFFFB]">Email</span>
                            </label>
                            <input type="email" name='email' {...register("email", { required: true })} placeholder="email" className="input input-bordered lg:w-[400px]" />
                            {errors.email && <span className='text-red-800'>Email is required</span>}
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-[#DAFFFB]">Name</span>
                            </label>
                            <input type="text" name='name' {...register("name", { required: true, minLength: 6, maxLength: 20 })} placeholder="name" className="input input-bordered lg:w-[400px]" />
                            {errors.name && <span className='text-red-800'>Name is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-[#DAFFFB]">Password</span>
                            </label>
                            <input type="password" name='password' {...register("password", { required: true, pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/ })} placeholder="password" className="input input-bordered lg:w-[400px]" />
                            {errors.password?.type === 'required' && <span className='text-red-800' >Password is required</span>}
                            {errors.password?.type === 'minlength' && <span className='text-red-800' >Password must be 6 character</span>}
                            {errors.password?.type === 'maxlength' && <span className='text-red-800'>Password must be less than 20 character</span>}
                            {errors.password?.type === 'pattern' && <span className='text-red-800' >Password must have at least one upper case,at least one lower case, one number and one special character</span>}

                        </div>

                        <div>
                            <p className='text-center mt-4 text-[#DAFFFB]'>
                                Already registered? Go to<Link to='/login'> <span className='hover:text-[#04364A]'>Login</span></Link>
                            </p>
                        </div>
                        <div className="form-control mt-6">

                            <input type="submit" value="Register" className="btn text-white bg-[#04364A] btn-outline hover:bg-hoverclr  lg:w-[400px]" />
                        </div>

                        <p className="text-center lg:text-xl text-sm">OR</p>
                        <div className="mt-4 gap-10">
                            <button onClick={handleGoogle} type="button" className="lg:w-[400px] py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-redclr text-white shadow-sm align-middle hover:bg-hoverclr focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                                    <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                                    <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                                    <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                                    <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
                                </svg>
                                Register with Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;