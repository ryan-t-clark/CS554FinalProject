import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

interface Game {
    _id: any,
    week: number,
    gameStart: string,
    homeTeam: string,
    awayTeam: string,
    homeSpread: number,
    awaySpread: number,
    homeFinalScore: number | null,
    awayFinalScore: number | null,
}

interface MakePicksProps {};

const MakePicks: FC<MakePicksProps> = () => {
    
    const [weekNum, setWeekNum] = useState(1)
    const [loading, setLoading] = useState(true);
    const [gameData, setGameData] = useState([]);

    let gameList = null;

    useEffect( () => {
        async function fetchData() {
            try {
                setLoading(true);
                let { data } = await axios.get(`http://localhost:3008/games/getweek/${weekNum}`);
                setGameData(data);
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        }
        fetchData();
    }, [weekNum]);


    const buildGameList = (game: Game) => {

        const homeLabel = `${game.homeTeam} ${game.homeSpread}`
        const awayLabel = `${game.awayTeam} ${game.awaySpread}`

        return (
            <div>
                <Card key={game._id}>
                    <CardContent>
                        <Typography>
                            {game.awayTeam} at {game.homeTeam}
                        </Typography>

                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label={homeLabel} />
                            <FormControlLabel control={<Checkbox />} label={awayLabel} />
                        </FormGroup>
                    </CardContent>
                </Card>
                <br />
            </div>
            
        )
    }

    gameList = gameData &&
        gameData.map( (game: Game) => {
            return buildGameList(game);
        })

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        return (
            <div>
                <Typography variant="h4" component="h2">
                    Your Picks
                </Typography>
                
                <p>pick table will go here</p>

                <br /><br /><br /><br />
                <Typography variant="h4" component="h2">
                    This Week's Games
                </Typography>

                {gameList}

            </div>
        )
    }
}

export default MakePicks;

