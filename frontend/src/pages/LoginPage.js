import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from "axios";
// import {getAuth,signInWithEmailAndPassword, signInWithEmailLink} from 'firebase/auth';


const LoginPage=(props)=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');

    const navigate = useNavigate();

    const logIn = async (event)=>{
        //comment1
        event.preventDefault();

        try{
            const config = {
                headers: {
                    "Content-type" : "application/json"
                },
            };

            const {data} = await axios.post(
                "/user/login",
                {
                    email,
                    password,
                },
                config
            );

            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate('/articles');
            console.log(data);
            props.setUser((val)=>!val);
            props.setAlert({msg:"login sucess",type:"success",vis:true});
        }catch(error){
            console.log(error.response.data.message);
            props.setAlert({msg:error.response.data.message,type:"delete",vis:true});
        }
        setTimeout(()=>{
            props.setAlert({msg:null,type:null,vis:false});
        },900);
    }

    return (
        <form>
            <h1>Log In</h1>
            {error && <p className="error">{error}</p>}
            <input 
                placeholder="Your email address"
                value={email}
                onChange={e=>setEmail(e.target.value)}
            />
            <input 
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            />
            <button onClick={logIn}>Log In</button><br/>
            <Link to="/create-account">Don't Have an account? Create one here</Link>
        </form>
        
    );
}

export default LoginPage;

//comment1
// try{
// await signInWithEmailAndPassword(getAuth(),email,password);
// navigate('/articles');
// }
// catch(e){
//     setError(e.message);
// }