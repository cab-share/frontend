import classes from "./Icons.module.css";


export function TaxiIcon(){
    return <span className={ classes["icon"] +   "material-symbols-outlined"}> local_taxi </span>
}

export function FilghtTakeOff(){
    return <span className={ classes["icon"] +   " material-symbols-outlined"}> flight_takeoff </span>
}

export function FilghtLand(){
    return <span className={ classes["icon"] +   " material-symbols-outlined"}> flight_land </span>
}