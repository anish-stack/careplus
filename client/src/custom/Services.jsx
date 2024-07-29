import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import './custom.css';
import DermatologyImg from './hydrated-skin.png';
import GastroenterologyImg from './stomach.png';
import OncologyImg from './oncology.png';
import UrologyImg from './urology.png';

// Map each service to its corresponding image
const serviceImages = {
    Dermatology: DermatologyImg,
    Gastroenterology: GastroenterologyImg,
    Oncology: OncologyImg,
    Urology: UrologyImg,
};

const Services = () => {
    const services = [
        {
            id: 1,
            ServiceName: 'Cardiology',
            iconsClass: 'fa-heart-pulse',
            DoctorsAvailable: '5',
            somePara: 'Heart specialists with advanced care.'
        },
        {
            id: 2,
            ServiceName: 'Neurology',
            iconsClass: 'fa-brain',
            DoctorsAvailable: '3',
            somePara: 'Experts in brain and nervous system care.'
        },
        {
            id: 3,
            ServiceName: 'Orthopedics',
            iconsClass: 'fa-bone',
            DoctorsAvailable: '4',
            somePara: 'Specialists in bone and joint health.'
        },
        {
            id: 4,
            ServiceName: 'Dermatology',
            iconsClass: 'fa-skin',
            DoctorsAvailable: '6',
            somePara: 'Experts in skin, hair, and nails.'
        },
        {
            id: 5,
            ServiceName: 'Pediatrics',
            iconsClass: 'fa-baby',
            DoctorsAvailable: '7',
            somePara: 'Child care specialists.'
        },
        {
            id: 6,
            ServiceName: 'Gynecology',
            iconsClass: 'fa-venus',
            DoctorsAvailable: '5',
            somePara: 'Experts in women\'s reproductive health.'
        },
        {
            id: 7,
            ServiceName: 'Oncology',
            iconsClass: 'fa-cancer',
            DoctorsAvailable: '4',
            somePara: 'Specialists in cancer treatment.'
        },
        {
            id: 8,
            ServiceName: 'Radiology',
            iconsClass: 'fa-x-ray',
            DoctorsAvailable: '3',
            somePara: 'Experts in diagnostic imaging.'
        },
        {
            id: 9,
            ServiceName: 'Endocrinology',
            iconsClass: 'fa-bottle-droplet',
            DoctorsAvailable: '5',
            somePara: 'Specialists in hormonal disorders.'
        },
        {
            id: 10,
            ServiceName: 'Gastroenterology',
            iconsClass: 'fa-stomach',
            DoctorsAvailable: '4',
            somePara: 'Experts in digestive system health.'
        },
        {
            id: 11,
            ServiceName: 'Urology',
            iconsClass: 'fa-bladder',
            DoctorsAvailable: '3',
            somePara: 'Specialists in urinary tract and male reproductive health.'
        },
        {
            id: 12,
            ServiceName: 'Ophthalmology',
            iconsClass: 'fa-eye',
            DoctorsAvailable: '6',
            somePara: 'Experts in eye health and vision care.'
        }
    ];

    return (
        <div id='services' className='w-full p-4 mt-4'>
            <div className='max-w-7xl mx-auto'>
                <div className='heading flex items-center justify-center flex-col text-center mb-8'>
                    <h1 className='text-4xl md:text-5xl font-bold mb-4'>Our <span className='text-[#4154F5]'>Services</span></h1>
                    <hr className='w-1/2 border-[#4153f58f]' />
                </div>

                <div className='grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-8'>
                    {services.map((item) => (
                        <Card key={item.id} className="bg-dark shadow-xl relative text-white md:h-[250px]">
                            <CardHeader className="text-center">
                                <div className="flex items-center justify-center mb-4">
                                    {serviceImages[item.ServiceName] ? (
                                        <img
                                            src={serviceImages[item.ServiceName]}
                                            alt={item.ServiceName}
                                            className="w-8 h-8 object-cover"
                                        />
                                    ) : (
                                        <i className={`text-4xl fa-solid ${item.iconsClass}`}></i>
                                    )}
                                </div>
                                <CardTitle className=" text-sm md:text-xl text-gray-200">{item.ServiceName}</CardTitle>
                                <CardDescription className="text-sm whitespace-nowrap overflow-hidden text-ellipsis truncate h-8 mb-4">
                                    <p className="text-gray-400 ">{item.somePara}</p>
                                </CardDescription>
                                <div className="absolute top-0 right-0 px-4">
                                    <Badge className="bg-white text-black text-xs font-semibold" variant="outline">
                                        {item.DoctorsAvailable} Doctors
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardFooter className="text-center mt-auto">
                                <Button className="bg-[#4154F5] md:w-full py-1 whitespace-nowrap  md:py-2 text-sm md:text-base font-normal flex md:items-center md:justify-center">
                                    Learn More <i className="fa-solid fa-info-circle md:ml-2"></i>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
