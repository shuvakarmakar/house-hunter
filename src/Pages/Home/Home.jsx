import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useOwner from "../../hook/useOwner";
import Swal from "sweetalert2";

const Home = () => {
    const [houses, setHouses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const { user } = useContext(AuthContext);
    const [isOwner] = useOwner();
    const [phone, setPhone] = useState("");
    const [selectedHouseId, setSelectedHouseId] = useState("");
    const [bookingsCount, setBookingsCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchHouses = () => {
        const url = `http://localhost:5000/allhouses?search=${encodeURIComponent(
            searchQuery
        )}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setHouses(data);
            })
            .catch((error) => {
                console.error(error);
                // Handle error condition
            });
    };

    useEffect(() => {
        fetchHouses();
    }, [searchQuery]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/bookings/count?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setBookingsCount(data.count);
                })
                .catch((error) => {
                    console.error(error);
                    // Handle error condition
                });
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (bookingsCount >= 2) {
            Swal.fire({
                icon: "error",
                title: "Maximum Bookings Reached",
                text: "You have already made 2 bookings",
                showConfirmButton: false,
                timer: 2000,
            });

            return;
        }

        const selectedHouse = houses.find((house) => house._id === selectedHouseId);
        const data = {
            name,
            email: user?.email,
            phone,
            houseId: selectedHouse._id,
            ownerEmail: selectedHouse.ownerEmail,
            rentPerMonth: selectedHouse.rentPerMonth,
            image: selectedHouse.image,
            houseName: selectedHouse.houseName,
        };

        fetch("http://localhost:5000/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Data inserted successfully!",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                } else {
                    throw new Error("Failed to insert data");
                }
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to insert data",
                    showConfirmButton: false,
                    timer: 2000,
                });
            });

        setName("");
        setPhone("");
        setShowModal(false);
    };

    return (
        <div>
            <div className="container mx-auto">
                <h2 className="text-center text-4xl my-6 font-semibold">
                    All Houses For Rent
                </h2>
                <div className="flex justify-center mb-4">
                    <div className="">
                        <input
                            type="text"
                            className="input input-bordered"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {houses.map((house) => (
                        <div className="card w-96 bg-base-100 shadow-xl" key={house._id}>
                            <figure className="px-10 pt-10">
                                <img src={house.image} alt="house" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">House Name: {house.houseName}</h2>
                                <p>Owner Email: {house.ownerEmail}</p>
                                <p className="font-bold">Rent Per Month: BDT {house.rentPerMonth}</p>
                                <p className="font-bold">Availability Date: {house.availabilityDate}</p>
                                <p className="font-bold">Room Size: {house.roomSize}</p>
                                {user && !isOwner && (
                                    <button
                                        className="btn btn-primary mt-4"
                                        onClick={() => {
                                            setSelectedHouseId(house._id);
                                            setShowModal(true);
                                        }}
                                        disabled={bookingsCount >= 2}
                                    >
                                        Book Now
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <h2 className="text-2xl font-semibold mb-4">Book Now</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name:</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email:</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="input input-bordered"
                                        value={user?.email}
                                        readOnly
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone:</span>
                                    </label>
                                    <input
                                        type="tel"
                                        className="input input-bordered"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                    <button className="btn" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
