import { MdOutlineEdit } from "react-icons/md";
import Loading from "../../../components/Loading/Loading";
import useAllItem from "../../../hooks/useAllItem";
import { FaTrashAlt } from "react-icons/fa";
import Notiflix from "notiflix";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const DashboardProduct = () => {
    const [products, isLoading, refetch] = useAllItem();
    const axiosPublic = useAxiosPublic();

    const handelDeleteProduct = product => {
        Notiflix.Confirm.show(
            "Are you sure?",
            "You won’t be able to revert this!",
            "Yes, Delete it",
            "Cancel",
            async () => {
                try {
                    const result = await axiosPublic.delete(`/items/${product._id}`);
                    if (result.data.deletedCount > 0) {
                        toast.success(`${product.name} has benn delete`);
                        refetch();
                    }
                    Notiflix.Notify.success("Product removed from cart", { timeout: 1000 });
                } catch (error) {
                    console.error(error);
                    Notiflix.Report.failure(
                        "Error",
                        "Failed to delete product. Please try again.",
                        "OK"
                    );
                }
            },
            {
                width: "320px",
                okButtonBackground: "#3085d6",
                titleColor: "#e84118",
            }
        );
    }

    if (isLoading) return <Loading></Loading>
    return (
        <div className="text-gray-600">
            <h2 className="text-xl md:text-3xl font-bold text-center">Total Product: {products.length}</h2>

            <div className="overflow-x-auto mt-5 md:mt-11">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-gray-600">No</th>
                            <th className="text-gray-600">Name</th>
                            <th className="text-gray-600">Category</th>
                            <th className="text-gray-600">Edit</th>
                            <th className="text-gray-600">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, idx) => <tr key={idx}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={product.image}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{product.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-semibold">
                                    {product.category}
                                </td>
                                <td>
                                    <Link to={`/dashboard/edit-product/${product._id}`}>
                                        <button title="Edit Product" className="btn border-0 bg-green-600"><MdOutlineEdit className="text-white"></MdOutlineEdit></button>
                                    </Link>
                                </td>
                                <th>
                                    <button onClick={() => handelDeleteProduct(product)} title="Delete Product" className="btn bg-white border-0 shadow"><FaTrashAlt className="text-red-600"></FaTrashAlt></button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardProduct;