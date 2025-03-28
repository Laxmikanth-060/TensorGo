import "./EmailVerify.css";
import {useState,useEffect} from 'react';
import {Link,useParams} from 'react-router-dom';
import Loader from "../shared/Loader";
import axios from 'axios';


const EmailVerify = () =>{
    const [validUrl,setValidUrl]=useState(false);
    const[loading,setLoading]=useState(false);
    const params = useParams();
    const URL="http://localhost:1234/";

    useEffect(()=>{
        const verifyEmailUrl = async() =>{
            try{
                setLoading(true);
                const url=`${URL}api/auth/users/${params.id}/verify/${params.token}`;
                const {data}=await axios.get(url);
                console.log(data);
                setValidUrl(true);
                setLoading(false);
            }catch(error){
                console.log(error);
                setValidUrl(false);
                setLoading(false);
            }
        }

        verifyEmailUrl();
    },[params]);

    return(
        <div>
    {loading ? ( // Show loader if loading is true
        <Loader />
    ) : validUrl ? ( // Check if the URL is valid after loading
        <div className="email-outer-container">
            <h2 className="email-h2">Email Verification Successful</h2>
            <div className="email-image">
                <img 
                    src="/assets/email.png"
                    alt="tensorgo"
                    className="email-img"
                />
            </div>
            <h6 className="email-text">Login with your registered credentials to continue.</h6>
            <Link to="/login">
                <button className="email-button">Login</button>
            </Link>
        </div>
    ) : (
        <h1 className="email-h1">404 Not Found (Link Expired...)</h1> // Show error message if URL is invalid
    )}
</div>

    )
};

export default EmailVerify;