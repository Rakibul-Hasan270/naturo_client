import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useOrder from "../../../hooks/useOrder";

const DashboardOrder = () => {
    const [order, isLoading, refetch] = useOrder();
    const axiosPublic = useAxiosPublic();
    const [filter, setFilter] = useState("all");

    const handelMakeConfirm = async (id) => {
        try {
            const result = await axiosPublic.patch(`/order/${id}`);
            if (result.data.modifiedCount > 0) {
                toast.success("Order confirmed successfully!");
                refetch();
            } else {
                toast.error("Order confirmation failed!");
            }
        } catch (err) {
            toast.error(err?.message || "Something went wrong");
            console.error(err);
        }
    };

    const filteredOrders =
        filter === "all" ? order : order.filter((o) => o.status === filter);

    if (isLoading) return <Loading />;
    return (
        <div className="text-gray-700 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-700">
                    Total Orders: {order.length}
                </h2>

                <div className="flex items-center gap-2">
                    <label
                        htmlFor="filter"
                        className="font-semibold text-sm md:text-base"
                    >
                        Filter by:
                    </label>
                    <select
                        id="filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="text-sm md:text-base font-medium px-3 py-1 focus:outline-none focus:ring-0 border-none bg-transparent cursor-pointer shadow-sm hover:shadow-md appearance-none"
                    >
                        <option value="all">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="confirm">Confirmed</option>
                    </select>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
                <table className="table w-full">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((item, idx) => (
                                <tr
                                    key={item._id}
                                    className="hover:bg-gray-50 transition duration-200"
                                >
                                    <td className="py-3 px-4">{idx + 1}</td>
                                    <td className="py-3 px-4">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-500">{item.mobile}</p>
                                    </td>
                                    <td className="py-3 px-4">{item.address}</td>
                                    <td className="py-3 px-4 font-bold text-gray-800">
                                        {item.orderAmount} TK
                                    </td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => handelMakeConfirm(item._id)}
                                            title="make confirm"
                                            className={`btn btn-sm border-0 ${item.status === "pending"
                                                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                                : "bg-green-500 text-white cursor-not-allowed"
                                                }`}
                                            disabled={item.status !== "pending"}
                                        >
                                            {item.status === "pending" ? "Pending" : "Confirmed"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-10 text-gray-500 font-medium"
                                >
                                    কোনো অর্ডার পাওয়া যায়নি
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardOrder;
