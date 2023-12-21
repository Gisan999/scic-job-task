import React, { useState } from "react";
import useTask from "../../Hooks/useTask";
import AddTask from "../AddTask/AddTask";
import { FaEdit, FaRegCalendarAlt } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    // bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
};


const Dashboard = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const [data, setData] = useState([]);
    const [tasks, refetch] = useTask();
    const [open, setOpen] = React.useState(false);
    const handleOpen = (data) => {
        // console.log(data);
        setData(data)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const { title, deadline, description, priority, _id} = data;

    console.log(data);


    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const priority = form.priority.value;
        const deadline = form.deadline.value;
        event.target.title.value = "";
        event.target.description.value = "";
        event.target.priority.value = "";
        event.target.deadline.value = "";
        const sorting = deadline.split("-").join("");
        // console.log(deadline.split("-").join(""));
        
        const updateData = {
            title, description, priority, deadline, sorting
        }

        axiosSecure.put(`/update/tasks/${_id}`, updateData)
        .then(res => {
            // console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch()
                toast.success('Update Successful');
            }
        })

        // console.log(updateData);
        refetch();
        setOpen(false)
    }

    return (
        <div>

            <div className="dropdown dropdown-right dropdown-bottom">
                <label tabIndex={1} className="">
                    <div className="w-10 rounded-full">
                        <h2 className="text-center text-5xl ">hello</h2>
                    </div>
                </label>
                <div tabIndex={1} className="dropdown-content">
                    <AddTask />
                </div>
            </div>

            <div>
                <div className="container mx-auto my-12 px-5 lg:px-0">
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div className="border">
                            <h2 className="text-center font-bold text-2xl italic py-4">ToDo List</h2>
                            <div  className="space-y-5">
                                {
                                    tasks.map(data => <div key={data._id}>
                                        <div draggable className="flex justify-between p-5 bg-slate-500">
                                            <div>
                                                <h1 className="text-lg font-bold">{data.title}</h1>
                                                <h3>{data.description}</h3>
                                                <h5 className="font-medium flex gap-2 items-center">Deadline:-  <FaRegCalendarAlt /> {data.deadline}</h5>


                                            </div>
                                            <div>
                                                <h1><span className="text-base font-semibold">Priority:</span> {data.priority}</h1>
                                                <div className="flex justify-center pt-4 items-center gap-5">
                                                    <button onClick={() => handleOpen(data)}  className="text-xl text-blue-700">
                                                        <FaEdit/>
                                                    </button>


                                                    <button className="text-xl text-purple-700">< RiDeleteBinFill/></button>
                                                </div>

                                            </div>
                                        </div>

                                    </div>)
                                }
                            </div>
                        </div>



                        <div className="border">
                            <h2 className="text-center font-bold text-2xl italic py-4">Ongoing List</h2>

                        </div>


                        <div className="border">
                            <h2 className="text-center font-bold text-2xl italic py-4">Complete List</h2>

                        </div>
                    </div>
                </div>
            </div>


            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>

                    <div className="form-container w-80 lg:w-96">
                    <form onSubmit={handleSubmit}  className="form">
                        <div className="form-group">
                            <label htmlFor="email">Task Title</label>
                            <input defaultValue={title} className='input999' required name="title" id="email" type="text" />
                            <br />

                            <label htmlFor="email">Task Description</label>
                            <input defaultValue={description} className='input999' required name="description" type="text" />
                            <br />

                            <label htmlFor="email">Task Priority</label>

                            <select defaultValue={priority} className='input999' required name="priority">
                                <option value="" selected>Select Priority ?</option>
                                <option value="Low">Low</option>
                                <option value="moderate">moderate</option>
                                <option value="High">High</option>
                            </select>

                            <br />
                            <label htmlFor="email">Task Deadline</label>
                            <input defaultValue={deadline} className='input999' placeholder='dd/mm/yy' required="" name="deadline" id="email" type="date" />
                        </div>




                        {/* <div className="form-group">
                            <label htmlFor="textarea">Task Description</label>
                            <textarea defaultValue={description} required cols="50" rows="10" id="textarea" name="description">          </textarea>
                        </div> */}
                        <button type="submit" className="form-submit-btn">Update</button>
                    </form>
                </div>
                    </Box>
                </Modal>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Dashboard;