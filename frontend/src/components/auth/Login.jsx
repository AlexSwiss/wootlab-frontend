import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";

function Login () {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try{
            const loginUser = {email, password};
            const loginResponse = await axios.post("http://localhost:8000/api/auth/login", loginUser);
            console.log(loginResponse.data.data)
            setUserData({
                token: loginResponse.data.data.token.token,
                user: loginResponse.data.data
            });

            localStorage.setItem("auth-token", loginResponse.data.data.token.token);
            history.push("/");
        } catch(err) {
            err.response.data.message && setError(err.response.data.message)
        }
        
    };
    
    return (
        <div className="login">
            <h2>Login</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form onSubmit={submit}>
                <label>Email: </label>
                <input type="email" id="email" onChange={e => setEmail(e.target.value)}/>
                <label>Password: </label>
                <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
                <input type="submit" value="Login" className="btn btn-primary" />
            </form>
        </div>
    );
}
 
export default Login;