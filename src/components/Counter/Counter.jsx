import { useReducer } from "react";

function countReducer(state, action) {
    switch(action.type) {
        case 'increment':
            return state + action.payload;

        case 'decrement':
            return state - action.payload;

        default: throw new Error(`Unsupported action type ${action.type}`);
    }
}

export function Counter() {
    const [count, dispatch] = useReducer(countReducer, 0)

    return (
        <div>
            <p>{count}</p>
            <button
                type="button" 
                // onClick={() => setCount(1)}
                onClick={() => dispatch({ type: 'increment', payload: 1 })}
            >
                Increace
            </button>

            <button
                type="button" 
                // onClick={() => setCount(1)}
                onClick={() => dispatch({ type: 'decrement', payload: 1 })}
            >
                Decrease
            </button>
        </div>
    )
}


// import { useState } from "react";

// export function Counter() {
//     const [count, setCount] = useState(0);

//     return (
//         <div>
//             <p>{count}</p>
//             <button
//                 type="button" 
//                 onClick={() => setCount(state => state + 1)}
//             >
//                 Increace
//             </button>

//             <button
//                 type="button" 
//                 onClick={() => setCount(state => state - 1)}
//             >
//                 Decrease
//             </button>
//         </div>
//     )
// }