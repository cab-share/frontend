import classes from './Login.module.css';
import { LinkedInOAuth } from "../../service/linkedInOauth2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import { googleLogout,useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { URL_PEER_SELECTION } from '../../constants';

function Login(){
    const [ user, setUser ] = useState(null);
    const [ profile, setProfile ] = useState(null);
    const [comments,setComments]=useState([])
    let listItems = []
    const location = useLocation()
    const navigate = useNavigate()
    
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
      });

      useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                        console.log(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );
        useEffect(
            () => {
                // console.log(profile);
                // if(profile){
                //     console.log(profile.name)
                //     axios.post('http://127.0.0.1:8000/api/cabshare/sharinglogic/fetchall/', {
                //         "name": profile.name,
                //         "timing": location.state.timing,
                //         "latitude": location.state.latitude,
                //         "longitude": location.state.longitude,
                //         "type": location.state.type,
                //         "address": location.state.address
                //       })
                //       .then(function (response) {
                //         console.log(response.data.data);
                //         setComments(response.data.data) 
                //         console.log(comments)
                //         //
                //         for(let i = 0; i < comments.length; i++) {
                //             console.log(comments[i]);
                //           }
                //       })
                //       .catch(function (error) {
                //         console.log(error);
                //       });
                      
    // if(user){
    // listItems = comments.map(
    //     (element) => {
    //         return (
    //             <div>
                    
    //             <span>{element.name}</span>
    //             <br></br>
    //             <span>{element.distance}</span>
    //             </div>
    //         )
    //     }
    // )
    // }
    if(profile)
    navigate(URL_PEER_SELECTION,{
        state: {
            name: profile.name,
            type: location.state.type,
            address: location.state.address,
            latitude: location.state.latitude,
            longitude: location.state.longitude,
            timing: location.state.timing
        }
    })},
         [ profile , navigate]
        )
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };
    
   
        

    return (
        
        user ? (
            
            <p>{listItems}</p>
            )
        :(

    <div className={classes["container"]} >
            <button className={classes["link"]}  onClick={()=>{login()}} >                
                    <FontAwesomeIcon icon={faGoogle} className={classes["font-awesome"] + " " + classes["google"]} />
                    <span> Login with Google </span>
            
            </button>
            <button className={classes["link"]} onClick={logOut}>
                <span>    Log out</span>
            </button>
            </div>
        )
    )

        
}

export default Login;