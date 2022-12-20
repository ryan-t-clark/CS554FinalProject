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
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import baseUrl from '../../environment.js';
interface LoginProps {};

const Login: FC<LoginProps> = () => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleUsername = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        const value = target.value
        setUsername(value)
    }

    const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handlePassword = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        const value = target.value
        setPassword(value)
    }

    async function login(username:string,password:string){
        try{ 
            const response = await axios.post(`${baseUrl.baseUrl}/users/login`,{
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

        // (document.getElementById('usernameInput') as HTMLFormElement).value = "";
        // (document.getElementById('passwordInput') as HTMLFormElement).value = "";
        setPassword("");
        setUsername("");

        navigate('/picks');
    }

    var cardStyle = {
        display: 'block',
        width: '40vw',
        transitionDuration: '0.3s',
        height:'40vh',
        marginTop: '10vh',
        background: '#B0D1D8',
        borderWidth: '2px',
        borderColor: 'black',
        padding:'20px',
    }

    return (
        <div>
            <Grid container
            spacing={0}
            direction="column"
            alignItems="center">
                <Grid item direction='column' justifyContent="center" alignItems="center" >
                    <Card style={cardStyle} sx={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);'}}>
                        <CardContent>                
                            <Typography variant="h3" component="h2" align='center'>
                                Log in
                            </Typography>
                            <br />
                            <Typography align='center'>
                                <form id="form-id" onSubmit={loginFunc} text-align='center'>
                                    <FormControl sx={{ m: 1, width: '40ch' }}  variant="outlined">
                                        <InputLabel htmlFor="usernameInput">Username</InputLabel>
                                        <OutlinedInput id="usernameInput" style={{width:'100%', height:'100%'}} onChange={handleUsername} value={username} label="Username"/>
                                    </FormControl>
                                    <br />
                                    <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            // id="outlined-name"
                                            value={password}
                                            onChange={handlePassword}
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                        {/* <InputLabel>Password</InputLabel>
                                        <Input id="passwordInput" type="password" onChange={handlePassword} value={password}></Input> */}
                                    </FormControl>
                                    <br/><br/>
                                    <Button type="submit">Log in</Button>
                                    {
                                        error &&
                                        <Typography variant='subtitle1'>{error}</Typography> 
                                    }
                                </form>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;

