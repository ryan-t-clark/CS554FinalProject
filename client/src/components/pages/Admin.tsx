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

interface AdminProps {};

const Admin: FC<AdminProps> = () => {

    const [ homeScore, sethomeScore ] = useState('');
    const [ awayScore, setawayScore ] = useState('');
    const [ID, setID] = useState('');
    const [week,setWeek] = useState('');
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
    
    const handleWeek  = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        const value = target.value
        setWeek(value)
    }

    async function updateGame(homeScore:string,awayScore:string,ID:string){
        try{ 
            const response = await axios.post(`${baseUrl}/games/update`,{
                "gameId":ID,
                "homeScore" : homeScore,
                "awayScore": awayScore
            })
            console.log(response);

            return response.data.user;
        } catch (error) {
            console.log(error);
            console.log("invalid login"); 
        } 
    }

    async function updateWeek(week:string){
        Cookies.set("week",(week));
        try{ 
            const response = await axios.post(`${baseUrl}/admin/changeWeek/${week}`)
            console.log(response);

            return response.data.user;
        } catch (error) {
            console.log(error);
            console.log("invalid login"); 
        } 
    }

    const updateWeekFunc = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const user = await updateWeek(week);

        (document.getElementById("Week") as HTMLFormElement).value = "";
        setWeek(""); 
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
                                    <InputLabel htmlFor='HomeScoreInput'>Home Score</InputLabel>
                                    <Input id="HomeScoreInput" onChange={handlehomeScore}></Input>
                                </FormControl>
                                <br />
                                <FormControl variant="standard">
                                    <InputLabel htmlFor='AwayScoreInput'>Away Score</InputLabel>
                                    <Input id="AwayScoreInput" onChange={handleawayScore}></Input>
                                </FormControl>
                                <br/>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor='IDInput'>gameId</InputLabel>
                                    <Input id="IDInput" onChange={handleID}></Input>
                                </FormControl>
                                <br />
                                <br/>
                                <Button type="submit">submit</Button>
                            </form>
                            
                        </CardContent>
                        
                    </Card>
                    <Card>
                        <CardContent>                
                            <Typography variant="h4" component="h2">
                                Change Week
                            </Typography>
                            <br />
                            <form id="form-id2" onSubmit={updateWeekFunc}>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor='Week'>Week</InputLabel>
                                    <Input id="Week" onChange={handleWeek}></Input>
                                </FormControl>
                                <br />
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

