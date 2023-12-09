import {SingUpForm} from './SingUpForm/SingUpForm';
import {Clock} from './Clock/Clock';
import {SkipEffectOnFirstRender} from './SkipEffectOnFirstRender/SkipEffectOnFirstRender';
import {Counter} from './Counter/Counter' ;
import { Friends } from './Friends/Friends';

export const App = () => {
    return (
        <div>
            <SingUpForm/>

            <Clock/>

            <SkipEffectOnFirstRender/>

            <Counter/>

            <Friends/>
        </div>
    );
};
