import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import axios from 'axios';

const OtpPage = ({ isOpen, handleClose, Email, Password, isPasswordField }) => {
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [password, setPassword] = useState('');
    const { toast } = useToast();

    const handleChange = (e, index) => {
        const { value } = e.target;
        const newOtp = [...otp];

        if (/^[a-zA-Z0-9]?$/.test(value)) {
            newOtp[index] = value;
            setOtp(newOtp);
            // Move focus to the next input if the current one is filled
            if (value && index < otp.length - 1) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                document.getElementById(`otp-${index - 1}`).focus();
            }
        }
    };

    const handlePaste = (e) => {
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (/^[a-zA-Z0-9]+$/.test(pastedData)) {
            const newOtp = Array(6).fill('');
            for (let i = 0; i < pastedData.length; i++) {
                newOtp[i] = pastedData[i];
            }
            setOtp(newOtp);
            document.getElementById(`otp-${pastedData.length - 1}`).focus();
        }
    };

    const handleSubmit = async () => {
        const enteredOtp = otp.join('');
        try {
            const payload = {
                Email: Email,
                Otp: enteredOtp,
            };

            if (isPasswordField) {
                payload.Password = password;
            } else {
                payload.Password = Password || "123456";
            }

            const response = await axios.post('http://localhost:7000/api/v1/Verify-Otp', payload);

            toast({
                title: "OTP Verified",
                description: "Welcome to the Care Plus family!",
                variant: "outline"
            });
            handleClose();
            localStorage.setItem('CarePlusUserToken', response.data.token);
            window.location.href="/Patient-form-page?AfterLogin=true"

        } catch (error) {
            console.error(error);

            toast({
                title: "Verification Failed",
                description: error.response?.data?.message || 'Verification failed. Please try again.',
                action: <ToastAction altText="Try again">Try again</ToastAction>,
                variant: "error"
            });
        }
    };

    return (
        <div className=''>
            <AlertDialog open={isOpen}>
                <AlertDialogContent className='rounded-lg shadow-lg p-6'>
                    <AlertDialogHeader>
                        <div className='flex items-center justify-between'>
                            <AlertDialogTitle className="text-white text-2xl font-semibold">Verify OTP</AlertDialogTitle>
                            <AlertDialogCancel
                                className="bg-transparent border-none text-white text-2xl cursor-pointer"
                                onClick={handleClose}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </AlertDialogCancel>
                        </div>
                        
                        <AlertDialogDescription className="mt-4 text-gray-400">
                        {isPasswordField && (
                                    <div className='mt-4'>
                                        <label htmlFor="Password" className='block text-gray-200 font-medium mb-2'>Password</label>
                                        <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                                            <i className="fa-solid fa-unlock  text-gray-500 mr-2"></i>
                                            <input
                                                type='password'
                                                value={password}
                                                name="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder='Enter your Password'
                                                className='bg-transparent w-full text-white outline-none flex-1'
                                            />
                                        </div>
                                    </div>
                                )}
                           <p className='mt-4'> Please enter the OTP sent to your registered Email Address.</p>
                            <div className='w-full mx-auto mt-4 text-center'>
                                <div className='flex  space-x-2'>
                                    {otp.map((value, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            value={value}
                                            onChange={(e) => handleChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            onPaste={handlePaste}
                                            maxLength={1}
                                            className="w-10 h-10 text-center text-xl font-medium text-white bg-gray-700 border border-gray-600 rounded-md"
                                        />
                                    ))}
                                </div>
                           
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6">
                        <AlertDialogAction>
                            <Button onClick={handleSubmit}>Verify OTP</Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default OtpPage;
