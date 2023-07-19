import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';



const Signup = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { signup } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard';

    const onSubmit = async (data) => {
        try {
            await signup(data);
            reset();

            navigate(from, { replace: true });
        } catch (error) {
            console.error('Error in registration:', error);
        }
    };

    return (
        <div className="hero min-h-screen bg-gradient-to-r from-purple-400 to-indigo-500">
            <div className="hero-content flex-col">
                <h1 className="text-5xl text-center text-white font-bold mb-2">Signup Here Now</h1>
                <div className="card flex-shrink-0 w-full max-w-xl bg-white shadow-lg rounded-md mx-auto mt-12">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body p-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input
                                {...register('fullName', { required: 'Full Name is required' })}
                                className={`input input-bordered rounded-md ${errors.fullName ? 'input-error' : ''}`}
                            />
                            {errors.fullName && <p className="text-red-700">{errors.fullName.message}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">House Owner/Renter</span>
                            </label>
                            <select {...register('role')} className="input input-bordered rounded-md">
                                <option value="owner">House Owner</option>
                                <option value="renter">House Renter</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                {...register('phoneNumber', {
                                    required: 'Phone Number is required',
                                    pattern: {
                                        value: /^(?:\+88|01)?\d{11}$/,
                                        message: 'Please enter a valid BD phone number',
                                    },
                                })}
                                className={`input input-bordered rounded-md ${errors.phoneNumber ? 'input-error' : ''}`}
                            />
                            {errors.phoneNumber && <p className="text-red-700">{errors.phoneNumber.message}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        message: 'Please enter a valid email address',
                                    },
                                })}
                                className={`input input-bordered rounded-md ${errors.email ? 'input-error' : ''}`}
                            />
                            {errors.email && <p className="text-red-700">{errors.email.message}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password should have at least 6 characters',
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
                                        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
                                    },
                                })}
                                className={`input input-bordered rounded-md ${errors.password ? 'input-error' : ''}`}
                            />
                            {errors.password && <p className="text-red-700">{errors.password.message}</p>}
                        </div>

                        <button type="submit" className="btn btn-primary w-full mt-5">Submit</button>
                        <p className="text-center text-gray-600 my-4">Already have an account? <Link to="/login" className="text-purple-600">Please login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
