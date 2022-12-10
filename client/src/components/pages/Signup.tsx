import React, { FC } from 'react';
import axios from 'axios';

interface SignupProps {};

const Signup: FC<SignupProps> = () => {
    
    
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
    
    
    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={(e: React.SyntheticEvent) => {
                e.preventDefault();
                const target = e.target as typeof e.target & {
                    username: {value:string};
                    password: {value:string};
                }
                const username = target.username.value;
                const password = target.password.value;
                signup(username,password);
            }
            }>
                <label>
                username:
                <input type="text" name="username"></input>
                </label>
                <label>
                password:
                <input type="text" name="password"></input>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Signup;

