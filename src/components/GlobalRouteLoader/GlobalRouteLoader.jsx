import { useEffect } from "react";
import { useLoadingBar } from "../../provider/LoadingBarProvider/LoadingBarProvider";
import { useNavigation } from "react-router-dom";

const GlobalRouteLoader = () => {
    const navigation = useNavigation();
    const { start, complete } = useLoadingBar();

    useEffect(() => {
        if (navigation.state === "loading") {
            start();
        } else {
            complete();
        }
    }, [navigation.state]);

    return null;
};

export default GlobalRouteLoader;