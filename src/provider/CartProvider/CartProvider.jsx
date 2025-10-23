import { createContext, useEffect, useState } from "react";

export const CartContext = createContext()
const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("products")) || []);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, drawerOpen, setDrawerOpen }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;