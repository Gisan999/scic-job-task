import React, { useEffect, useState } from "react";
import useTask from "../../Hooks/useTask";
// import AddTask from "../AddTask/AddTask";
import { FaEdit, FaRegCalendarAlt } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const Dashboard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [data, setData] = useState([]);
    const [datas, setDatas] = useState('');
    const [tasks, refetch] = useTask();
    // const [tasks, setTasks] = useState([]);
    const [open, setOpen] = React.useState(false);

    const [todoList, setTodoList] = useState([]);
    const [ongoingList, setOngoingList] = useState([]);
    const [completedList, setCompletedList] = useState([]);

    const add = 'add';
    const upp = 'upp';

    const handleOpen = (data, xxx) => {
        setData(data)
        setDatas(xxx)
        setOpen(true);
    }
    console.log(datas);
    const handleClose = () => setOpen(false);
    const { title, deadline, description, priority, _id } = data;
    useEffect(() => {
        const remaining = tasks.filter(data => data.status.status === 'null')
        setTodoList(remaining);
        const ongo = tasks.filter(data => data.status.status === "Ongoing");
        setOngoingList(ongo);
        const com = tasks.filter(data => data.status.status === "Completed");
        setCompletedList(com);
    }, [tasks])



    const handleAdd = event => {
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
        const status = { status: 'null' }

        const taskData = {
            title, description, status, priority, deadline, email: user.email, sorting
        }
        axiosSecure.post('/set/tasks', taskData)
            .then(res => {
                if (res.data.acknowledged === true) {
                    // window.location.replace(false);
                    // navigate('/myTask')
                    // navigate('/dashboard')
                    handleClose();
                    refetch();
                    toast.success('Task Added Successful');
                }
            })

    }




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
        const updateData = {
            title, description, priority, deadline, sorting
        }
        axiosSecure.put(`/update/tasks/${_id}`, updateData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    toast.success('Update Successful');
                }
            })
        refetch();
        setOpen(false)
    }

    const handleDelete = id => {
        console.log(id);
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
                axiosSecure.delete(`/delete/tasks/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            // Swal.fire({
                            //     title: "Deleted!",
                            //     text: "Your file has been deleted.",
                            //     icon: "success"
                            // });
                            toast.success('Your file has been deleted.')
                            refetch();
                        }
                    })
            }
        });
    }

    const dragStarted = (e, data) => {
        // console.log('Drag has started', data);
        e.dataTransfer.setData('todoId', JSON.stringify({ taskId: data._id, status: data.status }));
    }

    const draggingOver = (e) => {
        e.preventDefault();
        console.log('Dragging over now');
    }

    const dragDropped = (e, status) => {
        e.preventDefault();
        // console.log('you have dropped', status);

        const droppedTask = JSON.parse(e.dataTransfer.getData('todoId'));

        const status2 = { status }

        axiosSecure.patch(`/tasks/innerUpdate/${droppedTask.taskId}`, status2)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success(`Your Task Now ${status}`)
                }
            })
        droppedTask.status = status;
        const todo = tasks.filter(data => data.status.status === "null");
        setTodoList(todo);
        // console.log(todo);
        // console.log(tasks);

    }
    // console.log(Array.isArray(ongoingList));
    return (
        <div className="bg-gray-900 py-6 ">

            <div className="flex justify-center py-9">
                        <div className="">
                            <h2 onClick={() => handleOpen(data, add)} className="text-center btn w-full btn-outline btn-info px-12 lg:px-32 ">Click Here To Add Your Task</h2>
                        </div>
                {/* <div className="dropdown dropdown-bottom">
                    <label tabIndex={1} className="">
                    </label>
                    <div tabIndex={1} className="dropdown-content">
                        <div className="z-50">
                            <AddTask />
                        </div>
                    </div>
                </div> */}
            </div>

            <div>
                <div className="container mx-auto my-12 px-5 lg:px-0">


                    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div className="">

                            <div className="bg-red-200 ">
                                <h2 className="text-center font-bold text-2xl italic py-4">ToDo List</h2>
                                <hr />
                                <hr />
                                <div className="space-y-5 pt-5 p-3">
                                    {
                                        todoList.map((data, idx) =>
                                            <div key={idx} draggable="true" onDragStart={(e) => dragStarted(e, data)} className="flex justify-between p-5 bg-red-500">
                                                <div>
                                                    <h1 className="text-lg font-bold">{data.title}</h1>
                                                    <h3>{data.description}</h3>
                                                    <h5 className="font-medium flex gap-2 items-center">Deadline:-  <FaRegCalendarAlt /> {data.deadline}</h5>
                                                </div>
                                                <div >
                                                    <h1><span className="text-base font-semibold">Priority:</span> {data.priority}</h1>
                                                  <div>
                                                  <div className="flex justify-center pt-4 items-center gap-5">
                                                        <button onClick={() => handleOpen(data, upp)} className="text-xl text-blue-700">
                                                            <FaEdit />
                                                        </button>
                                                        <button onClick={() => handleDelete(data._id)} className="text-xl text-purple-700">< RiDeleteBinFill /></button>
                                                    </div>
                                                  </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                                <div className={`${todoList.length ? 'hidden' : 'block'}`}>
                                    <h2 className="text-2xl text-white font-bold italic font-serif uppercase text-center py-20">Add Your Work</h2>
                                </div>
                        </div>

                        <div onDragOver={(e) => draggingOver(e)} onDrop={(e) => dragDropped(e, 'Ongoing')}>
                            <div className="bg-yellow-200">
                                <h2 className="text-center font-bold text-2xl italic py-4">Ongoing List</h2>
                                <hr />
                                <hr />
                                <div className="space-y-5 pt-5 p-3">
                                    {ongoingList.map((data, idx) => (
                                        <div key={idx} draggable="true" onDragStart={(e) => dragStarted(e, data)} className="flex justify-between p-5 bg-yellow-500">
                                            <div>
                                                <h1 className="text-lg font-bold">{data.title}</h1>
                                                <h3>{data.description}</h3>
                                                <h5 className="font-medium flex gap-2 items-center">Deadline:-  <FaRegCalendarAlt /> {data.deadline}</h5>
                                            </div>
                                            <div >
                                                <h1><span className="text-base font-semibold">Priority:</span> {data.priority}</h1>
                                               <div>
                                               <div className="flex justify-center pt-4 items-center gap-5">
                                                    <button onClick={() => handleOpen(data, upp)} className="text-xl text-blue-700">
                                                        <FaEdit />
                                                    </button>
                                                    <button onClick={() => handleDelete(data._id)} className="text-xl text-purple-700">< RiDeleteBinFill /></button>
                                                </div>
                                               </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                        <div onDragOver={(e) => draggingOver(e)} onDrop={(e) => dragDropped(e, 'Completed')} >
                            <div className="bg-green-200">
                                <h2 className="text-center font-bold text-2xl italic py-4">Completed List</h2>
                                <hr />
                                <hr />
                                <div className="space-y-5 pt-5 p-3">
                                    {completedList.map((data, idx) => (
                                        <div key={idx} draggable="true" onDragStart={(e) => dragStarted(e, data)} className="flex justify-between p-5 bg-green-500">
                                            <div>
                                                <h1 className="text-lg font-bold">{data.title}</h1>
                                                <h3>{data.description}</h3>
                                                <h5 className="font-medium flex gap-2 items-center">Deadline:-  <FaRegCalendarAlt /> {data.deadline}</h5>
                                            </div>
                                            <div   >
                                                <h1><span className="text-base font-semibold">Priority:</span> {data.priority}</h1>
                                              <div>
                                              <div className="flex justify-center pt-4 items-center gap-5">
                                                    <button onClick={() => handleOpen(data, upp)} className="text-xl text-blue-700">
                                                        <FaEdit />
                                                    </button>
                                                    <button onClick={() => handleDelete(data._id)} className="text-xl text-purple-700">< RiDeleteBinFill /></button>
                                                </div>
                                              </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

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

                        {
                            datas === 'add' ?
                            
                            <div className="form-container w-80 md:w-96">
                            <form onSubmit={handleAdd} className="form">
                                <div className="form-group">
                                    <label htmlFor="email">Task Title</label>
                                    <input placeholder="Title" className='input999' required name="title" id="email" type="text" />
                                    <br />
            
                                    <label htmlFor="email">Task Priority</label>
            
                                    <select className='input999' required name="priority">
                                        <option value="" disabled selected>Select Priority ?</option>
                                        <option value="Low">Low</option>
                                        <option value="moderate">moderate</option>
                                        <option value="High">High</option>
                                    </select>
            
                                    <br />
                                    <label htmlFor="email">Task Deadline</label>
                                    <input className='input999' placeholder='dd/mm/yy' required name="deadline" id="email" type="date" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="textarea">Task Description</label>
                                    <textarea placeholder="Description" required cols="10" rows="2" id="textarea" name="description">          </textarea>
                                </div>
                                <button  type="submit" className="form-submit-btn">Add</button>
                            </form>
                        </div>
                             : 
                            
                        <div className="form-container w-80 lg:w-96">
                            <form onSubmit={handleSubmit} className="form">
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
                                <button type="submit" className="form-submit-btn">Update</button>
                            </form>
                        </div>
                        }




                    </Box>
                </Modal>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Dashboard;