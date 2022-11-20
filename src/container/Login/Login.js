import classes from './Login.module.css';
import { LinkedInOAuth } from "../../service/linkedInOauth2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLinkedinIn, faGoogle} from '@fortawesome/free-brands-svg-icons'
import { useGoogleLogin } from '@react-oauth/google';


function Login(){

    let linkedInOAuth = new LinkedInOAuth("csrftoken", window.location.origin);
    const login = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: success
      });

    async function  success(tokenResponse){
        console.log("Token:- ", tokenResponse);
        // setTimeout( async()=>{
        //     const userInfo = await axios
        //     .get('https://www.googleapis.com/oauth2/v3/userinfo', {
        //       headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        //     })
        //     .then(res => res.data);
        //   console.log(userInfo);

        // }, 5000 )

    }

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