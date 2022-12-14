import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

interface HomeProps {};

const Home: FC<HomeProps> = () => {
    return (
        <div >
            <center>
                <Typography variant='h2' gutterBottom>
                    Welcome to NFL Game Picker!
                </Typography>                
            </center>

            <div>
                <Box sx={{ 
                    display: 'block',
	                marginLeft: 'auto',
	                marginRight: 'auto',
	                width: '50%',
                }}>
                    <Typography variant='h4' gutterBottom>
                        NFL Game Picker
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                        NFL Game Picker is a competitive site that will allow users to compete against one another in guessing the outcomes
                        of upcoming NFL games during the regular season. Players will be able to compete for points and bragging rights
                        in this heated competition.
                    </Typography>
                    <br />
                    <Typography variant='h4' gutterBottom>
                        Picks and Scoring
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                        Each week a schedule of games will be released for NFL games. In most cases these games will be released on Tuesday, 
                        and all players will receive an email notification alerting them to the release of the upcoming week's schedule.
                    </Typography>
                    <br />
                    <Typography variant='h4' gutterBottom>
                        Registration
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                        To register, just simply create an account and get picking!
                    </Typography>
                    <br />
                    <Typography variant='h4' gutterBottom>
                        Rules
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                        Each week players will make their picks. Although a player is not required to make all picks, there is no penalty for a loss so it is in a player's best interest to always make their picks.
                        <br />
                        <br />
                        A player is not required to submit all picks at once. As long as a pick is made before a game is started a player is free to submit picks at any time.
                        <br />
                        <br />
                        Each pick made will be given a "confidence weight" from 10 down to 1. For each correct selection a player will receive that many points for that game. Once a "confidence weight" is set for a pick, 
                        that weight is no longer available for any remaining picks. In other words, a player can only choose 1 pick to have a value of 10, 1 pick to have a value of 9 and so on.
                        <br />
                        <br />
                        A pick may not be made on a game that has already begun.
                    </Typography>
                </Box>
            </div>
        </div>
    )
}

export default Home;

