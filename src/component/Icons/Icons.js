import classes from "./Icons.module.css";


export function TaxiIcon({pramClass}){
    return <span className={ pramClass + " " + classes["icon"] +   " material-symbols-outlined"}> local_taxi </span>
}

export function FilghtTakeOff({pramClass}){
    return <span className={ pramClass + " " + classes["icon"] +   " material-symbols-outlined"}> flight_takeoff </span>
}

export function FilghtLand({pramClass}){
    return <span className={ pramClass + " " + classes["icon"] +   " material-symbols-outlined"}> flight_land </span>
}

export function TwoPlane({pramClass}){
    return <span className={ pramClass + " " + classes["icon"] +   " material-symbols-outlined"}> connecting_airports </span>
}
