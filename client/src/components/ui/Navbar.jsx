import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from './healthcare.png';
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('CarePlusUserToken'));

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('CarePlusUserToken'));
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <nav className=" shadow-xl dark:bg-gray-950/90">
            <div className="w-full max-w-7xl mx-auto py-4 px-4">
                <div className="flex justify-between h-14 items-center">
                    <Link to="/" className="flex items-center" prefetch={false}>
                        <img src={logo} className=" h-12 w-12 md:h-8 md:w-8 object-cover" alt="Logo" />
                        <span className="font-bold px-2 py-2 sm:text-lg hidden whitespace-nowrap md:text-2xl">
                            Care Plus
                        </span>
                    </Link>
                    <nav className="hidden md:flex gap-4">
                        <Link
                            to="/doctors"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            Doctors
                        </Link>
                        <Link
                            to="/services"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            Services
                        </Link>
                        <Link
                            to="/partners"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            Partners
                        </Link>
                        <Link
                            to="/contact"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            Contact
                        </Link>
                    </nav>
                    <nav
                        className={`${isOpen ? 'flex' : 'hidden'} items-center md:hidden lg:hidden xl:hidden flex-col absolute navMobile bg-black w-full z-20 gap-4`}
                    >
                        <Link
                            to="/doctors"
                            className="font-medium flex items-center leading-8 text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            Doctors
                        </Link>
                        <Link
                            to="/services"
                            className="font-medium flex items-center text-sm leading-8 transition-colors hover:underline"
                            prefetch={false}
                        >
                            Services
                        </Link>
                        <Link
                            to="/partners"
                            className="font-medium flex items-center text-sm leading-8 transition-colors hover:underline"
                            prefetch={false}
                        >
                            Partners
                        </Link>
                        <Link
                            to="/contact"
                            className="font-medium flex items-center text-sm leading-8 transition-colors hover:underline"
                            prefetch={false}
                        >
                            Contact
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        {token ? (
                            <Button className="bg-[#4154F5] hover:bg-[#4153f5dd]">Profile</Button>
                        ) : (
                            <>
                                <Button onClick={()=>window.location.href="/Sign-in"} variant="outline" className="bg-dark" size="sm">
                                    Sign in
                                </Button>
                                <Button onClick={()=>window.location.href="/Sign-Up"} size="sm">Sign up</Button>
                            </>
                        )}
                        <Button onClick={toggleMenu} className="bg-black block md:hidden lg:hidden xl:hidden" size="sm">
                            <i className="fa-solid fa-bars"></i>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
