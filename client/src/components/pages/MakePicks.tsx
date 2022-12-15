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
    const [selectedList, setSelectedList] = useState<string[]>([]);
    const [submittedList, setSubmittedList] = useState<string[]>([]);

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
                let selectedIds = [];
                for (let i = 0; i < 10; i++) {
                    if (data[i] !== null) {
                        selectedIds.push(data[i].gameId);
                    }
                }
                setSelectedList(selectedIds);
                setSubmittedList(selectedIds);
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const findGameSelectionById = (gameId: string) => {
        for (let i = 0; i < 10; i++) {
            if (pickData[i] !== null) {
                if (pickData[i]!.gameId === gameId) {
                    return pickData[i]!.selectedTeam;
                }
            }
        }
    }

    const findPickIndex = (gameId: string) => {
        for (let i = 0; i < 10; i++) {
            if (pickData[i] !== null) {
                if (pickData[i]!.gameId === gameId) {
                    return i;
                }
            }
        }
        return -1;
    }

    const buildGameList = (game: Game) => {

        const homeLabel = `${game.homeTeam} ${game.homeSpread}`
        const awayLabel = `${game.awayTeam} ${game.awaySpread}`

        //if the game is submitted, it is immutable
        if (submittedList.includes(game._id)) {
            let selected = findGameSelectionById(game._id);
            return (
                <div>
                    <Card key={game._id}>
                        <CardContent>
                            <Typography>
                                {game.awayTeam} at {game.homeTeam}
                            </Typography>
                            <FormGroup>
                                <FormControlLabel defaultValue='' disabled={true} checked={selected === game.homeTeam} control={<Checkbox />} label={homeLabel} />
                                <FormControlLabel defaultValue='' disabled={true} checked={selected === game.awayTeam} control={<Checkbox />} label={awayLabel} />
                            </FormGroup>
                        </CardContent>
                    </Card>
                </div>
            )
        };

        if (selectedList.includes(game._id)) {
            //game is selected
            let selected = findGameSelectionById(game._id);
            return (
                <div>
                    <Card key={game._id}>
                        <CardContent>
                            <Typography>
                                {game.awayTeam} at {game.homeTeam}
                            </Typography>
                            <FormGroup>
                                <FormControlLabel defaultValue='' 
                                    checked={selected === game.homeTeam} 
                                    disabled={selected !== game.homeTeam}
                                    control={<Checkbox onChange={(event) => removeFromPicks(findPickIndex(game._id),game._id)} />} 
                                    label={homeLabel} />
                                
                                <FormControlLabel defaultValue='' 
                                    checked={selected === game.awayTeam} 
                                    disabled={selected !== game.awayTeam}
                                    control={<Checkbox onChange={(event) => removeFromPicks(findPickIndex(game._id),game._id)} />} 
                                    label={awayLabel} />
                            </FormGroup>
                        </CardContent>
                    </Card>
                </div>
            )

        } else {
            //game is not selected
            return (
                <div>
                    <Card key={game._id}>
                        <CardContent>
                            <Typography>
                                {game.awayTeam} at {game.homeTeam}
                            </Typography>
                            <FormGroup>
                                <FormControlLabel defaultValue='' checked={false} control={<Checkbox onChange={(event) => addToPicks(game._id, game.homeTeam, game.homeSpread)} />} label={homeLabel} />
                                <FormControlLabel defaultValue='' checked={false} control={<Checkbox onChange={(event) => addToPicks(game._id, game.awayTeam, game.awaySpread)} />} label={awayLabel} />
                            </FormGroup>
                        </CardContent>
                    </Card>
                </div>
            )

        }

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

        let selectedCopy = [...selectedList];
        selectedCopy.push(gameId);
        setSelectedList(selectedCopy);
        
        setPickData(newArray);
        
    }


    const removeFromPicks = (index: number, gameId: string | null) => {

        let copyArray = [...pickData]; //make copy of array -- forces re-render

        if (gameId) {
            let newSelected: string[] = [];
            selectedList.forEach( (selection: string) => {
                if (selection !== gameId) {
                    newSelected.push(selection);
                }
            })
            setSelectedList(newSelected);
        }

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
                                        {pick ? 
                                            <TableCell>
                                                {   
                                                    index != 9 && !submittedList.includes(pick.gameId) ?
                                                    <IconButton onClick={(event) => moveDown(index)} ><ArrowDownwardIcon /></IconButton> : ""
                                                }
                                                {
                                                    index != 0 && !submittedList.includes(pick.gameId) ?
                                                    <IconButton onClick={(event) => moveUp(index)}><ArrowUpwardIcon /></IconButton> : ""
                                                }
                                                {
                                                    !submittedList.includes(pick.gameId) ?
                                                    <IconButton onClick={(event) => {removeFromPicks(index, pick.gameId)}}><CancelIcon /></IconButton> : ""
                                                }
                                            </TableCell>
                                            : 
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
                                                <IconButton onClick={(event) => {removeFromPicks(index, null)}}><CancelIcon /></IconButton> 
                                            }
                                            </TableCell>                                      
                                        }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>

                <Button>Submit Picks</Button>

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

