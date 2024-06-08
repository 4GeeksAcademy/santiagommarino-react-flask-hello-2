import React, {useState, useContext} from "react";
import {Context} from '../store/appContext';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const {store, actions} = useContext(Context);

    const handleLogin = (e) => {
        e.preventDefault()
        actions.login(email, password)
        .then((success) => {
            if(!success){
                setMessage('Wrong email or password ');
            }
        })
        .catch((error) => {
            setMessage('An error occured during user login')
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <form>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                <br></br>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                <button className="btn btn-secondary" onClick={(e) => handleLogin(e)}>Login</button>
                
            </form>
        </div>

    )


}