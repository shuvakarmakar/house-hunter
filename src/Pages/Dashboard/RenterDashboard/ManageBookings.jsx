import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/bookings?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setBookings(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [user]);

    console.log(bookings);

    const handleDelete = (bookingId) => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "You are about to delete this booking",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/bookings/${bookingId}`, {
                    method: "DELETE"
                })
                    .then((response) => {
                        if (response.ok) {
                            Swal.fire({
                                icon: "success",
                                title: "Success",
                                text: "Booking deleted successfully!",
                                showConfirmButton: false,
                                timer: 2000
                            });

                            // Update the bookings state
                            setBookings((prevBookings) =>
                                prevBookings.filter((booking) => booking._id !== bookingId)
                            );
                        } else {
                            throw new Error("Failed to delete booking");
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to delete booking",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    });
            }
        });
    };

    return (
        <div>
            <h2 className="text-center text-4xl my-6 font-semibold">Manage Bookings</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>House Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking._id}</td>
                            <td>{booking.name}</td>
                            <td>{booking.email}</td>
                            <td>{booking.phone}</td>
                            <td>{booking.houseName}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(booking._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageBookings;
