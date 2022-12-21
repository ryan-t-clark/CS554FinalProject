import React, { FC, useState } from 'react';
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
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import { baseUrl } from '../../environment.js';

interface SignupProps {};

const Signup: FC<SignupProps> = () => {
    
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
    
    const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    async function signup(username:string,password:string){
        try {
            const response = await axios.post(`${baseUrl}/users/signup`,{
            "username":username,
            "password":password
        })
        console.log(response);
        } catch (error: any){
            // console.log(error);
            console.log("invalid login");
            setError(error.response.data.error)
            setUsername('')
            setPassword('')
        } 
    }

    const signupFunc = (e: React.SyntheticEvent) => {
        e.preventDefault();
        signup(username,password);

        // (document.getElementById('usernameInput') as HTMLFormElement).value = "";
        // (document.getElementById('passwordInput') as HTMLFormElement).value = "";
        setPassword("");
        setUsername("");

        navigate('/login');
    }

    var cardStyle = {
        display: 'block',
        width: '40vw',
        transitionDuration: '0.3s',
        height:'40vh',
        marginTop: '10vh',
        background: '#83D7E6',
        borderWidth: '2px',
        borderColor: 'black',
        padding:'20px',
        color: 'black',
    }

    return (
        <div>
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center">
                <Card style={cardStyle} sx={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);'}}>
                    <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center">
                        <Grid item justifyContent="center" alignItems="center" >
                            <CardContent>                
                                <Typography variant="h3" component="h2" align='center'>
                                    Sign Up
                                </Typography>
                                <br />
                                {/* <Typography align='center'> */}
                                    <form id="form-id" onSubmit={signupFunc}>
                                        <FormControl sx={{ m: 1, width: '40ch'}}  variant="outlined" >
                                            <InputLabel htmlFor="usernameInput" sx={{color: 'black', background:'transparent'}}>Username</InputLabel>
                                            <OutlinedInput 
                                                id="usernameInput" 
                                                style={{width:'100%', height:'100%'}} 
                                                sx={{background:'white'}}
                                                onChange={handleUsername} 
                                                value={username}/>
                                        </FormControl>
                                        <br />
                                        <FormControl sx={{ m: 1, width: '40ch'}} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password" sx={{color: 'black'}}>Password</InputLabel>
                                            <OutlinedInput
                                                // id="outlined-name"
                                                value={password}
                                                onChange={handlePassword}
                                                id="outlined-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                sx={
                                                    {background:'white'}
                                                }
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
                                               
                                            />
                                            {/* <InputLabel>Password</InputLabel>
                                            <Input id="passwordInput" type="password" onChange={handlePassword} value={password}></Input> */}
                                        </FormControl>
                                        <br/><br/>
                                        <Button type="submit" sx={{color: 'black', background: 'white'}}>Sign Up</Button>
                                        {
                                            error &&
                                            <Typography variant='subtitle1' component='h3'>{error}</Typography> 
                                        }
                                    </form>
                                {/* </Typography> */}
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </div>
    )
}

export default Signup;
