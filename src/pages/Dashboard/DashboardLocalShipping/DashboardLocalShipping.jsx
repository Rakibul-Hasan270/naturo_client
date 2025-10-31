import { useState } from "react";

const DashboardLocalShipping = () => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const formatDate = (date) => date.toISOString().slice(0, 10);

    const setLast7Days = () => {
        const today = new Date();
        const last7 = new Date();
        last7.setDate(today.getDate() - 7);
        setFromDate(formatDate(last7));
        setToDate(formatDate(today));
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow-md space-y-4 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800">Filter by Date</h3>


            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">From</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:ring focus:ring-indigo-200 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">To</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:ring focus:ring-indigo-200 outline-none"
                    />
                </div>
            </div>


            <div className="flex gap-2">
                <button
                    onClick={setLast7Days}
                    className="px-3 py-1.5 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                >
                    Last 7 Days
                </button>
            </div>


            <div className="mt-4 border-t pt-3 text-sm text-gray-600">
                <p>Selected Range:</p>
                <p className="font-medium text-gray-800">
                    {fromDate || "--"} to {toDate || "--"}
                </p>
            </div>
        </div>
    );
};

export default DashboardLocalShipping;