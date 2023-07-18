import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useOwner = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { data: isOwner } = useQuery({
        queryKey: ['isOwner', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/owner/${user?.email}`);
            console.log('is admin response', res)
            return res.data.owner;
        }
    })

    return [isOwner]
};

export default useOwner;