import {SingUpForm} from './SingUpForm/SingUpForm';
import {Clock} from './Clock/Clock';
import {SkipEffectOnFirstRender} from './SkipEffectOnFirstRender/SkipEffectOnFirstRender';

export const App = () => {
    return (
        <div>
            <SingUpForm/>

            <Clock/>

            <SkipEffectOnFirstRender/>
        </div>
    );
};
