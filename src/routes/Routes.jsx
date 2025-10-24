import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ViewMore from "../pages/ViewMore/ViewMore";

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
            }
        ]
    }
])

export default router;