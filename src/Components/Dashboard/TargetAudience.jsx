import { useForm } from 'react-hook-form';
import useAuth from '../Hook/useAuth';
import welcome from '/welcome.svg'
import Swal from 'sweetalert2';
import useAxiosPublic from '../Hook/useAxiosPublic';

const TargetAudience = () => {
    const { user, load } = useAuth()
    const axiosPublic = useAxiosPublic()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data);
        const formData = {

            title: data.title,
            description: data.description,
            deadline: data.deadline,
            priority: data.priority
        }
        await axiosPublic.post('/works', formData)
            .then((res) => {
                console.log(res);
                reset()
                Swal.fire("You Added a work board!")

            })
            .catch((error) => console.error("Error updating status:", error))


    }
    if (load) {
        return <p>Loading...</p>; // or some loading indicator
    }

    return (
        <div className='lg:pt-40 bg-[#04364A]'>
            <div className="text-[#DAFFFB] lg:flex justify-between items-center">
                <h1 className="lg:px-40 text-center  justify-center lg:text-3xl font-semibold py-10">
                    <span className="lg:text-3xl" > Hello  {user?.displayName}!!</span>
                    <br />
                    <span className="lg:text-3xl" >Welcome to TechnoVision</span>
                    <br />
                    <span className="text-lg" >We're glad you made it. Let's start organizing your projects so you can get things done.</span>

                </h1>
                <div>
                    <img src={welcome} alt="" />
                </div>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn bg-[#176B87] text-[#DAFFFB] lg:ml-[400px]" onClick={() => document.getElementById('my_modal_5').showModal()}>Create your work board</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-[#176B87]">
                    <form  onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-[#DAFFFB]">Title</span>
                            </label>
                            <input type="title" name='title' {...register("title", { required: true })} placeholder="title" className="input input-bordered lg:w-[400px]" />
                            {errors.title && <span className='text-red-800'>Title is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-[#DAFFFB]">Description</span>
                            </label>
                            <input type="text" name='description' {...register("description", { required: true })} placeholder="description" className="input input-bordered lg:w-[400px]" />
                            {errors.description && <span className='text-red-800'>Description is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-[#DAFFFB]">Priority</span>
                            </label>
                            <input type="text" name='priority' {...register("priority", { required: true })} placeholder="priority" className="input input-bordered lg:w-[400px]" />
                            {errors.priority && <span className='text-red-800'>Priority is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-[#DAFFFB]">Deadline</span>
                            </label>
                            <input type="date" name='deadline' {...register("deadline", { required: true })} placeholder="deadline" className="input input-bordered lg:w-[400px]" />
                            {errors.deadline && <span className='text-red-800'>Deadline is required</span>}
                        </div>
                        <input className='btn mt-4 text-[#DAFFFB] bg-[#176B87]' type="submit" value="Added Board" />
                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default TargetAudience;