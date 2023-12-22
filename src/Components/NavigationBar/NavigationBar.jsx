/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, NavLink, useNavigate } from "react-router-dom";
// import logo from '../../assets/logo.png'

import useAuth from "../../Hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";


const Navbar = ({theme}) => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();


    const handleLogOut = () => {
        logOut()
        .then(data => {
            navigate('/')
            toast.success('Logging Out Successfully')
        })
        .catch()
    }

    const navbar = <>
        <li>  <NavLink
            to="/"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-500 font-bold" : ""
            }
        >
            Home
        </NavLink>
        </li>

        <li>   <NavLink
            to="/"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " text-blue-500 font-bold" : ""
            }
        >
            My Tasks
        </NavLink></li>

        <li>   <NavLink
            to="/dashboard"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-500 font-bold " : ""
            }
        >
           Dashboard
        </NavLink></li>

     {
        user ?     '' : <li>   <NavLink
        to="/login"
        className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
        }
    >
        Log In
    </NavLink></li>
     }
        {/* <li>   <NavLink
            to="/addBrand"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
            }
        >
           Add brand
        </NavLink></li> */}
        {/* <li onClick={handle}>theme</li> */}

    </>

    return (
        <div className="sticky top-0 z-20 bg-gray-600 bg-opacity-95 text-white border-b">
            <div className=" container mx-auto">
                <div className="navbar  py-4">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {navbar}
                            </ul>
                        </div>
                        {/* <a className="btn btn-ghost normal-case text-xl">{logo}</a> */}
                        {/* <img src={logo} alt="" /> */}
                    </div>
                    <div className="navbar-center hidden lg:flex">

                        <ul className={`menu  menu-horizontal px-1   ${theme === 'dark' ? "text-white" :''}`}>
                            {navbar}
                        </ul>

                    </div>
                    <div className="navbar-end">

                  {/* <div className="tooltip  tooltip-bottom" data-tip="Theme switch">
                  <input onClick={handle} type="checkbox" className="toggle"  />
                  </div> */}

                        {/* <a className="btn">Button</a> */}
                        <div className="dropdown  dropdown-end">
                            <label tabIndex={1} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">

                                    {
                                        user ?
                                            <img src={user.photoURL} />
                                            :
                                            <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" />
                                    }
                                </div>
                            </label>
                            <ul tabIndex={1} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 space-y-3">
                                <li className="text-lg font-medium text-center text-black font-serif">{user?.displayName}</li>
                                {
                                    user ?
                                   <button onClick={handleLogOut} className="btn btn-xs btn-outline btn-primary">logout</button>
                                    :
                                   <Link to="/login">
                                   <button className="btn btn-xs btn-outline btn-secondary w-full">login</button></Link>
                                }
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Navbar;