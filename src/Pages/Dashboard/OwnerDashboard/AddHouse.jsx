import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;
const AddHouse = () => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const { user } = useContext(AuthContext);

    const onSubmit = (data) => {

        const formData = new FormData();
        formData.append('image', data.image[0]);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    console.log(data, imgURL);
                    const { houseName, address, city, bedrooms, bathrooms, roomSize, availabilityDate, rentPerMonth, phoneNumber, description, ownerEmail } = data;
                    const houseItem = {
                        houseName,
                        address,
                        city,
                        bedrooms: parseInt(bedrooms),
                        bathrooms: parseInt(bathrooms),
                        roomSize: parseInt(roomSize),
                        availabilityDate,
                        rentPerMonth: parseFloat(rentPerMonth),
                        phoneNumber,
                        description,
                        ownerEmail,
                        image: imgURL
                    };
                    console.log(houseItem);
                    axiosSecure.post('/houses', houseItem)
                        .then(data => {
                            console.log('After posting New House', data.data);
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'House Added Successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })
    };
    console.log(img_hosting_token);

    return (
        <div>
            <h2 className="text-2xl text-center mb-10 divider font-bold">Add A House Page</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="houseName" className="block mb-1">House Name:</label>
                        <input
                            type="text"
                            {...register('houseName', { required: true })}
                            name="houseName"
                            placeholder="House Name"
                            className={`input input-bordered ${errors.houseName ? 'input-error' : ''}`}
                        />
                        {errors.houseName && <span className="error-message">House Name is required</span>}
                    </div>
                    <div>
                        <label htmlFor="image" className="block mb-1">House Image:</label>
                        <input
                            type="file"
                            {...register('image', { required: true })}
                            name="image"
                            className="file-input file-input-bordered w-full " />
                        {errors.image && <span className="error-message">House Image is required</span>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-4">
                    <div>
                        <label htmlFor="address" className="block mb-1">Address:</label>
                        <input
                            type="text"
                            {...register('address', { required: true })}
                            name="address"
                            placeholder="Address"
                            className={`input input-bordered ${errors.address ? 'input-error' : ''}`}
                        />
                        {errors.address && <span className="error-message">Address is required</span>}
                    </div>
                    <div>
                        <label htmlFor="city" className="block mb-1">City:</label>
                        <input
                            type="text"
                            {...register('city', { required: true })}
                            name="city"
                            placeholder="City"
                            className={`input input-bordered ${errors.city ? 'input-error' : ''}`}
                        />
                        {errors.city && <span className="error-message">City is required</span>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-4">
                    <div>
                        <label htmlFor="bedrooms" className="block mb-1">Bedrooms:</label>
                        <input
                            type="number"
                            {...register('bedrooms', { required: true })}
                            name="bedrooms"
                            placeholder="Bedrooms"
                            className={`input input-bordered ${errors.bedrooms ? 'input-error' : ''}`}
                        />
                        {errors.bedrooms && <span className="error-message">Bedrooms is required</span>}
                    </div>
                    <div>
                        <label htmlFor="bathrooms" className="block mb-1">Bathrooms:</label>
                        <input
                            type="number"
                            {...register('bathrooms', { required: true })}
                            name="bathrooms"
                            placeholder="Bathrooms"
                            className={`input input-bordered ${errors.bathrooms ? 'input-error' : ''}`}
                        />
                        {errors.bathrooms && <span className="error-message">Bathrooms is required</span>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-4">
                    <div>
                        <label htmlFor="roomSize" className="block mb-1">Room Size(Sq.ft):</label>
                        <input
                            type="number"
                            {...register('roomSize', { required: true })}
                            name="roomSize"
                            placeholder="Room Size"
                            className={`input input-bordered ${errors.roomSize ? 'input-error' : ''}`}
                        />
                        {errors.roomSize && <span className="error-message">Room Size is required</span>}
                    </div>
                    <div>
                        <label htmlFor="availabilityDate" className="block mb-1">Availability Date:</label>
                        <input
                            type="date"
                            {...register('availabilityDate', { required: true })}
                            name="availabilityDate"
                            className={`input input-bordered ${errors.availabilityDate ? 'input-error' : ''}`}
                        />
                        {errors.availabilityDate && <span className="error-message">Availability Date is required</span>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-4">
                    <div>
                        <label htmlFor="rentPerMonth" className="block mb-1">Rent Per Month(BDT):</label>
                        <input
                            type="text"
                            {...register('rentPerMonth', { required: true })}
                            name="rentPerMonth"
                            className="input input-bordered"
                        />
                        {errors.rentPerMonth && <span className="error-message">Rent Per Month is required</span>}
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block mb-1">Phone Number:</label>
                        <input
                            type="text"
                            {...register('phoneNumber', { required: true })}
                            name="phoneNumber"
                            placeholder="Phone Number"
                            className={`input input-bordered ${errors.phoneNumber ? 'input-error' : ''}`}
                        />
                        {errors.phoneNumber && <span className="error-message">Phone Number is required</span>}
                    </div>
                </div>
                <div>
                    <label htmlFor="description" className="block mb-1">Description:</label>
                    <textarea
                        {...register('description', { required: true })}
                        name="description"
                        placeholder="Description"
                        className={`textarea textarea-bordered ${errors.description ? 'input-error' : ''}`}
                    ></textarea>
                    {errors.description && <span className="error-message">Description is required</span>}
                </div>
                <div>
                    <label htmlFor="ownerEmail" className="block mb-1">Owner Email:</label>
                    <input
                        type="email"
                        {...register('ownerEmail', { required: true })}
                        name="ownerEmail"
                        value={user.email}
                        className={`input input-bordered ${errors.ownerEmail ? 'input-error' : ''}`}
                    />
                    {errors.ownerEmail && <span className="error-message">Owner Email is required</span>}
                </div>
                <button className="btn btn-info mt-6" type="submit">ADD HOUSE</button>
            </form>
        </div>
    );
};

export default AddHouse;
