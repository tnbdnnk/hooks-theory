import { useState, useEffect, useRef } from "react";

export function SkipEffectOnFirstRender() {
    const [count, setCount] = useState(0);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            console.log(isFirstRender);
            isFirstRender.current = false;
            return;
        }
        
        console.log(`Performance of the effect - ${Date.now()}`);
    });

    return (
        <div>
            <button onClick={() => setCount(c => c + 1)}>{count}</button>
            <p>
                <code>
                    UseEffect
                </code> цей компонент не виконується на першому рендері
            </p> 
        </div>
    )
}