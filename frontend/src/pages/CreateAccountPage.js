import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from "axios"
// import {getAuth,creatUserWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';



const CreateAccountPage=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [error,setError]=useState('');
    
    
    const navigate = useNavigate();

    const createAccount = async(event)=>{
        event.preventDefault();
            // comment1

        try{
            if(password!==confirmPassword){
                setError('Password and confirm password do not match');
                return;
            }
            const config = {
                headers: {
                    "Content-type" : "application/json"
                },
            };

            const {data} = await axios.post(
                "/user/signUp",
                {
                    email,
                    password,
                },
                config
            );

            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate('/about');
            console.log(data);
        }
        catch(error){
            console.log(error.response.data.message);
        }
    }



    

    return (
        <form>
            <h1>Create Account</h1>
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
            <input 
            type="password"
            placeholder="Re-enter Your Password"
            value={confirmPassword}
            onChange={e=>setConfirmPassword(e.target.value)}
            />
            <button onClick={createAccount}>Create Account</button>
            <Link to="/login">Already have an account ? Log in here</Link>
        </form>
    );
}

export default CreateAccountPage;


//comment1
// try{
//     if(password!==confirmPassword){
//         setError('Password and confirm password do not match');
//         return;
//     }
//     await createUserWithEmailAndPassword(getAuth(),email, password);
//     navigate('/articles');
// }
// catch(e){
//      setError(e.message);
// }