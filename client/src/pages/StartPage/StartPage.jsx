import React, { useState } from 'react';
import image from './image.png';
import logo from './healthcare.png';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import OtpPage from './OtpPage';
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios';
import Loader from '@/components/ui/Loader';

const StartPage = () => {
    const [formData, setFormData] = useState({
        FullName: '',
        Email: '',
        ContactNumber: '',
        Password: ''
    });
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { toast } = useToast()

    const handleOpen = () => {
        if (!formData.Email || !formData.ContactNumber || !formData.FullName || !formData.Password) {
            return toast({
                title: "Empty Fields",
                description: "Please Fill All Required Fields!",
                variant: "outline"
            })
        } else {

            setIsOpen(true)
        }
    }
    const handleClose = () => {
        setIsOpen(false)
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.Email || !formData.Password || !formData.FullName || !formData.ContactNumber) {
            return toast({
                title: "User Registration Failed",
                description: "Please fill out the required fields.",
                variant: "error"
            });
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:7000/api/v1/Register', formData);
            console.log(response.data);
            toast({
                title: "Verification Email Sent Successfully",
                description: response.data.message,
                variant: "outline"
            });
            setIsLoading(false);
            handleOpen();
        } catch (error) {
            toast({
                title: "User Registration Failed",
                description: error.response?.data?.message || "An internal server error occurred. Please try again later.",
                variant: "error"
            });
            setIsLoading(false);
            console.error(error.response);
        }
    };

    return (
        <div className='bg-[#131619] w-full min-h-screen'>
            <div className='max-w-7xl mx-auto h-full md:p-4 grid grid-cols-1 lg:grid-cols-2'>
                <div className='forms  mx-auto w-full px-5 py-5 h-full'>
                    <div className='logo-header w-full p-2'>
                        <div className='img flex items-center space-x-3 justify-start'>
                            <img src={logo} className='w-12 h-12 object-cover' alt="logo" />
                            <h4 className='text-pretty text-white text-lg md:text-xl font-semibold'>CarePlus</h4>
                        </div>
                    </div>
                    <div className='message-box md:w-4/5 mx-auto mt-[2rem]'>
                        <div>
                            <h1 className='text-white md:text-3xl lg:text-4xl p-1 mb-2 text-lg font-bold'>Hi there, ....</h1>
                            <p className='text-gray-400 md:text-sm lg:text-sm p-1 mb-2 text-base font-medium leading-6 tracking-wider'>Get Started with Appointments.</p>
                        </div>
                    </div>

                    <div className='form-groups md:mt-12 w-full text-start'>
                        <div className='form-container w-full p-4'>
                            <form className='w-full md:px-4 py-2'>
                                <div className='mb-4'>
                                    <label htmlFor="FullName" className='block text-gray-200 font-medium mb-2'>Full Name</label>
                                    <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                                        <i className="fa-regular fa-user text-gray-500 mr-2"></i>
                                        <Input
                                            type='text'
                                            value={formData.FullName}
                                            name="FullName"
                                            onChange={handleChange}
                                            placeholder='Enter your full name'
                                            className='bg-transparent w-full text-white outline-none flex-1'
                                        />
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="Email" className='block text-gray-200 font-medium mb-2'>Email</label>
                                    <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                                        <i className="fa-regular fa-envelope text-gray-500 mr-2"></i>
                                        <Input
                                            type='email'
                                            value={formData.Email}
                                            name="Email"
                                            onChange={handleChange}
                                            placeholder='Enter your email'
                                            className='bg-transparent w-full text-white outline-none flex-1'
                                        />
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="ContactNumber" className='block text-gray-200 font-medium mb-2'>Contact Number</label>
                                    <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                                        <i className="fa-solid fa-phone text-gray-500 mr-2"></i>
                                        <Input
                                            type='text'
                                            value={formData.ContactNumber}
                                            name="ContactNumber"
                                            onChange={handleChange}
                                            placeholder='Enter your contact number'
                                            className='bg-transparent w-full text-white outline-none flex-1'
                                        />
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="Password" className='block text-gray-200 font-medium mb-2'>Password </label>
                                    <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                                    
                                        <i className="fa-solid fa-key  text-gray-500 mr-2"></i>
                                        <Input
                                            type='text'
                                            value={formData.Password}
                                            name="Password"
                                            onChange={handleChange}
                                            placeholder='Enter your Password'
                                            className='bg-transparent w-full text-white outline-none flex-1'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Button disabled={isLoading} onClick={handleSubmit} className="bg-green-400  hover:bg-green-500 py-1 w-full mt-4 md:mt-8 " size="sm">{isLoading ? <Loader /> : 'Get Started'}</Button>
                                </div>
                                <div className='mt-2 text-start '>
                                    <Link to={'/Sign-in'} className='text-white mt-2'>If You already have an account please <span className='text-green-400 hover:text-green-600 underline'>Sign in</span> </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='image hidden md:block lg:block h-full'>
                    <div className='w-full h-full'>
                        <img src={image} className='w-full h-full object-cover' alt="" />
                    </div>
                </div>
            </div>
            <OtpPage isOpen={isOpen} Password={formData.Password} Email={formData.Email} handleClose={handleClose} />
        </div>
    );
}

export default StartPage;
