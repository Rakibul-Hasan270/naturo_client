import Loading from "../../components/Loading/Loading";
import useOrder from "../../hooks/useOrder";

const OrderSuccess = () => {
    const [order, isLoading] = useOrder();
    const latestOrder = order?.[order.length - 1];

    if (isLoading) return <Loading />;

    if (!latestOrder) {
        return (
            <div className="text-center py-20 text-gray-600">
                <h2 className="text-xl font-semibold">No order found.</h2>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6 md:p-10 bg-gray-50 min-h-screen">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
                Thank You for Your Order!
            </h1>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-gray-100">
                <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="text-lg font-semibold text-gray-800">{latestOrder._id}</p>

                    <p className="text-sm text-gray-400 mt-1">
                        {latestOrder.date
                            ? new Date(latestOrder.date).toLocaleString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })
                            : "Date not available"}
                    </p>


                </div>

                <div className="text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-3xl font-bold text-[#FA582D]">
                        {latestOrder.orderAmount} <span className="text-lg">TK</span>
                    </p>
                </div>
            </div>

            {/* Main Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Customer Info */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                            Customer Information
                        </h3>
                        <div className="text-sm text-gray-700 space-y-2">
                            <p>
                                <span className="text-gray-500 font-medium">Name:</span>{" "}
                                {latestOrder.name}
                            </p>
                            <p>
                                <span className="text-gray-500 font-medium">Phone:</span>{" "}
                                {latestOrder.mobile}
                            </p>
                            <p>
                                <span className="text-gray-500 font-medium">Address:</span>{" "}
                                {latestOrder.address}
                            </p>
                            <p>
                                <span className="text-gray-500 font-medium">Note:</span>{" "}
                                {latestOrder.note || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Order Info */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                        Order Information
                    </h3>
                    <div className="text-sm text-gray-700 space-y-3">
                        <p>
                            <span className="text-gray-500 font-medium">Payment:</span>{" "}
                            Cash on delivery
                        </p>
                        <p>
                            <span className="text-gray-500 font-medium">Delivery:</span>{" "}
                            {latestOrder.delivery || "N/A"}
                        </p>
                        <p>
                            <span className="text-gray-500 font-medium">Delivery Charge:</span>{" "}
                            ৳ {latestOrder.deliveryCharge || 0}
                        </p>
                        <p>
                            <span className="text-gray-500 font-medium">Status:</span>{" "}
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${latestOrder.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                                    }`}
                            >
                                {latestOrder.status}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Message */}
            <div className="text-center mt-10 text-gray-600 text-sm">
                We’ll contact you soon to confirm your delivery. 💌
            </div>
        </div>
    );
};

export default OrderSuccess;
