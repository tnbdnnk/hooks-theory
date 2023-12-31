# Sing up form:
- потрібно зберігати певні дані в локал сторадж кожен раз, коли оновлюється або емайл або пароль;
- при перезавантаженні сторінки дані мають зберігатись на тому ж місці;

# Clock
Робота з useRef.

Маємо: клас, який зберігає:
- стан state,
- інтервал(локальна змінна),
- при componentDidMount() запускається інтервал,
- при componentWillUnmount() інтервал зупиняється 

Рефакторинг:
- з класу робимо функцію
- потріно зберігати state (import)
- прописуємо state time в функції 
- new Date() - початкове значення. Виклик від new Date() - це виклик конструктора, тобто створення об'єкту, і кожен раз при рендері цього об'єктуб тобто кожен раз, коли буде змінюватись час початкове значення (new Date()) буде змінюватись
- лінива ініціалізація: useState(new Date()) -> useState(() => new Date()) - ця функція викличення лише раз, і те значення, яке вона поверне, буде використане для стану state

Remember: якщо початкове значення state залежить від виразу, треба робити ліниву ініціалізацію (передавати фукцію, яка буде повертати результать цього виразу, щоб воно не викликалось кожен раз)

- з intervalId робимо перемінну 
- componentDidMount -> useEffect()
- при першому рендері пустий масив залежностей useEffect(() => {}, [])
- кожен раз, як запускається ефект, в цьому випадку лише раз на першому рендері, в перемінну intervalId записується id інтервалу, цей інтервал відбувається кожні 1000 мілісекунд, в setTime йде новий new Date()
- stop - це функція. яка буде зупиняти інтервал. Під час stop intervalId буде очищено.

Reminder: під час роботи з класами intervalId була властивість екземпляру, властивість об'єкту, воно ініціалізовувалось один раз при його створенні, і потім в цього об'єкту викликався метод render(). В функціях тіло функції виконується повністю, коли змінюються або пропси, або стейт, і значення змінної intervalId на наступному рендері буде зовсім іншою змінною, зовсім іншим значенням, з попереднього рендеру неможливо отримати ніяких данних.
Якщо винести intervalId ззовні функції: наприклад якщо буде два таймери, ця змінна залишається єдиною для всього коду, і вона буде використовуватися лише в одному з таймерів, буде зберігати дані для останнього таймера, тому другий можливо буде зупинити, а перший ніяк.

Для того, щоб імітувати властивість, тобто для того, щоб імітувати (зберегти значення з попередного рендеру), тобно зробити стабільне значення між рендерами використовуються рефи. 
Взагалі рефи використовуються, щоб отриматти посилання на якийсь дом-вузол, але рефи не оновлюються, не обнуляються, вони створюються лише раз.
Тому в реакті є useRef(). Реф - це можливість зберегти посиланн на дом-елемент.

- let intervalId = null; -> const intervalId = useRef(null); В перемінну intervalId запишеться об'єкт, в якого буде властивість current. useRef() не буде викликатися на кожному виклиці функції, він викликається лише раз на першому рендері. В перемінній intervalId буде зберігатись старий об'єкт, який було створено при першому рендері
- useEffect(() => {
        intervalId = setInterval(() => {
            console.log('This inteval is every 1000s ' + Date.now());
            setTime(new Date());
        }, 1000);
    }, []);  ->  useEffect(() => {
        intervalId.current = setInterval(() => {
            console.log('This inteval is every 1000s ' + Date.now());
            setTime(new Date());
        }, 1000);
    }, []); - коли запускається ефект, на його реф, значення карент записується id інтервалу.
- const stop = () => {
        clearInterval(intervalId);
    }  ->  const stop = () => {
        clearInterval(intervalId.current);
    } - записаний айді в інтервал буде очищатись без проблем на будь якому годиннику, якщо їх в коді декілька

Issue: не зупинявся таймер.
Проблема з вашим кодом полягає в тому, що ви використовуєте константу (intervalId) для зберігання ідентифікатора, який повертає setInterval. Коли компонент повторно рендериться, intervalId створюється заново, а посилання на попередній інтервал втрачається. Як наслідок, виклик clearInterval із новим intervalId не зупиняє попередньо розпочатий інтервал.
Щоб вирішити цю проблему, ви можете використати хук useRef та ініціалізувати його значенням null. Потім, коли компонент монтується, ви можете призначити результат setInterval поточній властивості intervalId ref. Таким чином, intervalId ref зберігатиметься в рендерах.
ADD: return () => clearInterval(intervalId.current);

Потрібно зробити щось типу анмаунт. Коли розмонтовується компонент, його треба підчищати, щоб надалі не заважало роботі, та дані не записувались і не передавались на інші об'єкти. 

Під час роботи з классами використовувалось     
    componentWillUnmount() {
        console.log('This method is called before unmounting of component');
        this.stop();
    }
а з хуку useEffect можна поверати функцію, очищаюча функція return () => clearInterval(intervalId.current); 

