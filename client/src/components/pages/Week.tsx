import React, { FC, useState, useEffect } from 'react';
import axios from 'axios'
import Item from '@mui/material/Grid';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Cookies from 'js-cookie';

import baseUrl from '../../environment.js';

interface WeekProps {};

interface Pick {
    gameId: any,
    weight: number,
    selectedTeam: string,
    selectedSpread: number,
    pickResult: boolean | null,
    submitted: boolean
}

interface PickWeek {
    _id: any,
    week: number,
    userId: any,
    username: string,
    totalPoints: number,
    potentialPoints: number,
    pick10: Pick | null,
    pick9: Pick | null,
    pick8: Pick | null,
    pick7: Pick | null,
    pick6: Pick | null,
    pick5: Pick | null,
    pick4: Pick | null,
    pick3: Pick | null,
    pick2: Pick | null,
    pick1: Pick | null,
    totalCorrectPicks: number,
    totalIncorrectPicks: number
}

const Week: FC<WeekProps> = () => {
    
    const [weekNum, setWeekNum] = useState((Number(Cookies.get("week"))));
    const [weekData, setWeekData] = useState([]);
    const [loading, setLoading] = useState(true);
    // weekNum = Cookies.get("week");
    // console.log(parseInt(Cookies.get("week")as string) as number);
    // setWeekNum((Number(Cookies.get("week"))) as number);

    let list = null;

    const handleWeekChange = (event: SelectChangeEvent) => {
        setWeekNum(parseInt(event.target.value) as number);
    };

    useEffect( () => {
        async function fetchData() {
            // setWeekNum((Number(Cookies.get("week"))) as number);
            try {
                setLoading(true);
                let { data } = await axios.get(`${baseUrl.baseUrl}/picks/all/${weekNum}`);
                console.log(data);
                setWeekData(data);
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        }
        fetchData();
    }, [weekNum])

    const style = {
        justifyContent: 'center', alignItems:'center'
      } as const;

    const buildPickWeek = (pickWeek: PickWeek) => {
        
        return (
            <div className='center'>
            <Typography variant="h5" component="h3" align='center'>
                {pickWeek.username}
            </Typography>
            <Typography>
                Total points: {pickWeek.totalPoints}
            </Typography>
            <Typography>
                Potential points: {pickWeek.potentialPoints}
            </Typography>
            <Box sx={style}>
            <Grid container spacing={2} key={uuidv4()}>
                <Grid item sm={12/2} lg={12/5} justifyContent="center" alignItems="center">
                    <Item>
                        <Card >
                            <CardContent className={pickWeek.pick10?.pickResult == null ? 'card-neutral' : pickWeek.pick10?.pickResult ? 'card-correct' : 'card-incorrect'}>
                                {pickWeek.pick10 ? `${pickWeek.pick10.selectedTeam} ${pickWeek.pick10.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className={pickWeek.pick9?.pickResult == null ? 'card-neutral' : pickWeek.pick9?.pickResult ? 'card-correct' : 'card-incorrect'}>
                                {pickWeek.pick9 ? `${pickWeek.pick9.selectedTeam} ${pickWeek.pick9.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className={pickWeek.pick8?.pickResult == null ? 'card-neutral' : pickWeek.pick8?.pickResult ? 'card-correct' : 'card-incorrect'}>
                                {pickWeek.pick8 ? `${pickWeek.pick8.selectedTeam} ${pickWeek.pick8.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className={pickWeek.pick7?.pickResult == null ? 'card-neutral' : pickWeek.pick7?.pickResult ? 'card-correct' : 'card-incorrect'}>
                                {pickWeek.pick7 ? `${pickWeek.pick7.selectedTeam} ${pickWeek.pick7.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className={pickWeek.pick6?.pickResult == null ? 'card-neutral' : pickWeek.pick6?.pickResult ? 'card-correct' : 'card-incorrect'}>
                                {pickWeek.pick6 ? `${pickWeek.pick6.selectedTeam} ${pickWeek.pick6.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className={pickWeek.pick5?.pickResult == null ? 'card-neutral' : pickWeek.pick5?.pickResult ? 'card-correct' : 'card-incorrect'}>
                                {pickWeek.pick5 ? `${pickWeek.pick5.selectedTeam} ${pickWeek.pick5.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className={pickWeek.pick4?.pickResult == null ? 'card-neutral' : pickWeek.pick4?.pickResult ? 'card-correct' : 'card-incorrect'}>
                                {pickWeek.pick4 ? `${pickWeek.pick4.selectedTeam} ${pickWeek.pick4.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className={pickWeek.pick3?.pickResult == null ? 'card-neutral' : pickWeek.pick3?.pickResult ? 'card-correct' : 'card-incorrect'}>
                                {pickWeek.pick3 ? `${pickWeek.pick3.selectedTeam} ${pickWeek.pick3.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className={pickWeek.pick2?.pickResult == null ? 'card-neutral' : pickWeek.pick2?.pickResult ? 'card-correct' : 'card-incorrect'}>
                                {pickWeek.pick2 ? `${pickWeek.pick2.selectedTeam} ${pickWeek.pick2.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className={pickWeek.pick1?.pickResult == null ? 'card-neutral' : pickWeek.pick1?.pickResult ? 'card-correct' : 'card-incorrect'}>
                                {pickWeek.pick1 ? `${pickWeek.pick1.selectedTeam} ${pickWeek.pick1.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
            </Grid>
            <br />
            </Box>
            </div>
        )
    }

    list = weekData &&
        weekData.map( (pickWeek: PickWeek) => {
            return buildPickWeek(pickWeek);
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
                <Typography variant="h4" component="h2" align='center'>
                    Week {weekNum}
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
                        <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <br />
                {list}
            </div>
        )
    }   

    
}

export default Week;

