import classes from './Login.module.css';
import { LinkedInOAuth } from "../../service/linkedInOauth2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLinkedinIn, faGoogle} from '@fortawesome/free-brands-svg-icons'

import { useGoogleLogin } from '@react-oauth/google';



function Login(){

    let linkedInOAuth = new LinkedInOAuth("csrftoken", window.location.origin);
    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
      });

    return (
        <div className={classes["container"]} >
            <button className={classes["link"]}  onClick={()=>{login()}} >                
                    <FontAwesomeIcon icon={faGoogle} className={classes["font-awesome"] + " " + classes["google"]} />
                    <span> Login with Google </span>
            </button>
            <a className={classes["link"]}  href={linkedInOAuth.getUrl()} >                
                <FontAwesomeIcon icon={faLinkedinIn} className={classes["font-awesome"] + " " + classes["linkedin"] } />
                <span> Login with LinkedIn </span>
            </a>
        </div>)
}

export default Login;