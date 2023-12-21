import AddTask from "../AddTask/AddTask";


const Dashboard = () => {
    return (
        <div>
            <h2>This is dashboard</h2>

            <div className="dropdown  dropdown-start">
                <label tabIndex={1} className="">
                    <div className="w-10 rounded-full">

                        <h2 className="text-center text-5xl ">hello</h2>
                    </div>
                </label>
                <div tabIndex={1} className="dropdown-content">
                    <AddTask />

                </div>



                {/* <ul tabIndex={1} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 space-y-3">
                    <li className="text-lg font-medium text-center text-black font-serif">{user?.displayName}</li>
                    {
                        user ?
                            <button onClick={handleLogOut} className="btn btn-xs btn-outline btn-primary">logout</button>
                            :
                            <Link to="/login">
                                <button className="btn btn-xs btn-outline btn-secondary w-full">login</button></Link>
                    }
                </ul> */}
            </div>
        </div>
    );
};

export default Dashboard;