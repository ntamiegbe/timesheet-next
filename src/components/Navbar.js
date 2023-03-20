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
                className='p-5 rounded-lg mx-7 text-xl font-medium text-gray-700 hover:bg-white md:hover:bg-gray-100 md:hover:underline'
            >
                {item.menu}
            </Link>
        ));
    };

    const isDesktop = useMedia('(min-width: 768px)', true);
    const [open, setOpen] = useState(false);

    const toggleSidebar = () => setOpen(!open);

    return (
        <main>
            <div className='flex justify-between px-14 py-7 shadow items-center'>
                {/* <h1>Logo</h1> */}
                <AiFillClockCircle className='text-gray-700 h-10 w-10'/>
                {/* <div>
                    <Image src={Logo} alt='Logo' width={100} height={100} />
                </div> */}

                {/* Menu links */}
                <div>
                    <div className='text-red'>
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
                                            className='mb-7 mt-7 mr-1 flex justify-end px-5 text-xl'
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
