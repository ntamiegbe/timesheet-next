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

        // A variable that will be used to store the ID of the interval timer.
        let intervalId;

        // checks if the user is clocked in. If they are, it sets up a new interval timer that will update the elapsed time every second.
        if (isClockedIn) {
            intervalId = setInterval(() => {
                // calculates the elapsed time by subtracting the clockInTime from the current time, and updates the elapsedTime state variable
                setElapsedTime(Date.now() - clockInTime);
            }, 1000);
        }

        // cleans up the interval timer when the useEffect hook is unmounted or re-run.
        return () => clearInterval(intervalId);
    }, [isClockedIn, clockInTime]);

    // reads from the local storage to retrieve previously saved data.
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

        // creates a new array that adds the newClockTime object to the end of the clockTimes array
        const updatedClockTimes = [...clockTimes, newClockTime];
        setClockTimes(updatedClockTimes);
        localStorage.setItem('clockTimes', JSON.stringify(updatedClockTimes));
    };

    return (
        <div className="bg-gray-100 mt-14 mx-auto max-w-[60rem]">
            <div className="rounded-md bg-white mx-8 md:mx-0 shadow-md p-7">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-700 uppercase">TimeSheet</h1>
                    <AiOutlineClockCircle className="h-10 w-10 text-gray-700" />
                </div>
                <div className="flex justify-start space-x-2 items-center mb-5">
                    <label htmlFor="" className='md:text-lg text-base text-gray-700'>Select Date:</label>
                    <input type="date" className='my-3 border px-4 py-1 border-gray-700 rounded-lg' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
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
                <h2 className="md:text-2xl text-xl uppercase font-bold text-gray-700 my-5">History</h2>
                <div className="max-h-[200px] overflow-y-scroll">
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
