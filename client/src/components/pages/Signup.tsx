import React, { FC, useState } from 'react';
import axios from 'axios';

interface SignupProps {};

const Signup: FC<SignupProps> = () => {
    
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleUsername = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        const value = target.value
        setUsername(value)
    }

    const handlePassword = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        const value = target.value
        setPassword(value)
    }
    
    async function signup(username:string,password:string){
        try {const response = await axios.post("http://localhost:3008/users/signup",{
            "username":username,
            "password":password
        })
        console.log(response);
        } catch (error){
            console.log(error);
            console.log("invalid login");
        } 
    }

    const signupFunc = (e: React.SyntheticEvent) => {
        e.preventDefault();
        signup(username,password);

        (document.getElementById('usernameInput') as HTMLFormElement).value = "";
        (document.getElementById('passwordInput') as HTMLFormElement).value = "";
        setPassword("");
        setUsername("");
    }

    function togglePassword() {
        var x = document.getElementById("myInput") as HTMLFormElement;
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
    }

    return (
        <div>Test</div>
    )
}

export default Signup;
