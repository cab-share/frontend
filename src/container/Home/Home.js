import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilghtLand, FilghtTakeOff, TaxiIcon } from '../../component/Icons/Icons';
import { DROP_CONST, PICK_CONST } from '../../constants';
import classes from './Home.module.css'



function Home({type, setType}) {
  const navigate =  useNavigate();
  const [isConfirm, setIsConfirmed] = useState(false);
  
  useEffect( ()=>{
    if(isConfirm)
      navigate("/select-location");
    console.log(type);
  }, [isConfirm, navigate]);

  function setPickOrDrop(CONST){
    setType(CONST);
    setIsConfirmed(true);
  }

    return (
        <div className={classes["container"]}  >
            <div className={classes["name"]} onClick={ ()=>{setPickOrDrop(PICK_CONST)}}> 
                <span> Going Airport? </span> 
                <FilghtTakeOff/>
            </div>
            <div className={classes["name"]} onClick={ ()=>{setPickOrDrop(DROP_CONST)}}> 
                <span> Going Home? </span> 
                <FilghtLand/>
            </div>
        </div>)
}

export default Home;