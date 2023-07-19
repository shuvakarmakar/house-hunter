import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const { token } = await response.json();

                // Store the token in local storage
                localStorage.setItem('token', token);

                const user = { email };
                setUser(user);
                console.log('Login Successful');
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error in login:', error);
        }
    };

    const signup = async (userData) => {
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const { token } = await response.json();

                // Store the token in local storage
                localStorage.setItem('token', token);

                const user = { email: userData.email };
                setUser(user);
                console.log('Signup Successful');
            } else {
                console.log('Signup failed');
            }
        } catch (error) {
            console.error('Error in signup:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        console.log('Logout Successful');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
