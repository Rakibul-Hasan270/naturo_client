import { useLoadingBar } from "react-top-loading-bar";

const Spinner = () => {

    const { start, complete } = useLoadingBar({
        color: "blue",
        height: 2,
    });

    return (
        <div onClick={() => start()}>
               Btn 
        </div>
    );
};

export default Spinner;