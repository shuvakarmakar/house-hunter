import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaEdit } from 'react-icons/fa';

const ManageHouse = () => {
    const { user } = useContext(AuthContext);

    const [houses, setHouses] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/manage-house?ownerEmail=${user?.email}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch house details");
                    }
                    return res.json();
                })
                .then(data => {
                    setHouses(data);
                })
                .catch(error => {
                    console.error("Error fetching Houses:", error);
                });
        }
    }, [user]);

    const handleUpdate = () => {

    }

    return (
        <div className="w-full">
            <h2 className="text-center font-semibold text-2xl">Manage Houses</h2>
            <div className="overflow-x-auto m-10">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>House Image</th>
                            <th>House Name</th>
                            <th>Address</th>
                            <th>Price</th>
                            <th>Rent Per Month</th>
                            <th>Room Size</th>
                            <th>Bed Rooms</th>
                            <th>Bathrooms</th>
                            <th>Availability Date</th>
                            <th>Phone</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {houses.map((houseInfo, index) => (
                            <tr key={houseInfo._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={houseInfo.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap">{houseInfo.houseName}</td>
                                <td className="whitespace-nowrap">{houseInfo.address}</td>
                                <td className="whitespace-nowrap">${houseInfo.price}</td>
                                <td className="whitespace-nowrap">${houseInfo.rentPerMonth}</td>
                                <td className="whitespace-nowrap">{houseInfo.roomSize}</td>
                                <td className="whitespace-nowrap">{houseInfo.bedrooms}</td>
                                <td className="whitespace-nowrap">{houseInfo.bathrooms}</td>
                                <td className="whitespace-nowrap">{houseInfo.availabilityDate}</td>
                                <td className="whitespace-nowrap">{houseInfo.phoneNumber}</td>
                                <td className="whitespace-nowrap">{houseInfo.description}</td>
                                <td className="whitespace-nowrap">
                                    <button onClick={() => handleUpdate(houseInfo)} className="btn btn-ghost bg-emerald-400 text-white"><FaEdit></FaEdit></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default ManageHouse;