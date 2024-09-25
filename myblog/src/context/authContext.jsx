import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null    
    )

    const login = async (inputs) => {
        try {
            const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
                withCredentials: true,
            });
            setCurrentUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
        } catch (err) {
            console.error("Login failed", err);
            // Handle error (e.g., show an error message to the user)
        }
    };
    

    const logout = async () => {
        try {
            const res = await axios.post("http://localhost:8800/api/auth/logout", null, {
                withCredentials: true // Ensures cookies are sent with the request
            });
            setCurrentUser(null);
            localStorage.removeItem("user");
        } catch (err) {
            console.error("Logout failed", err);
            // Handle error (e.g., show an error message to the user)
        }
    };
    
useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
}, [currentUser]);

return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
        {children}
    </AuthContext.Provider>
);
};