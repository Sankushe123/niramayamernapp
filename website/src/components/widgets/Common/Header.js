'use client'
import { Menu } from "lucide-react";

const Header = ({ toggleSidebar }) => {
    return (
        <header className="bg-white shadow-md p-3 flex items-center">
            <button onClick={toggleSidebar} className="mr-4">
                <Menu className="w-6 h-6" />
            </button>
        </header>
    );
};

export default Header;