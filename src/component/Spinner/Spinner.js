import { TwoPlane } from '../Icons/Icons';
import classes from './Spinner.module.css';

function Spinner(){
    return <div className={classes["container"]} >
        <div className={classes["loader"]} ><TwoPlane/></div>
    </div>
}

export default Spinner;