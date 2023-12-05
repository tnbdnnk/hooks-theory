import { useState, useEffect } from "react";

// кастомний HOOK UseLocalStorage займається зберіганням та оновленням цього шматка стейту при його зміні
export default function useLocalStorage(key, defaultValue) {
    // хук буде керувати станом const [password, setPassword] = useState(() => {return JSON.parse(window.localStorage.getItem('password') ?? '')});
    const [state, setState] = useState(() => {
        return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue
    });
    // якщо в localstorage є дані для нашого ключа - тоді використовувати їх, якщо ні - то
    // використовувати дефолтове значення
    
    // після створення хука юслокалсторадж заміняємо ним юсстейсти в функції SingUpForm і для ключів використовуємо емайл або пасворд
    // а для дефолтвелю використовуємо пусту строку 

    // useLocalStorage контроює state, а також використовує ефект 
    // кожного разу, як змінюється state, ефект буде виконувати 
    // window.localStorage.setItem('email', JSON.stringify(email)); по кожному ключу і вставляти 
    // туди свій стейт коли він змінюється
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    // після змін в функціі SingUpForm нічого не працює , тому oо ми нічого не отримуємо з функції. Повертати функція буде масив 
    return [state, setState]; // це масив значень для фунції SingUpForm [email, setEmail] and [password, setPassword] значення state прийде в email/password, значення setState прийде в setEmail / setPassword
}

