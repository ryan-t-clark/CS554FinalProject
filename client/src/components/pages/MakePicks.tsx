import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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

interface Pick {
    gameId: any,
    weight: number,
    selectedTeam: string,
    selectedSpread: number,
    pickResult: boolean | null,
    submitted: boolean
}

interface MakePicksProps {};

const MakePicks: FC<MakePicksProps> = () => {
    
    const userId = Cookies.get('userId');

    const [weekNum, setWeekNum] = useState(1)
    const [loading, setLoading] = useState(true);
    const [gameData, setGameData] = useState([]);
    const [pickData, setPickData] = useState<(Pick | null)[]>([null,null,null,null,null,null,null,null,null,null]);

    let gameList = null;

    //get game list
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


    //get user picks
    useEffect( () => {
        async function fetchData() {
            try {
                setLoading(true);
                let { data } = await axios.get(`http://localhost:3008/picks/user/pickarray/${weekNum}/${userId}`);
                setPickData(data);
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        }
        fetchData();
    }, []);


    const buildGameList = (game: Game) => {

        const homeLabel = `${game.homeTeam} ${game.homeSpread}`
        const awayLabel = `${game.awayTeam} ${game.awaySpread}`

        //
        // USING BUTTONS HERE IS TEMPORARY -- JUST WANTED TO BE ABLE TO ADD/REMOVE FROM THE TABLE
        // DOES NOT REFLECT ACTUAL FUNCTIONALITY OF THESE BUTTONS
        //

        return (
            <div>
                <Card key={game._id}>
                    <CardContent>
                        <Typography>
                            {game.awayTeam} at {game.homeTeam}
                        </Typography>

                        <Button onClick={(event) => addToPicks(game._id, game.homeTeam, game.homeSpread)}>{homeLabel}</Button>
                        <Button onClick={(event) => addToPicks(game._id, game.awayTeam, game.awaySpread)}>{awayLabel}</Button>

                        {/* <FormGroup>
                            <FormControlLabel control={<Checkbox />} label={homeLabel} />
                            <FormControlLabel control={<Checkbox />} label={awayLabel} />
                        </FormGroup> */}
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

        /*
            gameId: any,
            weight: number,
            selectedTeam: string,
            selectedSpread: number,
            pickResult: boolean,
            submitted: boolean
        */

    // @returns -1 when there is no available index, indicating failure
    const nextAvailableIndex = () => {
        for (let i = 0; i < 10; i++) {
            if (pickData[i] == null) {
                return i;
            }
        }
        return -1;
    }

    const addToPicks = (gameId: string, selectedTeam: string, selectedSpread: number) => {

        const insertIndex = nextAvailableIndex();
        if (insertIndex === -1) return;

        const newPick: Pick = {
            gameId: gameId,
            weight: 10 - insertIndex,
            selectedTeam: selectedTeam,
            selectedSpread: selectedSpread,
            pickResult: null,
            submitted: false
        }

        let newArray = [];
        for (let i = 0; i < 10; i++) {
            i == insertIndex ? newArray.push(newPick) : newArray.push(pickData[i]);
        }
        
        setPickData(newArray);
        
    }


    const removeFromPicks = (index: number) => {

        let copyArray = [...pickData]; //make copy of array -- forces re-render

        /*
            handle logic to reflect changes in game list
        */

        copyArray[index] = null;
        setPickData(copyArray);
    }


    const moveUp = (index: number) => {

        let copyArray = [...pickData]; //make copy of array -- forces re-render
        let x = copyArray[index];

        let moveIndex = index - 1;
        while (moveIndex >= 0) {
            if (copyArray[moveIndex] === null || copyArray[moveIndex]!.submitted === false) {
                break;
            }
            moveIndex--;
        }

        copyArray[index] = copyArray[moveIndex];
        copyArray[moveIndex] = x

        //adjust weights
        if (copyArray[index] !== null) {
            copyArray[index]!.weight = 10 - index;
        }

        if (copyArray[moveIndex] !== null) {
            copyArray[moveIndex]!.weight = 10 - moveIndex;
        }

        console.log(copyArray);
        setPickData(copyArray);
    }


    const moveDown = (index: number) => {

        let copyArray = [...pickData]; //make copy of array -- forces re-render
        let x = copyArray[index];

        let moveIndex = index + 1;
        while (moveIndex < 10) {
            if (copyArray[moveIndex] === null || copyArray[moveIndex]!.submitted === false) {
                break;
            }
            moveIndex++;
        }

        copyArray[index] = copyArray[moveIndex];
        copyArray[moveIndex] = x

        //adjust weights
        if (copyArray[index] !== null) {
            copyArray[index]!.weight = 10 - index;
        }

        if (copyArray[moveIndex] !== null) {
            copyArray[moveIndex]!.weight = 10 - moveIndex;
        }

        console.log(copyArray);
        setPickData(copyArray);
    }


    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        let pickVal = 10;
        return (
            <div>
                <Typography variant="h4" component="h2">
                    Your Picks
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Value</TableCell>
                            <TableCell>Pick</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            pickData.map( (pick: Pick | null, index: number) => {
                                return (
                                    <TableRow key={uuidv4()}>
                                        {/* need to add some sort of indicator that a pick is submitted, like the row being greyed out and there being no available buttons*/}
                                        <TableCell>{pickVal--}</TableCell>
                                        <TableCell>{pick ? `${pick.selectedTeam} ${pick.selectedSpread}` : `No pick`}</TableCell>
                                        <TableCell>
                                            {   
                                                index != 9 ?
                                                <IconButton onClick={(event) => moveDown(index)} ><ArrowDownwardIcon /></IconButton> : ""
                                            }
                                            {
                                                index != 0 ?
                                                <IconButton onClick={(event) => moveUp(index)}><ArrowUpwardIcon /></IconButton> : ""
                                            }
                                            {
                                                <IconButton onClick={(event) => {removeFromPicks(index)}}><CancelIcon /></IconButton> 
                                            }
                                            
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>

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

