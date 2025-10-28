import toast from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useOrder from "../../../hooks/useOrder";

const DashboardOrder = () => {
    const [order, isLoading, refetch] = useOrder();
    const axiosPublic = useAxiosPublic();

    const handelMakeConfirm = async (id) => {
        try {
            const result = await axiosPublic.patch(`/order/${id}`);
            if (result.data.modifiedCount > 0) {
                toast.success("Order confirmed successfully!");
            } else {
                toast.error("Order confirmation failed!");
            }
            console.log(result.data);
            refetch();
        } catch (err) {
            toast.error(err?.message || "Something went wrong");
            console.error(err);
        }
    };


    if (isLoading) return <Loading />;
    return (
        <div className="text-gray-600 md:p-10">
            <h2 className="text-xl md:text-3xl text-center font-bold mb-4 md:mb-16 text-gray-600">Total Order: {order.length}</h2>
            <div className="overflow-x-auto min-h-screen">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-gray-600">
                            <th>No</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.map((order, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>
                                    <p className="font-semibold">{order.name}</p>
                                    <p>{order.mobile}</p>
                                </td>
                                <td className="font-semibold">{order.address}</td>
                                <td className="font-bold">{order.orderAmount}</td>
                                <td>
                                    <button
                                        onClick={() => handelMakeConfirm(order._id)}
                                        title="make confirm"
                                        className={`btn btn-sm border-0 ${order.status === 'pending' ? 'bg-yellow-600 text-white' : 'bg-green-500 text-white'}`}
                                        disabled={order.status === 'confirm'}
                                    >
                                        {order.status === 'pending' ? 'Pending' : 'Confirmed'}
                                    </button>
                                </td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardOrder;