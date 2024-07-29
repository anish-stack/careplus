import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';

const Doctors = ({id}) => {
    const DoctorData = [
        {
            id: 1,
            DoctorName: 'Mr. Raj Sharma',
            Speciality: 'Vascular Surgeon',
            Degree: 'Mbbs With Pg',
            Experience: '4 years',
            Availability: ['Mon', 'Wed', 'Sat'],
            Rating: 4.5,
            AppointmentsDone: 150
        },
        {
            id: 2,
            DoctorName: 'Ms. Priya Kapoor',
            Speciality: 'Cardiologist',
            Degree: 'MD Cardiology',
            Experience: '8 years',
            Availability: ['Tue', 'Thu'],
            Rating: 4.7,
            AppointmentsDone: 300
        },
        {
            id: 3,
            DoctorName: 'Mr. Arjun Mehta',
            Speciality: 'Orthopedic Surgeon',
            Degree: 'MS Ortho',
            Experience: '6 years',
            Availability: ['Mon', 'Fri'],
            Rating: 4.6,
            AppointmentsDone: 200
        },
        {
            id: 4,
            DoctorName: 'Ms. Anjali Verma',
            Speciality: 'Dermatologist',
            Degree: 'MD Dermatology',
            Experience: '5 years',
            Availability: ['Wed', 'Sat'],
            Rating: 4.8,
            AppointmentsDone: 180
        },
        {
            id: 5,
            DoctorName: 'Mr. Vikram Singh',
            Speciality: 'Neurologist',
            Degree: 'DM Neurology',
            Experience: '10 years',
            Availability: ['Tue', 'Thu', 'Sat'],
            Rating: 4.9,
            AppointmentsDone: 350
        },
        {
            id: 6,
            DoctorName: 'Ms. Neha Gupta',
            Speciality: 'Pediatrician',
            Degree: 'MD Pediatrics',
            Experience: '7 years',
            Availability: ['Mon', 'Wed', 'Fri'],
            Rating: 4.7,
            AppointmentsDone: 220
        }
    ];

    return (
        <div id={id} className='w-full p-4 mt-4'>
            <div className='max-w-7xl mx-auto'>
                <div className='heading flex items-center justify-center flex-col text-center mb-8'>
                    <h1 className='text-4xl md:text-5xl font-bold mb-4'>Our <span className='text-[#4154F5]'>Doctors</span></h1>
                    <hr className='w-1/2 border-[#4153f58f]' />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {DoctorData.map((item, index) => (
                        <Card key={item.id} className="bg-dark shadow-md relative text-white">
                            <CardHeader className="text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <Avatar className="w-32 h-32">
                                        <AvatarImage src="https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg?t=st=1722233271~exp=1722236871~hmac=f0f455f3a9be9a8f899c4727467e8bea2fa0136dde28c14a9165a338d2235da5&w=996" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className='absolute top-0 right-0 px-4'>
                                    <Badge className="bg-white text-black font-semibold" variant="outline">{item.Rating}</Badge>
                                </div>

                                <CardTitle className="text-xl text-gray-200">{item.DoctorName}</CardTitle>
                                <CardDescription className="text-sm">
                                    <p>{item.Speciality}</p>
                                    <p>{item.Degree}</p>
                                    <p>Appointments Done: {item.AppointmentsDone}</p>
                                </CardDescription>
                            </CardHeader>

                            <CardFooter className="text-center flex items-center justify-center">
                                <ul className="flex flex-wrap items-center justify-center gap-2">
                                    {item.Availability.map((day, index) => (
                                        <li key={index} className='flex  justify-center items-center'>
                                            <input
                                                type='radio'
                                                id={`availability-${index}`}
                                                name='availability'
                                                value={day}
                                                className='hidden peer'
                                            />
                                            <label
                                                htmlFor={`availability-${index}`}
                                                className='flex items-center cursor-pointer p-2 border border-gray-400 rounded-md peer-checked:bg-gray-800 peer-checked:text-white'
                                            >
                                                <span className='mr-2'>{day.slice(0, 3)}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </CardFooter>

                            <div className='px-4 py-3 w-full'>
                                <Button className="bg-[#4154F5] w-full py-2 text-sm md:text-base font-normal flex items-center justify-center">
                                    Make An Appointment <i className="fa-solid fa-user-doctor ml-2"></i>
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Doctors;
