import { useState, useEffect } from 'react';

// Универсальный хук для работы с localstorage
export function useLocalStorage (key) {
    // Локальное / внутреннее состояние хука
    const [data, setData] = useState();

    // Эффект для получения данных из localStorage при инициализации компоненты []
    useEffect(() => {
        const res = JSON.parse(localStorage.getItem(key));
        
        if (res) {
            setData(res);
        }
    }, []);

    // Функция для записи данных в localStorage, передается и вызывается из вне
    const saveData = (newData) => {
        localStorage.setItem(key, JSON.stringify(newData));
        
        // изменим состояние, новыми данными
        setData(newData);
    };
    
    return [data, saveData];
}