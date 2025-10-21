import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div>
            main layout
            <Outlet></Outlet>
        </div>
    );
};

export default Main;