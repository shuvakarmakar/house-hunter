import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRenter = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { data: isRenter } = useQuery({
        queryKey: ['isRenter', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/renter/${user?.email}`);
            console.log('is renter response', res)
            return res.data.renter;
        }
    })

    return [isRenter]
};

export default useRenter;