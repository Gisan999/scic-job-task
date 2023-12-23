import { FaRegCalendarAlt } from "react-icons/fa";
import useTask from "../../Hooks/useTask";


const MyTask = () => {
    const [tasks] = useTask();
    console.log(tasks);
    return (
        <div className="bg-gray-900 py-5">
            <div className="container border-r border-l mx-auto mt-10 p-6 py-20">

                <div className="flex justify-between">
                    <h2 className="text-4xl text-rose-100 font-semibold uppercase">Total Tasks: </h2>



                </div>

                <div className="overflow-x-auto">
                    <table className="table mt-5">
                        <thead>
                            <tr className="bg-purple-600 text-white text-base">
                                <th>
                                    <label>

                                    </label>
                                </th>
                                <th>NAME</th>
                                <th>DESCRIPTION</th>
                                <th>DEADLINE</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks?.map((data, idx) => <tr key={data._id}>
                                    <th className={`${data.status.status === "Completed" ? 'bg-green-300' : data.status.status === 'Ongoing' ? 'bg-yellow-300' : 'bg-red-300'}`}>
                                        {idx + 1}
                                    </th>

                                    <td className={`${data.status.status === "Completed" ? 'bg-green-300' : data.status.status === 'Ongoing' ? 'bg-yellow-300' : 'bg-red-300'}`}>
                                        {data.title}
                                    </td>
                                    <td className={`${data.status.status === "Completed" ? 'bg-green-300' : data.status.status === 'Ongoing' ? 'bg-yellow-300' : 'bg-red-300'}`}>{data.description}</td>
                                    <td className={` flex items-center gap-2 py-3 ${data.status.status === "Completed" ? 'bg-green-300' : data.status.status === 'Ongoing' ? 'bg-yellow-300' : 'bg-red-300'}`}>  <FaRegCalendarAlt /> {data.deadline}</td>
                                    <td className={`${data.status.status === "Completed" ? 'bg-green-300' : data.status.status === 'Ongoing' ? 'bg-yellow-300' : 'bg-red-300'}`}>
                                        {data.status.status}
                                        {/* <button className="btn text-white text-2xl bg-[#B91C1C]"><MdDelete></MdDelete></button> */}
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default MyTask;