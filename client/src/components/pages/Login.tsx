import React, { FC, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import { baseUrl } from '../../environment.js';

interface LoginProps {};

const Login: FC<LoginProps> = () => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();

    const [error, setError] = useState('');

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

    async function login(username:string,password:string){
        try{ 
            const response = await axios.post(`${baseUrl}/users/login`,{
                "username":username,
                "password":password
            });

            return response.data.user;
        } catch (error) {           
            console.log(error);
            console.log("invalid login"); 
            setError('invalid login credentials')
            setUsername('')
            setPassword('')
        } 
    }

    const loginFunc = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        // login user authenticating on backend
        const user = await login(username,password);

        // Set cookies to keep user logged in
        Cookies.set('username', user.username);
        Cookies.set('userId', user.userId);
        // extra cookie for admins
        Cookies.set('admin', user.admin.toString());

        (document.getElementById('usernameInput') as HTMLFormElement).value = "";
        (document.getElementById('passwordInput') as HTMLFormElement).value = "";
        setPassword("");
        setUsername("");

        navigate('/picks');
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
                                Log in
                            </Typography>
                            <br />
                            <form id="form-id" onSubmit={loginFunc}>
                                <FormControl variant="standard">
                                    <InputLabel>Username</InputLabel>
                                    <Input id="usernameInput" onChange={handleUsername} value={username}></Input>
                                </FormControl>
                                <br />
                                <FormControl variant="standard">
                                    <InputLabel>Password</InputLabel>
                                    <Input id="passwordInput" type="password" onChange={handlePassword} value={password}></Input>
                                </FormControl>
                                <br/><br/>
                                <Button type="submit">Log in</Button>
                                {
                                    error &&
                                    <Typography variant='subtitle1'>{error}</Typography> 
                                }
                            </form>
                            
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;

