import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { URL_LOGIN_CALLBACK } from "../../constants";
import { useEffect } from "react";

function Callback(){
    const [searchParams] = useSearchParams();
    const searchPramCode = searchParams.get("code");
    const searchPramState = searchParams.get("state"); 

    async function getToken(){
        try {
            const accessURL = "https://www.linkedin.com/oauth/v2/accessToken";
            const data = {};
            const headers = {
                'Content-Type': 'x-www-form-urlencoded',
            }
            const params = { 
                grant_type:"authorization_code",
                code: searchPramCode,
                redirect_uri: (window.location.origin + URL_LOGIN_CALLBACK),
                client_id:process.env.REACT_APP_LINKEDIN_CLIENT_ID,
                client_secret: process.env.REACT_APP_LINKEDIN_CLIENT_SECRET
            };

            const config = {params, headers};
            const response = await axios.post( accessURL, data, config);
            console.log("Response:- ", response);
        } catch (error) {
            console.log("Error:- ", error);
        }
    }

    useEffect( ()=>{
        getToken();
    })



    return <div>
        <div> {searchPramCode} </div>
        <div> {searchPramState} </div>
    </div>
}

export default Callback;

// http://localhost:3000/login/callback?
// code=AQTwU6H4SpHKB9qY-M2NAKbsVb00PcEBe1XkH5Cp0vpDReVZ8GkQZB6IyWwjmMHuZsLA4uebNfMtHB9Pq7b6zEvJSuBE9aKYDwA_pka-iht8jHzALMH0YW_jBa9vG_NzgyQ1aDznQUkX4UbK8Wn1cew_6Ov3SE9mbflbEMOkX_6NDl35tXSjcnVou3d5V5_-xZGE1QfG8VDL_6tlmpA
// &state=foobar