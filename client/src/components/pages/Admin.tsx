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

import baseUrl from '../../environment.js';

interface AdminProps {};

const Admin: FC<AdminProps> = () => {

    const [ homeScore, sethomeScore ] = useState('');
    const [ awayScore, setawayScore ] = useState('');
    const [ID, setID] = useState('');
    const navigate = useNavigate();

    const handlehomeScore = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        const value = target.value
        sethomeScore(value)
    }

    const handleawayScore = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        const value = target.value
        setawayScore(value)
    }

    const handleID = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        const value = target.value
        setID(value)
    }

    async function updateGame(homeScore:string,awayScore:string,ID:string){
        try{ 
            const response = await axios.post(`${baseUrl.baseUrl}/games/update`,{
                "gameId":ID,
                "homeScore" : homeScore,
                "awayScore": awayScore
            })
            console.log(response);
            
            // const response = await axios.post("http://localhost:3008/users/login",{
            //     "username":username,
            //     "password":password
            // });
            // console.log(response);

            return response.data.user;
        } catch (error) {
            console.log(error);
            console.log("invalid login"); 
        } 
    }

    const updateGameFunc = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        // login user authenticating on backend
        const user = await updateGame(homeScore,awayScore,ID);

        // Set cookies to keep user logged in
        // Cookies.set('username', user.username);
        // Cookies.set('userId', user.userId);
        // extra cookie for admins
        // Cookies.set('admin', user.admin.toString());

        (document.getElementById('HomeScoreInput') as HTMLFormElement).value = "";
        (document.getElementById('AwayScoreInput') as HTMLFormElement).value = "";
        (document.getElementById('IDInput') as HTMLFormElement).value = "";
        sethomeScore("");
        setawayScore("");
        setID("");

        // navigate('/picks');
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
                                Update Game Score
                            </Typography>
                            <br />
                            <form id="form-id" onSubmit={updateGameFunc}>
                                <FormControl variant="standard">
                                    <InputLabel>Home Score</InputLabel>
                                    <Input id="HomeScoreInput" onChange={handlehomeScore}></Input>
                                </FormControl>
                                <br />
                                <FormControl variant="standard">
                                    <InputLabel>Away Score</InputLabel>
                                    <Input id="AwayScoreInput" onChange={handleawayScore}></Input>
                                </FormControl>
                                <br/>
                                <FormControl variant="standard">
                                    <InputLabel>gameId</InputLabel>
                                    <Input id="IDInput" onChange={handleID}></Input>
                                </FormControl>
                                <br />
                                <br/>
                                <Button type="submit">submit</Button>
                            </form>
                            
                        </CardContent>
                        
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Admin;

