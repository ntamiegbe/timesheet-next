import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { useMedia } from 'react-use';
import { AiFillClockCircle } from 'react-icons/ai';


// Menu
const menuItems = [
    {
        menu: 'Home',
        link: '/',
    },
    {
        menu: 'Admin',
        link: '/admin',
    },
    {
        menu: 'Employees',
        link: '/employee',
    },
];

export default function Home() {

    const displayMenu = () => {
        return menuItems.map((item) => (
            <Link
                key={item.menu}
                href={item.link}
                className='p-5 rounded-lg mx-7 md:mx-0 text-xl font-medium text-gray-700 hover:bg-white md:hover:bg-gray-100 md:hover:underline'
            >
                {item.menu}
            </Link>
        ));
    };

    const isDesktop = useMedia('(min-width: 768px)', true);
    const [open, setOpen] = useState(false);

    const toggleSidebar = () => setOpen(!open);

    return (
        <main className=''>
            <div className='flex justify-between px-14 py-5 md:py-7 shadow items-center'>
                {/* Logo */}
                <AiFillClockCircle className='text-gray-700 h-10 w-10'/>

                {/* Menu links */}
                <div>
                    <div className=''>
                        {isDesktop ? (
                            displayMenu()
                        ) : (
                            <>
                                <button
                                    className='border-none bg-none'
                                    onClick={() => toggleSidebar()}
                                >
                                    <FaBars />
                                </button>
                                <div
                                    className={
                                        open
                                            ? 'absolute top-0 right-0 z-50 h-screen w-3/5 bg-gray-100 shadow-md'
                                            : 'hidden'
                                    }
                                >
                                    <div className='flex flex-col text-center'>
                                        <button
                                            className='my-7 mr-1 flex justify-end px-5 text-xl'
                                            onClick={() => toggleSidebar()}
                                        >
                                            <GrClose />
                                        </button>
                                        {displayMenu()}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
