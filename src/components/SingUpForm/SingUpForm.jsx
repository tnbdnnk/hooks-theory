import { useState, useEffect } from "react";
// import styles from './SingUpForm.module.css';

// при першому рендері юсефект записує пусту строку, але після перезавантаження 
// потрібно щоб імейл ініціалізувався значенням з локал стораджа, так само і пароль

// HOOK UseLocalStorage займається зберіганням та оновленням цього шматка стейту при його зміні
const useLocalStorage = (key, defaultValue) => {
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

export function SingUpForm() {
    const [email, setEmail] = useLocalStorage('email', '');
    // початковим значенням цього снату буде або те, що поверне window.localStorage.getItem або це буде пуста строка
    const [password, setPassword] = useLocalStorage('password', '');
    
    // - //передавши в юсстейт пусту строку(початкове значення) можна передати туди звернення до локакл сторадж
    // // проблема: це звернення буде викликатися під час кожного рендеру, тому додаємо функцію в юсстейт, тоді юсстейт буде викликати функцію лише один раз
    // const [email, setEmail] = useState(
    //     // цей шматок коду буде виконуватися ли =ше під час першого рендеру (називається лінива ініціалізація стану - передаєте посилання на функцію, яка повертає початкове значення) 
    //     // позбавляємось від звернення до локалстораджа на кожному наступному рендері
    //     // ТАКИМ ЧИНОМ МИ ПОКРАЩИЛИ ПРОДУКТИВНІСТЬ 
    //     () => {
    //     return JSON.parce(window.localStorage.getItem('email') ?? '')
    // });
    // // початковим значенням цього снату буде або те, що поверне window.localStorage.getItem або це буде пуста строка
    // const [password, setPassword] = useState(() => {
    //     return JSON.parse(window.localStorage.getItem('password') ?? '')
    // });
    
    const handleChange = e => {
        const { name, value } =e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;

            case 'password':
                setPassword(value);
                break;

            default:
                return;
        }
    };

    // // цей ефект буде писати в локал сторадж значення імейлу
    // // після додавання в useLocalStorage ефекту , ці ефекти більше непотрібні 
    // useEffect(() => {
    //     window.localStorage.setItem('email', JSON.stringify(email));
    // }, [email]);

    // useEffect(() => {
    //     window.localStorage.setItem('password', JSON.stringify(password));
    // }, [password]);

    return (
        <form>
            <label>
                <span>Email</span>
                <input 
                    type="email" 
                    name="email"
                    onChange={handleChange}
                    value={email}
                />
            </label>
            <label>
                <span>Password</span>
                <input 
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={password}
                />
            </label>
            <button type="submit">
                Submit
            </button>
        </form>
    )
}


/* ВИСНОВКИ: 
хук useLocalStorage дозволяє зробити логіку для перевикористання, де збурігається state, 
інінціалізуємо цей state з Local Storage,
і кожен раз оновлюємо Local Storage при оновленні state,
а все зав'язано на вхідних значеннях (key) 
*/