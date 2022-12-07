import React, { FC } from 'react';
import axios from 'axios';

interface LoginProps {};

const Login: FC<LoginProps> = () => {



    async function login(username:string,password:string){
        try{ const response = await axios.post("http://localhost:3008/users/login",{
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
            <h2>Log in</h2>
            <form onSubmit={(e: React.SyntheticEvent) => {
                e.preventDefault();
                const target = e.target as typeof e.target & {
                    username: {value:string};
                    password: {value:string};
                }
                const username = target.username.value;
                const password = target.password.value;
                login(username,password);
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

export default Login;

