import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Autoplay from 'embla-carousel-autoplay'
const CarasoulPartner = () => {

    const Partners = [
        {
            id: 1,
            image: 'https://i.ibb.co/McKgqsB/image.png'
        }, {
            image: 'https://i.ibb.co/kJkRgky/image.png'
        },
        {
            id: 1,
            image: 'https://i.ibb.co/3vCqVFv/image.png'
        }, {
            image: 'https://i.ibb.co/XSjBpHq/image.png'
        },
        {
            id: 1,
            image: 'https://i.ibb.co/ccmsSFm/image.png'
        }, {
            image: 'https://i.ibb.co/8r5zX55/image.png'
        },
        {
            id: 1,
            image: 'https://i.ibb.co/r0pXjfd/image.png'
        }, {
            image: 'https://i.ibb.co/C2FShzm/image.png'
        },
        {
            id: 1,
            image: 'https://i.ibb.co/ZhqwV8j/image.png'
        }, {
            image: 'https://i.ibb.co/Yf5BR11/image.png'
        }
    ]


    return (
        <div className='p-5'>

            <Carousel  opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]} className="max-w-7xl mx-auto">
                <div className='heading flex items-center justify-center flex-col text-center mb-8'>
                    <h1 className='text-4xl md:text-5xl font-bold mb-4'>Care Plus <span className='text-[#4154F5]'>Partners</span></h1>
                    <hr className='w-1/2 border-[#4153f58f]' />
                </div>
                <CarouselContent>
                    {Partners.map((item, index) => (

                        <CarouselItem className=" basis-2/5 cursor-pointer  md:basis-2/5 lg:basis-1/5">
                            <Avatar>
                                <AvatarImage className="object-fill object-center" src={item.image} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </CarouselItem>
                    ))}


                </CarouselContent>
            </Carousel>

        </div>
    )
}

export default CarasoulPartner