import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

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
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import baseUrl from '../../environment.js';

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

    const navigate = useNavigate();

    const handleWeekChange = (event: SelectChangeEvent) => {
        setWeekNum(parseInt(event.target.value) as number);
      };

    //get game list
    useEffect( () => {
        async function fetchData() {
            try {
                setLoading(true);
                let { data } = await axios.get(`${baseUrl.baseUrl}/games/getweek/${weekNum}`);
                setGameData(data);
                let userData = await axios.get(`${baseUrl.baseUrl}/picks/user/pickarray/${weekNum}/${userId}`);
                setPickData(userData.data)
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
                let { data } = await axios.get(`${baseUrl.baseUrl}/picks/user/pickarray/${weekNum}/${userId}`);
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
                    <Card key={uuidv4()}>
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
                    <Card key={uuidv4()}>
                        <CardContent>
                            <Typography>
                                {game.awayTeam} at {game.homeTeam}
                            </Typography>
                            <FormGroup>
                                <FormControlLabel defaultValue='' 
                                    checked={selected === game.homeTeam} 
                                    disabled={(selected !== game.homeTeam)}
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
                    <Card key={uuidv4()}>
                        <CardContent>
                            <Typography>
                                {game.awayTeam} at {game.homeTeam}
                            </Typography>
                            <FormGroup>
                                <FormControlLabel defaultValue='' checked={false} disabled={game.awayFinalScore !== null} control={<Checkbox onChange={(event) => addToPicks(game._id, game.homeTeam, game.homeSpread)} />} label={homeLabel} />
                                <FormControlLabel defaultValue='' checked={false} disabled={game.awayFinalScore !== null} control={<Checkbox onChange={(event) => addToPicks(game._id, game.awayTeam, game.awaySpread)} />} label={awayLabel} />
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

    const nextIndexAbove = (index: number) => {
        let moveIndex = index - 1;
        while (moveIndex >= 0) {
            if (pickData[moveIndex] === null || pickData[moveIndex]!.submitted === false) {
                return moveIndex;
            }
            moveIndex--;
        }
        return moveIndex;
    }

    const moveUp = (index: number) => {

        /*
            needs some more logic on boundaries
        */

        let copyArray = [...pickData]; //make copy of array -- forces re-render
        let x = copyArray[index];

        let moveIndex = nextIndexAbove(index);

        copyArray[index] = copyArray[moveIndex];
        copyArray[moveIndex] = x

        //adjust weights
        if (copyArray[index] !== null) {
            copyArray[index]!.weight = 10 - index;
        }

        if (copyArray[moveIndex] !== null) {
            copyArray[moveIndex]!.weight = 10 - moveIndex;
        }

        setPickData(copyArray);
    }

    const nextIndexBelow = (index: number) => {
        let moveIndex = index + 1;
        while (moveIndex < 10) {
            if (pickData[moveIndex] === null || pickData[moveIndex]!.submitted === false) {
                return moveIndex;
            }
            moveIndex++;
        }
        return moveIndex;
    }

    const moveDown = (index: number) => {

        let copyArray = [...pickData]; //make copy of array -- forces re-render
        let x = copyArray[index];

        let moveIndex = nextIndexBelow(index);

        copyArray[index] = copyArray[moveIndex];
        copyArray[moveIndex] = x

        //adjust weights
        if (copyArray[index] !== null) {
            copyArray[index]!.weight = 10 - index;
        }

        if (copyArray[moveIndex] !== null) {
            copyArray[moveIndex]!.weight = 10 - moveIndex;
        }

        setPickData(copyArray);
    }

    async function onSubmit() {
        let picks = {
            pick10: pickData[0],
            pick9: pickData[1],
            pick8: pickData[2],
            pick7: pickData[3],
            pick6: pickData[4],
            pick5: pickData[5],
            pick4: pickData[6],
            pick3: pickData[7],
            pick2: pickData[8],
            pick1: pickData[9],
        }
        console.log(picks);

        let result = await axios.post(`${baseUrl.baseUrl}/picks/submit`, {
            week: weekNum,
            userId: userId,
            picks: picks
        });

        navigate("/week");

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
            <div className='make-picks'>
                <Typography variant="h4" component="h2" align='center'>
                    Your Picks for Week {weekNum}
                </Typography>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Choose Week</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={weekNum.toString()}
                        label="Week Number"
                        onChange={handleWeekChange}
                        >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Table className='weighted-table'>
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
                                                    !submittedList.includes(pick.gameId) && nextIndexBelow(index) !== 10 ?
                                                    <IconButton onClick={(event) => moveDown(index)} ><ArrowDownwardIcon /></IconButton> : ""
                                                }
                                                {
                                                    !submittedList.includes(pick.gameId) && nextIndexAbove(index) !== -1 ?
                                                    <IconButton onClick={(event) => moveUp(index)}><ArrowUpwardIcon /></IconButton> : ""
                                                }
                                                {
                                                    !submittedList.includes(pick.gameId) ?
                                                    <IconButton onClick={(event) => {removeFromPicks(index, pick.gameId)}}><CancelIcon /></IconButton> : ""
                                                }
                                            </TableCell>
                                            : 
                                            <TableCell>

                                            </TableCell>                                      
                                        }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>

                <Button onClick={onSubmit}>Submit Picks</Button>

                <br /><br /><br /><br />
                <Typography variant="h4" component="h2">
                    Week {weekNum}'s Games
                </Typography>

                {gameList}

            </div>
        )
    }
}

export default MakePicks;

