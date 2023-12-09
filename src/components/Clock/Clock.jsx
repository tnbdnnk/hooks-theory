import { useEffect, useState, useRef } from 'react';

export function Clock() {
    const [ time, setTime ] = useState(() => new Date());
    const intervalId = useRef(null);

    useEffect(() => {
        intervalId.current = setInterval(() => {
            console.log('This interval is every 1000ms ' + Date.now());
            setTime(new Date());
        }, 1000);
        
        return () => {
            console.log('This clearing function before next call to useEffect: ' + clearInterval(intervalId.current));
            stop();
        };
    }, []);

    const stop = () => {
        // console.log('Press stop.')
        clearInterval(intervalId.current);
    }

    return (
        <div>
            <hr />
            <p>
                Current time: {time.toLocaleTimeString()}
            </p>
            <button type="button" onClick={stop}>
                Stop the clock!
            </button>
            {/* <button type='button' onClick={() => setTime(new Date())}>
                Restart the clock.
            </button> */}
        </div>
    )
}

// import { Component } from "react";
// export class Clock extends Component {
//     state = {
//         time: new Date(),
//     };
//     intervalId = null;

//     componentDidMount() {
//         this.intervalId = setInterval(() => {
//             console.log('This inteval is every 1000s ' + Date.now());
//             this.setState({time: new Date()});
//         }, 1000);
//     }

    // componentWillUnmount() {
    //     console.log('This method is called before unmounting of component');
    //     this.stop();
    // }

//     stop = () => {
//         clearInterval(this.intervalId);
//     }

//     render() {
//         return (
//             <div>
//                 <p>
//                     Current time: {this.state.time.toLocaleTimeString()}
//                 </p>
//                 <button type="button" onClick={this.stop}>
//                     Stop the clock!
//                 </button>
//             </div>
//         )
//     }
// }