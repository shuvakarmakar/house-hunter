import { useState } from "react";

const HouseUpdateForm = ({ house, onSubmit, onClose }) => {
    const [houseData, setHouseData] = useState({
        houseName: house.houseName,
        address: house.address,
        rentPerMonth: house.rentPerMonth,
        roomSize: house.roomSize,
        bedrooms: house.bedrooms,
        phoneNumber: house.phoneNumber,
        availabilityDate: house.availabilityDate,
        description: house.description,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHouseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(houseData);
    };

    return (
        <div className="bg-white w-2/4 p-6 rounded-md scroll-m-2">
            <h2 className="text-2xl font-semibold mb-4">Update House Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="houseName" className="block mb-1 font-medium">
                        House Name
                    </label>
                    <input
                        type="text"
                        id="houseName"
                        name="houseName"
                        value={houseData.houseName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block mb-1 font-medium">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={houseData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="rentPerMonth" className="block mb-1 font-medium">
                        Rent Per Month
                    </label>
                    <input
                        type="number"
                        id="rentPerMonth"
                        name="rentPerMonth"
                        value={houseData.rentPerMonth}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="roomSize" className="block mb-1 font-medium">
                        Room Size
                    </label>
                    <input
                        type="text"
                        id="roomSize"
                        name="roomSize"
                        value={houseData.roomSize}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="bedrooms" className="block mb-1 font-medium">
                        Bedrooms
                    </label>
                    <input
                        type="number"
                        id="bedrooms"
                        name="bedrooms"
                        value={houseData.bedrooms}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block mb-1 font-medium">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={houseData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="availabilityDate" className="block mb-1 font-medium">
                        Availability Date
                    </label>
                    <input
                        type="date"
                        id="availabilityDate"
                        name="availabilityDate"
                        value={houseData.availabilityDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-1 font-medium">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={houseData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    ></textarea>
                </div>
                <div className="flex justify-end mt-6">
                    <button
                        type="button"
                        className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HouseUpdateForm;
