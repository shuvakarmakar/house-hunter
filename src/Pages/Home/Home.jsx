import { useEffect, useState } from "react";

const Home = () => {
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/houses')
            .then(res => res.json())
            .then(data => {
                setHouses(data);
            });
    }, []);

    return (
        <div>
            <div className="container mx-auto">
                <h2 className="text-center text-4xl my-6 font-semibold">All Houses For Rent</h2>
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
                                <button className="btn btn-primary mt-4">Book Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
