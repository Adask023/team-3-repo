import React, { useState } from "react";

const Login = () => {
    const [login, setLogin] = useState("");
    const handleSubmit = (e) => {
        if(login.length > 0){
            localStorage.setItem("login", login)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input value={login} onChange={(e) => setLogin(e.target.value)}></input>
            <button>Login</button>
        </form>
    )
}

export default Login;