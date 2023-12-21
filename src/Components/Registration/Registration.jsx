import { Link, useNavigate } from 'react-router-dom';
// import logo from '../../assets/logo.png';
import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from '../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { registerUser, userUpdate } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegistrationValue = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        const check = event.target.terms.checked

        if (password.length < 6) {
            Swal.fire({
                position: 'center',
                title: 'Password must be at least six digits long',
                icon: 'warning',
                showConfirmButton: false,
                timer: 2000
            })
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            Swal.fire({
                position: 'center',

                title: 'Password must be at least one uppercase letter',
                icon: 'warning',
                showConfirmButton: false,
                timer: 2000
            })
            return;
        }
        else if (!/[!@#$%^&*_+?><|/]/.test(password)) {
            Swal.fire({
                position: 'center',

                title: 'Password must contain at least one special character',
                icon: 'warning',
                showConfirmButton: false,
                timer: 2000
            })
            return;
        }
        else if (!check) {
            Swal.fire({
                position: 'center',

                title: 'Please accept our terms and conditions',
                icon: 'warning',
                showConfirmButton: false,
                timer: 2000
            })

            return;
        }

        console.log(name, photo, email, password);

        registerUser(email, password)
            .then(result => {
                console.log(result);
                toast.success('Registration Successful');
                navigate('/')

                userUpdate(name, photo)
                    .then(result => {
                        console.log(result);
                        window.location.reload(false);
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => {
                console.error(error);
                toast.error('This email already exists');
            })

    }



    return (
        <div>
            <div>
                <div className="py-16">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:container">
                        <div className="hidden lg:block lg:w-1/2 bg-cover"
                            style={{ backgroundImage: `url('https://images.pexels.com/photos/1970801/pexels-photo-1970801.jpeg?auto=compress&cs=tinysrgb&w=600')` }}>
                        </div>
                        <div className="w-full border-4 p-12 lg:py-28 lg:w-1/2">
                            <div className='flex justify-center pb-5'>
                                {/* <img src={logo} alt="" /> */}
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                                <a className="text-xs text-center text-gray-500 uppercase">Registration Here</a>
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                            </div>


                            <form onSubmit={handleRegistrationValue}>
                                <div className="mt-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Your Name</label>
                                    <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text"
                                        name='name'
                                        required

                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Photo URL</label>
                                    <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text"
                                        name='photo'
                                        required />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                    <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email"
                                        name='email'
                                        required />
                                </div>
                                <div className="mt-4 relative">
                                    <div className="flex justify-between">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>

                                    </div>
                                    <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type={showPassword ? "text" : "password"}
                                        name='password'
                                        required />
                                    <span className="absolute bottom-3 right-5" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                        }
                                    </span>
                                </div>
                                <div className="mt-4 items-center flex">

                                    <input
                                        type="checkbox" name="terms" id="terms" />
                                    <label
                                        className="ml-2"
                                        htmlFor="terms">Accept Out <a className="font-medium hover:underline">Terms And Conditions</a></label>
                                </div>
                                <div className="mt-8">
                                    <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Registration</button>
                                </div>

                            </form>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1/5 md:w-1/4"></span>
                                <p className="text-xs text-gray-500 ">Click here to <Link className='text-lg text-center text-blue-400 font-medium hover:underline' to={'/login'}>Sign In</Link></p>
                                <span className="border-b w-1/5 md:w-1/4"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Registration;