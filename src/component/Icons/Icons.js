import classes from "./Icons.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture, faPlaneArrival , faYinYang } from '@fortawesome/free-solid-svg-icons';



// export function TaxiIcon({pramClass}){
//     return <span className={ pramClass + " " + classes["icon"] +   " material-symbols-outlined"}> local_taxi </span>
// }


export function FilghtTakeOff({pramClass}){
    return <span ><FontAwesomeIcon icon={faPlaneDeparture} className={"awd"} /></span>

}


export function FilghtLand({pramClass}){
    return <span > <FontAwesomeIcon icon={faPlaneArrival} className={"awd"} /> </span>;
}

export function TwoPlane({pramClass}){
    return <span className={classes["icon"]} > <FontAwesomeIcon icon={faYinYang} className={"awd"} /> </span>
}
