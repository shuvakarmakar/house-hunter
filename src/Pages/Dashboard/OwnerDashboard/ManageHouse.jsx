import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaCut, FaEdit } from 'react-icons/fa';
import Swal from "sweetalert2";
import HouseUpdateForm from "./HouseUpdateForm";


const ManageHouse = () => {
    const { user } = useContext(AuthContext);

    const [houses, setHouses] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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

    const handleUpdate = (houseInfo) => {
        setSelectedHouse(houseInfo);
        setIsUpdateModalOpen(true);
    };

    const handleDelete = (houseInfo) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/manage-house/${houseInfo._id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            const updatedHouses = houses.filter(house => house._id !== houseInfo._id);
                            setHouses(updatedHouses);
                            Swal.fire(
                                'Deleted!',
                                'The house has been deleted.',
                                'success'
                            );
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting house:", error);
                        Swal.fire(
                            'Error!',
                            'Failed to delete the house.',
                            'error'
                        );
                    });
            }
        });
    };

    const handleUpdateSubmit = (updatedHouseInfo) => {
        fetch(`http://localhost:5000/houses/${selectedHouse._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedHouseInfo)
        })

            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const updatedHouses = houses.map(house => {
                        if (house._id === selectedHouse._id) {
                            return { ...house, ...updatedHouseInfo };
                        }
                        return house;
                    });
                    setHouses(updatedHouses);
                    setIsUpdateModalOpen(false);
                    Swal.fire(
                        'Success!',
                        'The house has been updated.',
                        'success'
                    );
                } else {
                    Swal.fire(
                        'Error!',
                        'Failed to update the house.',
                        'error'
                    );
                }
            })
            .catch(error => {
                console.error("Error updating house:", error);
                Swal.fire(
                    'Error!',
                    'Failed to update the house.',
                    'error'
                );
            });
    };

    return (
        <div className="w-4/5">
            <h2 className="text-center font-semibold text-2xl">Manage Houses</h2>
            <div className="overflow-x-auto m-10">
                <table className="table-md">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>House Image</th>
                            <th>House Name</th>
                            <th>Address</th>
                            <th>Rent Per Month(BDT)</th>
                            <th>Room Size(SQ.Ft)</th>
                            <th>Bed Rooms</th>
                            <th>Bathrooms</th>
                            <th>Availability Date</th>
                            <th>Description</th>
                            <th>Action</th>
                            <th>Action</th>
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
                                <td className="whitespace-nowrap">{houseInfo.rentPerMonth}TK</td>
                                <td className="whitespace-nowrap">{houseInfo.roomSize}</td>
                                <td className="whitespace-nowrap">{houseInfo.bedrooms}</td>
                                <td className="whitespace-nowrap">{houseInfo.bathrooms}</td>
                                <td className="whitespace-nowrap">{houseInfo.availabilityDate}</td>
                                <td className="whitespace-nowrap">{houseInfo.description}</td>
                                <td className="whitespace-nowrap">
                                    <button onClick={() => handleUpdate(houseInfo)} className="btn btn-ghost bg-emerald-400 text-white"><FaEdit /></button>
                                </td>
                                <td className="whitespace-nowrap">
                                    <button onClick={() => handleDelete(houseInfo)} className="btn btn-ghost bg-red-600 text-white"><FaCut /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isUpdateModalOpen && (
                <div className=" inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <HouseUpdateForm
                        house={selectedHouse}
                        onSubmit={handleUpdateSubmit}
                        onClose={() => setIsUpdateModalOpen(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default ManageHouse;
