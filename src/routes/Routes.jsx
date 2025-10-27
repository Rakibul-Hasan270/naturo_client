import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ViewMore from "../pages/ViewMore/ViewMore";
import Dashboard from "../layout/Dashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import DashboardOrder from "../pages/Dashboard/DashboardOrder/DashboardOrder";
import DashboardProduct from "../pages/Dashboard/DashboardProduct/DashboardProduct";
import DashboardLocalShipping from "../pages/Dashboard/DashboardLocalShipping/DashboardLocalShipping";
import DashboardEditProduct from "../pages/Dashboard/DashboardEditProduct/DashboardEditProduct";
import DashboardPayment from "../pages/Dashboard/DashboardPayment/DashboardPayment";
import DashboardSetting from "../pages/Dashboard/DashboardSetting/DashboardSetting";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/product-details/:id',
                element: <ProductDetails></ProductDetails>,
                loader: ({ params }) => fetch(`http://localhost:9000/items/${params.id}`)
            },
            {
                path: '/view-more/:category',
                element: <ViewMore></ViewMore>,
                loader: ({ params }) => fetch(`http://localhost:9000/categorys/${params.category}`)
            },
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'dashboard-home',
                element: <DashboardHome></DashboardHome>
            },
            {
                path: 'order',
                element: <DashboardOrder></DashboardOrder>
            },
            {
                path: 'products',
                element: <DashboardProduct></DashboardProduct>
            },
            {
                path: 'shipping',
                element: <DashboardLocalShipping></DashboardLocalShipping>
            },
            {
                path: 'payment',
                element: <DashboardPayment></DashboardPayment>
            },
            {
                path: 'setting',
                element: <DashboardSetting></DashboardSetting>
            },
            {
                path: 'edit-product/:id',
                element: <DashboardEditProduct></DashboardEditProduct>,
                loader: ({ params }) => fetch(`http://localhost:9000/items/${params.id}`)
            }
        ]
    }
])

export default router;