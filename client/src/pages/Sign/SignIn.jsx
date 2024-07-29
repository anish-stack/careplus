import React, { useState } from 'react';
import image from './image.png';
import logo from './healthcare.png';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import OtpPage from '../StartPage/OtpPage';

const SignIn = () => {
    const [formData, setFormData] = useState({
        Email: '',
        Password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isPasswordField, setIsPasswordField] = useState(false);

    const { toast } = useToast();
    const navigate = useNavigate();

    const handleOpen = () => {
        if (!formData.Email || !formData.Password) {
            return toast({
                title: "Empty Fields",
                description: "Please Fill All Required Fields!",
                variant: "error"
            });
        } else {
            setIsOpen(true);
            setIsPasswordField(true)
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:7000/api/v1/login', formData);
            console.log(response.data)
            if (response.data.success) {
                localStorage.setItem('CarePlusUserToken', response.data.token);
                toast({
                    title: "Login Successful",
                    description: "You have successfully logged in.",
                    variant: "success"
                });
                if(response.data.user.PatientId){
                 window.location.href="/?AfterLogin=true"
                }else{
                    window.location.href="/Patient-form-page?AfterLogin=true"

                }
            } else {
                toast({
                    title: "Login Failed",
                    description: response.data.message,
                    variant: "error"
                });
                if (response.data.message.includes('User Email Verification Pending')) {
                    handleOpen();
                }
            }
        } catch (error) {
            console.log(error)
            if (error.response.data.message.includes('User Email Verification Pending')) {
                handleOpen();
            }
            toast({
                title: "Error",
                description: error.response?.data?.message,
                variant: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='bg-[#131619] w-full h-screen'>
            <div className='max-w-7xl mx-auto h-full md:p-4 grid grid-cols-1 lg:grid-cols-2'>
                <div className='image hidden md:block lg:block h-full'>
                    <div className='w-full h-full'>
                        <img src={image} className='w-full h-full object-cover' alt="" />
                    </div>
                </div>
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
                            <p className='text-gray-400 md:text-sm lg:text-sm p-1 mb-2 text-base font-medium leading-6 tracking-wider'>Manage Your's All Appointments.</p>
                        </div>
                    </div>

                    <div className='form-groups md:mt-12 w-full text-start'>
                        <div className='form-container w-full p-4'>
                            <form className='w-full md:px-4 py-2' onSubmit={handleSubmit}>
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
                                    <label htmlFor="Password" className='block text-gray-200 font-medium mb-2'>Password</label>
                                    <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                                        <i className="fa-solid fa-unlock  text-gray-500 mr-2"></i>
                                        <Input
                                            type='password'
                                            value={formData.Password}
                                            name="Password"
                                            onChange={handleChange}
                                            placeholder='Enter your Password'
                                            className='bg-transparent w-full text-white outline-none flex-1'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        onClick={handleSubmit}
                                        className="bg-green-400 py-1 w-full mt-4 md:mt-8 hover:bg-green-700"
                                        size="sm"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Loading..." : "Login With Account"}
                                    </Button>
                                </div>
                                <div className='mt-2 text-start '>
                                    <Link to={'/Sign-Up'} className='text-white mt-2'>Get Started With Care Plus  <i className="fa-solid text-green-400 fa-stethoscope"></i>  <span className='text-green-400 hover:text-green-600 underline'>Sign Up</span> </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <OtpPage isOpen={isOpen} isPasswordField={isPasswordField} Email={formData.Email} handleClose={handleClose} />
        </div>
    );
}

export default SignIn;
