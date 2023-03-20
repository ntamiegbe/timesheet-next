import { useState, useEffect } from 'react';
import { formatDistanceStrict } from 'date-fns';
import { AiOutlineClockCircle } from 'react-icons/ai';

function TimeSheet() {
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [clockInTime, setClockInTime] = useState(null);
    const [clockOutTime, setClockOutTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [clockTimes, setClockTimes] = useState([]);

    useEffect(() => {
        let intervalId;
        if (isClockedIn) {
            intervalId = setInterval(() => {
                setElapsedTime(Date.now() - clockInTime);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isClockedIn, clockInTime]);

    useEffect(() => {
        const storedClockTimes = localStorage.getItem('clockTimes');
        if (storedClockTimes) {
            setClockTimes(JSON.parse(storedClockTimes));
        }
    }, []);

    // Helper function that converts the time to HH:MM:SS format
    const formatTime = (time) => {
        const date = new Date(0);
        date.setSeconds(time / 1000);
        return date.toISOString().substr(11, 8);
    };

    const handleClockIn = () => {
        setIsClockedIn(true);
        setClockInTime(Date.now());
    };

    const handleClockOut = () => {
        setIsClockedIn(false);
        setClockOutTime(Date.now());
        const newClockTime = {
            clockInTime,
            elapsedTime,
            selectedDate,
        };
        const updatedClockTimes = [...clockTimes, newClockTime];
        setClockTimes(updatedClockTimes);
        localStorage.setItem('clockTimes', JSON.stringify(updatedClockTimes));
    };

    return (
        <div className="bg-gray-100 mt-14 h-[70vh] pb-20 mx-auto max-w-[60rem]">
            <div className="rounded-md bg-white m-8 md:mx-0 shadow-md p-10">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-4xl font-bold text-gray-700 uppercase">TimeSheet</h1>
                    <AiOutlineClockCircle className="h-10 w-10 text-gray-700" />
                </div>
                <div className="flex justify-start space-x-2 items-center mb-5">
                    <label htmlFor="" className='text-lg text-gray-700'>Select Date:</label>
                    <input type="date" className='my-3 border px-4 py-1 border-gray-7   00 rounded-lg' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                </div>
                {!isClockedIn && (
                    <button
                        className={`bg-green-500 hover:bg-green-600 text-white font-bold tracking-widest uppercase rounded-md py-2 px-4 mb-4 w-full ${!selectedDate && "opacity-50 cursor-not-allowed"}`}
                        onClick={handleClockIn}
                        disabled={!selectedDate}
                    >
                        Clock In
                    </button>
                )}
                {isClockedIn && (
                    <div className="my-4 text-gray-700">
                        <p className="mb-2">Clocked in at {new Date(clockInTime).toLocaleTimeString()}</p>
                        <p className="font-bold">
                            Time elapsed: <span className='text-green-500'>{formatTime(elapsedTime)}</span>
                        </p>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white rounded-md py-2 px-4 mt-4 w-full"
                            onClick={handleClockOut}
                        >
                            Clock Out
                        </button>
                    </div>
                )}
                <h2 className="text-2xl uppercase font-bold text-gray-700 mt-5">History</h2>
                <div className="max-h-[200px] overflow-y-scroll mt-10">
                    {clockTimes.map((clockTime, index) => (
                        <div key={index} className="m-4 bg-gray-100 p-4 rounded-xl">
                            <p className='text-lg text-gray-700'>Clocked in at {new Date(clockTime.clockInTime).toLocaleTimeString()}</p>
                            <p className='text-lg text-gray-700 my-2'>Duration worked: <span className='font-semibold  text-green-500'>{formatTime(clockTime.elapsedTime)}</span></p>
                            <p className='text-lg text-gray-700'>Date: {clockTime.selectedDate}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TimeSheet;
