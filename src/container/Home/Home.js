import { FilghtLand, FilghtTakeOff, TaxiIcon } from '../../component/Icons/Icons';
import classes from './Home.module.css'


function Home({}) {
    return (
        <div className={classes["container"]}  >
            <div> 
                <span> Going Airport? </span> 
                <FilghtTakeOff/>
            </div>
            <div> 
                <span> Going Home? </span> 
                <FilghtLand/>
            </div>
        </div>)
}

export default Home;