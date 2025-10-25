import { createContext, useContext, useRef } from "react";
import LoadingBar from "react-top-loading-bar";

const LoadingBarContext = createContext(null);

export const LoadingBarProvider = ({ children }) => {
    const ref = useRef(null);

    const start = () => ref.current?.continuousStart();
    const complete = () => ref.current?.complete();

    return (
        <LoadingBarContext.Provider value={{ start, complete }}>
            {/* 👇 Global LoadingBar */}
            <LoadingBar color="#669900" ref={ref} height={4} />
            {children}
        </LoadingBarContext.Provider>
    );
};

export const useLoadingBar = () => useContext(LoadingBarContext);