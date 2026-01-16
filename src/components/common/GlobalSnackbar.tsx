import { useEffect, useState } from "react";
import { useUserStore } from "@store/userStore";
import { createPortal } from "react-dom";

const GlobalSnackbar = () => {
    const { snackbar, closeSnackbar } = useUserStore();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (snackbar.isOpen) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(closeSnackbar, 300); // Wait for fade out animation
            }, 3000); // Show for 3 seconds
            return () => clearTimeout(timer);
        }
    }, [snackbar.isOpen, closeSnackbar]);

    if (!snackbar.isOpen && !visible) return null;

    return createPortal(
        <div className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-xl">🎉</span>
            <span className="font-bold text-sm whitespace-nowrap">{snackbar.message}</span>
        </div>,
        document.body
    );
};

export default GlobalSnackbar;
