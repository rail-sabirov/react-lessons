import { createContext, useState } from 'react';

export const UserContext = createContext({
    userId: 1
});

// Компонент, для локализации состояния и провайдера
export const UserContextProvider = ({ children }) => {
    // Состояние для компонента
    const [userId, setUserId] = useState(1);

    return (
        <UserContext.Provider value={ { userId, setUserId } }>
            { children }
        </UserContext.Provider>
    );
};