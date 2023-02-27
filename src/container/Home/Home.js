import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilghtLand, FilghtTakeOff} from '../../component/Icons/Icons';
import { DROP_CONST, PICK_CONST, NAV_PREV_BOOK, URL_BOOKINGS, URL_SELECT_LOCATION } from '../../constants';
import classes from './Home.module.css'



function Home({type, setType}) {
  const navigate =  useNavigate();
  const [isConfirm, setIsConfirmed] = useState(false);
  
  useEffect( ()=>{
    if(isConfirm){
      if(type === NAV_PREV_BOOK)
        navigate(URL_BOOKINGS);
      else
        navigate(URL_SELECT_LOCATION, {
          state: {
            type: type
          }
        });
    }
    console.log(type);

  }, [isConfirm, navigate, type]);

  function setState(CONST){

    switch (CONST) {
      case DROP_CONST:
        setType(DROP_CONST);
        setIsConfirmed(true);
        break;

        case PICK_CONST:
          setType(PICK_CONST);
          setIsConfirmed(true);
          break;

        case NAV_PREV_BOOK:
          setType(NAV_PREV_BOOK);
          setIsConfirmed(true);
          break;
    
      default:
        break;
    }
  }

    return (
        <div className={classes["container"]}  >
            <div className={classes["name"]} onClick={ ()=>{setState(PICK_CONST)}}> 
                <span> Going Airport? </span> 
                <FilghtTakeOff/>
            </div>
            <div className={classes["name"]} onClick={ ()=>{setState(DROP_CONST)}}> 
                <span> Going Home? </span> 
                <FilghtLand/>
            </div>
            <div className={classes["name"] + " " + classes["prev-book"] } onClick={ ()=>{setState(NAV_PREV_BOOK)}}> 
                <span> Previous Booking </span> 
            </div>
        </div>)
}

export default Home;