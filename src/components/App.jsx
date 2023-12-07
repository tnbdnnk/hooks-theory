import {SingUpForm} from './SingUpForm/SingUpForm';
import {Clock} from './Clock/Clock';
import {SkipEffectOnFirstRender} from './SkipEffectOnFirstRender/SkipEffectOnFirstRender';
import {Counter} from './Counter/Counter' ;
export const App = () => {
    return (
        <div>
            <SingUpForm/>

            <Clock/>

            <SkipEffectOnFirstRender/>

            <Counter/>
        </div>
    );
};
