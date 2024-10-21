import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken) setTokenState(storedToken);
    }, []);

    const setToken = (token: string) => {
        Cookies.set('token', token, { expires: 7 });
        setTokenState(token);
    };

    const logout = () => {
        Cookies.remove('token');
        setTokenState(null);
    };

    return (
        <AuthContext.Provider value={{ token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
