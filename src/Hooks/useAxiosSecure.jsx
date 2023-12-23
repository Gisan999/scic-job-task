import axios from "axios";


const axiosSecure = axios.create({
    // baseURL: 'http://localhost:5000'
    baseURL: 'https://scic-job-task-server-one.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;