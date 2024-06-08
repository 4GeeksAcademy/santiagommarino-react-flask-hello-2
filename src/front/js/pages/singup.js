import React, {useState, useContext} from "react";
import {Context} from '../store/appContext';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const {store, actions} = useContext(Context);

    const handleSignup = (e) => {
        e.preventDefault()
        actions.signup(email, password)
        .then((success) => {
            if(!success){
                setMessage('User already exist, please try again');
            }
        })
        .catch((error) => {
            setMessage('An error occured during user signup')
        });
    };

    return (
        <div>
            <h1>Signup</h1>
            <form>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                <br></br>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                <button className="btn btn-secondary" onClick={(e) => handleSignup(e)}>Create</button>
                
            </form>
        </div>

    )


}

