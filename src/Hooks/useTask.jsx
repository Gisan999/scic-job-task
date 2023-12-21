import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTask = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { refetch, data: tasks = [] } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get/tasks?email=${user?.email}`)
            return res.data;
        }
    })
    return [tasks, refetch];
};

export default useTask;