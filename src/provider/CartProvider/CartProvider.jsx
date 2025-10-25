import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("products")) || []);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(cartItems));
    }, [cartItems]);

    // 🔹 Listen for external updates (from other tabs/components)
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === "products") {
                const updated = JSON.parse(localStorage.getItem("products")) || [];
                setCartItems(updated);
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // 🔹 Add a manual refetch trigger (for same-tab updates)
    const refreshCart = () => {
        const updated = JSON.parse(localStorage.getItem("products")) || [];
        setCartItems(updated);
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, drawerOpen, setDrawerOpen ,refreshCart}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;