import userIMG from '@/data/user.jpg';
import Dropdown from './dropdown/dropdown';
import { useState, useEffect } from 'react';


export default function Navbar() {

    const [dropdown, setDropdown] = useState(false);


    const drop = () =>{
        setDropdown(!dropdown)
    }
    useEffect(() => {
        // click outside the dropdown to close it
        const closeDropdown = (e) => {
            if (dropdown && !e.target.closest('.dropdown')) {
                setDropdown(false)
            }
        }
        document.addEventListener('click', closeDropdown)
        return () => document.removeEventListener('click', closeDropdown)
    }, [dropdown])
    
    return (
        // navigation bar with logo left and user img round right
        <nav className="flex justify-between items-center bg-gray-800 p-5">
            <div className="flex items-center gap-2">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white w-10">Auto Equip</span>
            </div>
            <ul className="flex items-center gap-2">
                <li className="text-gray-300 hover:text-gray-100 cursor-pointer">
                    Home
                </li>
                <li className="text-gray-300 hover:text-gray-100 cursor-pointer">
                    Facturation
                </li>
                <li className="text-gray-300 hover:text-gray-100 cursor-pointer">
                    Magasin
                </li>
                <li className="text-gray-300 hover:text-gray-100 cursor-pointer">
                    Import
                </li>
                <li className="text-gray-300 hover:text-gray-100 cursor-pointer">
                    Golda
                </li>
            </ul>
            <div className="flex items-right gap-2">
                <div className="relative">
                    <img onClick={drop}
                        className="h-full w-full object-cover" src="https://flowbite.com/docs/images/logo.svg" alt="Your avatar" />   
                    {dropdown && <Dropdown />}      
                </div>
            </div>
        </nav>
    );


 
}