# Skip effect on first render
Маємо: - запускається ефект на кожному рендері
- клік на кнопку збільшується на 1

Де буде зручно/корисно не виконувати запуск ефекту на першому рендері: 
- коли виконується http запит, і цей запит має відбуватися лише при update

Використовуємо useRef, тому що useRef - це значення,яке не змінюється між різними рендерами компонента. 

- тому імпортуємо реф з реакту і створюємо const isFirstRender = useRef(true); - це перший рендер. isFirstRender - це об'єкт, у якого у валстивості count буде значення true, яким буде ініціалізуватися
Стандартний варіант ігнорування першого рендеру - виконання перевірки через if.

# Counter. useReduser

Counter with useReducer.

useReducer - це спеціальний хук, який також створений для керування станом, але складніший. Мщжна використовувати, до прикладу, в http запитах, щоб в одному місці(об'єкті) зберігати одразу і данні і помилку, тобто, щоб не робити три useState, а зробити useReducer і зберігати об'єкт.

const [state, dispatch] = useReducer(reducer, initialState, init)
- повертає стан state, який там зберігається, це може бути об'єкт, масив
- reducer - просто функція
- initialState - початковий стан
- init

prevState - актуальне значення Counter
nextState - це 1 чи щось інше, що буде передаватися в setCount()

Під час виклику setCount() викликається countReducer(prevState, nextState) під капотом і повертає нове значення state(тобто count) та перерендерується Counter(). Тепер все працює, але значення не зменшується, тому що на кожну операцію число збільшується на те значення, яке передали в рендері в setCount(1) - тому вносимо зміни в setCount(1) -> setCount({ type: 'increase' (або 'decrease'), payload: 1 }), тобто замість того, щоб передавати в setCount() примітивне значення, передаємо об'єкт, в якому вказуємо тип операції, яку потрібно зробити і значення для виконання операції. 
{ type: 'increase' (або 'decrease'), payload: 1 } - об'єкт, який переходить в nextState, але це вже буде не стан, а дія action. prevState -> state - актуальний стан. 

! В useReducer() правильно використовувати dispatch замість використаного setCount. При використанні useReducer() деструктурується функція dispatch в локальну змінну з ім'ям dispatch. dispatch - це диспечер, який відправляє данні, до прикладу в countReducer(). countReducer() отримує ці данні (дію) і виконує завдання. Замість default: return state; краще використовувати default: throw new Error(`Unsupported action type ${action.type}`); якщо ніяка з дій не підтримується заданим запитам. 

Підсумок: useReducer() - це функція, яка отримує автоматично під капотом актуальний попередній стан state/prevState в момент його виклику, і дію action, тобто, що з цим станом потрібно зробити. Дія action обов'язково має властивість type і payload. Стан може бути не примітивним, це може бути об'єкт, тому: const [state, dispatch] = useReducer(countReducer, { count: 0 }) , function countReducer(state, action) {
    switch(action.type) {
        case 'increment':
            <!-- return state + action.payload; -->
            return {...state, count: state.count + action.payload};
        case 'decrement':
            return {...state, count: state.count - action.payload};
        default: throw new Error(`Unsupported action type ${action.type}`);
    }
} - беремо новий state, розпилюємо туди старий ...state, тому що в об'єкті можуть бути різні дані/властивості, потім властивість count: state.count + action.payload

# Friends. Мемоїзація вирахувать з useMemo. Компонент AuthProvider

Маємо:
- масив імен
- імена зберігаються в стані 
- фільтрація стану
- лічильник

Коли змінюється запит фільтру, змінюється стан, і перерендерується функція Friends(). При кожному рендері функції Friends(), коли змінюється фільтр, виконується friends.filter(), створюється новий об'єкт(новий масив) visibleFriends, який відповідно рендериться. При настисканні на кнопку, count ніяк не впливає на список друзів, але, так як count знаходиться в функції Friends(), при зміні count функція також виконується і відбувається перерендер, тобно friends.filter() виконується н лише при зміні даних фільтру, а й при зміні count. 
Проблема: не потрібно повторно виконувати friends.filter(), якщо filter не змінився, а змінився лише count. Як зробити, щоб friends.filter() не виконувався повторно при зміні count?

Хук useMemo() використовується якщо є якісь довгограючі вирахування, які потрібно виконувати лише при зміні певного пропа або стейта.

useMemo(() => function, input) 
- function - callback, який повертає певне значення 
- input - [] масив залежностей 

useMemo() викличе функцію, виведе дані, виконає рендер лише при зміні filter або friends, так як це прямі залежності виконання функції, count не належить залежностям функції, тому при зміні count не буде виконано дорогий фільтр, useMemo() поверне так звані мемоїзовані/збережені дані з минулого рендеру, useMemo() має пам'ять лише на один рендер (глубина 1 для мемоїзації).

useMemo() слугує для мемоїзації, для того, щоб виконати функцію і запам'ятати результат виконання функції, і потім не викликати функцію до тих пір, поки не зміниться одна із залежностей функції.