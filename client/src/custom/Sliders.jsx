import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Doctor1 from './Doctor-1.png';
import Doctor2 from './Doctor-2.png';
import Doctor3 from './Doctor-3.png';
import Autoplay from 'embla-carousel-autoplay'
import './custom.css'
const Sliders = () => {
    const SliderData = [
        {
            id: 1,
            FirstLineText: "Experience Unmatched",
            SecondLineText: "Health Services",
            LastLineText: "With Our Experts",
            Para: "At Care Plus, we provide comprehensive health check-ups. Book your appointment today and experience quality healthcare.",
            ButtonText: "Book Now",
            Image: Doctor1
        },
        {
            id: 2,
            FirstLineText: "Your Health",
            SecondLineText: "Is Our Priority",
            LastLineText: "Trust Us",
            Para: "Our dedicated team ensures you get the best medical advice and treatment. Quick, efficient, and personalized care at Care Plus.",
            ButtonText: "Schedule Visit",
            Image: Doctor2
        },
        {
            id: 3,
            FirstLineText: "Comprehensive",
            SecondLineText: "Medical Services",
            LastLineText: "For You",
            Para: "From routine check-ups to specialized treatments, Care Plus is here to cater to all your healthcare needs. Visit us for top-notch care.",
            ButtonText: "Make Appointment",
            Image: Doctor3
        }
    ];

    return (
        <div className="sliders w-full  relative">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 4000,
                    }),
                ]}
            >
                <CarouselContent>
                    {SliderData.map((item) => (
                        <CarouselItem key={item.id}>
                            <div className="max-w-7xl mx-auto  h-[80vh] grid grid-cols-1 md:grid-cols-2 ">
                                <div className="w-full ">
                                    <div className="custom-slider text-white">
                                        <h1 className=" text-xl md:text-5xl mb-2 text-gray-300 font-bold">{item.FirstLineText}</h1>
                                        <h2 className=" text-2xl md:text-4xl mt-2 text-gray-400 mb-2">{item.SecondLineText}</h2>
                                        <h3 className="text-gray-400 text-lg md:text-xl">{item.LastLineText}</h3>
                                        <p className="mt-4 text-gray-400">{item.Para}</p>
                                        <button className="mt-4 w-[50%] bg-[#4154F5] text-white px-4 py-2 rounded">{item.ButtonText}</button>
                                    </div>
                                </div>
                                <div className="w-full hidden md:block relative">

                                    <img src={item.Image} alt={item.FirstLineText} className="object-cover w-full h-full" />
                                </div>
                                {/* <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black opacity-[0.5] to-transparent"></div> */}

                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default Sliders;
