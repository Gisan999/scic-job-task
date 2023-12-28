import { FaRegCalendarAlt } from "react-icons/fa";
import useTask from "../../Hooks/useTask";
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from "react";
import { Link } from "react-router-dom";

const MyTask = () => {
    useEffect(() => {
        Aos.init();
    }, [])
    const [tasks] = useTask();
    console.log(tasks);
    return (
        <div className="bg-gray-900 py-5">
            <div className="container border-r border-l mx-auto mt-10 p-6 py-20">

                <div className="flex justify-between">
                    <h2 className="text-4xl text-rose-100 font-semibold uppercase">Total Tasks: </h2>
                </div>
                <div data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="1500" className="overflow-x-auto">
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

<div className={`${tasks.length ?  'hidden': 'block'}`}>
    <h2 className="text-2xl md:text-3xl lg:text-5xl text-center font-bold italic underline pt-32">Login and join</h2>
  <div className="flex justify-center  py-12	">
<Link to={"/login"}>
<button className="button222">
    J O I N 
    <div id="clip12">
        <div id="leftTop" className="corner9"></div>
        <div id="rightBottom" className="corner9"></div>
        <div id="rightTop" className="corner9"></div>
        <div id="leftBottom" className="corner9"></div>
    </div>
    <span id="rightArrow" className="arrow12"></span>
    <span id="leftArrow" className="arrow12"></span>
</button>
</Link>
  </div>


</div>

                </div>

            </div>
        </div>
    );
};

export default MyTask;