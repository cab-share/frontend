import { LinkedInOAuth } from "../../service/linkedInOauth2";

function Login(){

    let linkedInOAuth = new LinkedInOAuth();

    console.log(linkedInOAuth.getUrl());

    return (
        <a  
            // target="_blank" 
            href={linkedInOAuth.getUrl()}
        >                
            Confirm
        </a>)
}

export default Login;