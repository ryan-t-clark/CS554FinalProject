import React, { FC, useState } from 'react';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';


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
        try {const response = await axios.post("http://127.0.0.1:8080/users/signup",{
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

    return (
        <div>
            <Grid container
            spacing={0}
            direction="column"
            alignItems="center">
                <Grid>
                    <Card>
                        <CardContent>                
                            <Typography variant="h4" component="h2">
                                Sign up
                            </Typography>
                            <br />
                            <form id="form-id" onSubmit={signupFunc}>
                                <FormControl variant="standard">
                                    <InputLabel>Username</InputLabel>
                                    <Input id="usernameInput" onChange={handleUsername}></Input>
                                </FormControl>
                                <br />
                                <FormControl variant="standard">
                                    <InputLabel>Password</InputLabel>
                                    <Input id="passwordInput" type="password" onChange={handlePassword}></Input>
                                </FormControl>
                                <br/><br/>
                                <Button type="submit">Sign up</Button>
                            </form>
                            
                        </CardContent>
                        
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Signup;
