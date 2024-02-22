import { list } from "postcss";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDetails } from "react-icons/md";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../Hook/useAuth";



const MyWork = () => {
    const { user } = useAuth()
    const rightBox = document.getElementById("right");
    const leftBox = document.getElementById("left");
    const middleBox = document.getElementById("middle");
    const axiosPublic = useAxiosPublic()
    const [editWorkItem, setEditWorkItem] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);



    const { data: workdata = [], refetch } = useQuery({
        queryKey: ['workdata'],
        queryFn: async () => {
            const res = await axiosPublic.get('/workdata')
            return res.data;
        }
    })



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
            priority: data.priority,
            email: data.email
        };

        try {
            if (editWorkItem) {
                // Update existing item
                await axiosPublic.put(`/workdatas/${editWorkItem._id}`, formData);
            } else {
                // Create new item
                await axiosPublic.post('/works', formData);
            }

            // Reset the form
            reset();

            // Reset the edit state
            setEditWorkItem(null);

            // Update the work data
            refetch();

            // Show a success message
            Swal.fire("Work board updated!");
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    // Function to handle edit button click
    const handleEditWorkItem = (workItem) => {
        setEditWorkItem(workItem);

        // Pre-fill the form with the selected work item's details
        reset({
            title: workItem.title,
            description: workItem.description,
            deadline: workItem.deadline,
            priority: workItem.priority
        });

        // Show the modal
        document.getElementById('my_modal_5').showModal();

        setSelectedCard(workItem)
    };

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/workdata/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }



    const lists = document.getElementsByClassName('list');

    const handleDrop = async (e) => {
        e.preventDefault();
        const selected = e.dataTransfer.getData('text/plain');
        const draggedCard = document.getElementById(selected);
        const targetBox = e.target.closest('.box');

        if (targetBox) {
            targetBox.appendChild(draggedCard);

            // Find the work item based on the dragged card
            const draggedWorkItem = workdata.find(work => work._id === selected);

            // Update the category of the dragged task
            const newCategory = targetBox.id === 'middle' ? 'On Going' : 'Complete';
            await axiosPublic.put(`/workdata/${draggedWorkItem._id}`, { category: newCategory });

            // Refetch the updated data
            refetch();


        }
    };
    for (const list of lists) {
        list.addEventListener("dragstart", function (e) {
            let selected = e.target;

            rightBox.addEventListener("dragover", function (e) {
                e.preventDefault();
            });

            rightBox.addEventListener("drop", function () {
                rightBox.appendChild(selected);
                selected = null;
            });
            leftBox.addEventListener("dragover", function (e) {
                e.preventDefault();
            });

            leftBox.addEventListener("drop", function () {
                leftBox.appendChild(selected);
                selected = null;
            });
            middleBox.addEventListener("dragover", function (e) {
                e.preventDefault();
            });

            middleBox.addEventListener("drop", function () {
                middleBox.appendChild(selected);
                selected = null;
            });
        });
    }

    const onPostWork = async (data) => {
        console.log(data);
        const formData = {

            title: data.title,
            description: data.description,
            deadline: data.deadline,
            priority: data.priority,
            email: data.email
        }
        await axiosPublic.post('/works', formData)
            .then((res) => {
                console.log(res);
                Swal.fire("You Added a work board!")
                reset()
                refetch()

            })
            .catch((error) => console.error("Error updating status:", error))


    }



    return (
        <>  <div className="grid lg:flex md:grid-cols-2 grid-cols-1 lg:mt-20 lg:mx-5 gap-10
         ">
            <div id="left" onDrop={handleDrop()} className="bg-[#176B87] px-3 lg:w-[500px]  border ">
                <h1 className="text-center text-[#DAFFFB] lg:text-3xl my-5">To Do list</h1>
                {
                    workdata?.map((works) => (
                        <ul key={works._id}>

                            <div className="lg:flex">
                                <li draggable='true' className="lg:flex  items-center justify-around text-sm  list pl-5 rounded-xl text-[#DAFFFB] lg:w-[450px] bg-[#04364A]  lg:h-[65px] cursor-grab lg:pr-4 my-5">{works.title}
                                    <br />
                                    Deadline:
                                    {works.deadline}
                                    <div> Priority:
                                        <br />
                                        {works.priority}
                                    </div>

                                    <div className="flex gap-5">
                                        <MdDetails className="text-2xl cursor-pointer" onClick={() => setSelectedCard(works)}  >

                                        </MdDetails>


                                        <CiEdit className="text-2xl cursor-pointer" onClick={() => handleEditWorkItem(works)} >
                                            <div className="modal-box bg-[#176B87]">
                                                <form >
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-[#DAFFFB]">Title</span>
                                                        </label>
                                                        <input type="title" name='title' defaultValue={works.title} placeholder="title" className="input input-bordered lg:w-[400px]" />

                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-[#DAFFFB]">Description</span>
                                                        </label>
                                                        <input type="text" name='description' placeholder="description" className="input input-bordered lg:w-[400px]" />

                                                    </div>

                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-[#DAFFFB]">Deadline</span>
                                                        </label>
                                                        <input type="date" name='deadline' placeholder="deadline" className="input input-bordered lg:w-[400px]" />

                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-[#DAFFFB]">Prioprity</span>
                                                        </label>
                                                        <input type="date" name='deadline' placeholder="priority" className="input input-bordered lg:w-[400px]" />

                                                    </div>
                                                    <input className='btn mt-4 text-[#DAFFFB] bg-[#176B87]' type="submit" value="Updated Board" />
                                                </form>

                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn">Close</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </CiEdit>


                                        <MdDelete className="text-2xl cursor-pointer" onClick={() => handleDeleteUser(works)}></MdDelete>
                                    </div>

                                </li>

                            </div>

                        </ul>
                    ))
                }


            </div>
            <div id="middle" onDrop={handleDrop()} className="bg-[#176B87] px-3 lg:w-[500px] border ">
                <h1 className="text-[#DAFFFB] text-center lg:text-3xl my-5">On going list</h1>
                <ul>
                    <li className="w-[600px]"></li>
                </ul>


            </div>

            <div id="right" className="bg-[#176B87] px-3 lg:w-[500px] border" onDrop={handleDrop()}>
                <h1 className="text-[#DAFFFB] text-center lg:text-3xl my-5">Complete list</h1>

            </div>



        </div>

            <button className="btn my-4 bg-[#176B87] text-[#DAFFFB] lg:ml-[730px]" onClick={() => document.getElementById('my_modal_5').showModal()}>Create your work board</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-[#176B87]">
                    <form onSubmit={handleSubmit(onPostWork)} >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-[#DAFFFB]">Email</span>
                            </label>
                            <input type="email" defaultValue={user?.email} name='email' {...register("email", { required: true })} placeholder="email" className="input input-bordered lg:w-[400px]" />
                            {errors.email && <span className='text-red-800'>Email is required</span>}
                        </div>
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
                                <span className="label-text text-[#DAFFFB]">Deadline</span>
                            </label>
                            <input type="date" name='deadline' {...register("deadline", { required: true })} placeholder="deadline" className="input input-bordered lg:w-[400px]" />
                            {errors.deadline && <span className='text-red-800'>Deadline is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-[#DAFFFB]">Priority</span>
                            </label>
                            <select className="select select-info w-full lg:w-[400px] max-w-xs"
                                {...register("priority", { required: true })}
                            >
                                <option disabled selected>Select Priority</option>
                                <option>Low</option>
                                <option>Moderate</option>
                                <option>High</option>
                            </select>

                            {errors.priority && <span className='text-red-800'>Priority is required</span>}
                        </div>
                        <input className='btn mt-4 text-[#DAFFFB] bg-[#176B87]' type="submit" value="Create Work" />
                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {selectedCard && (
                <div className="bg-[#176B87] px-3 my-10 max-w-[320px] mx-auto w-[320px] border mt-4">
                    <h2 className="text-[#DAFFFB] text-center text-xl font-bold mb-2">Selected Card Details</h2>
                    <div className="text-[#DAFFFB]">
                        <p>Title: {selectedCard.title}</p>
                        <p>Description: {selectedCard.description}</p>
                        <p>Deadline: {selectedCard.deadline}</p>
                        <p>Priority: {selectedCard.priority}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyWork;