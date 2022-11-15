import classes from './Login.module.css';
import { LinkedInOAuth } from "../../service/linkedInOauth2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn} from '@fortawesome/free-brands-svg-icons'


function Login(){

    let linkedInOAuth = new LinkedInOAuth("csrftoken", window.location.origin);

    // console.log(linkedInOAuth.getUrl());

    return (
        <div className={classes["container"]} >
            <a  href={linkedInOAuth.getUrl()} className={classes["link"]}>                
                <FontAwesomeIcon icon={faLinkedinIn} className={classes["font-awesome"]} />
                <span> Login with LinkedIn </span>
            </a>
        
        </div>)
}

export default Login;