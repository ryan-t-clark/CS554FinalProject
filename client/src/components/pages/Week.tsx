import React, { FC, useState, useEffect } from 'react';
import axios from 'axios'
import Item from '@mui/material/Grid';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

interface WeekProps {};

interface Pick {
    gameId: any,
    weight: number,
    selectedTeam: string,
    selectedSpread: number,
    pickResult: boolean,
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
    
    const [weekNum, setWeekNum] = useState(1);
    const [weekData, setWeekData] = useState([]);
    const [loading, setLoading] = useState(true);

    let list = null;

    useEffect( () => {
        async function fetchData() {
            try {
                setLoading(true);
                let { data } = await axios.get(`http://localhost:3008/picks/all/${weekNum}`);
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
            <Box sx={style}>
            <Grid container spacing={2} key={uuidv4()}>
                <Grid item sm={12/2} lg={12/5} justifyContent="center" alignItems="center">
                    <Item>
                        <Card >
                            <CardContent className='card'>
                                {pickWeek.pick10 ? `${pickWeek.pick10.selectedTeam} ${pickWeek.pick10.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className='card'>
                                {pickWeek.pick9 ? `${pickWeek.pick9.selectedTeam} ${pickWeek.pick9.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className='card'>
                                {pickWeek.pick8 ? `${pickWeek.pick8.selectedTeam} ${pickWeek.pick8.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className='card'>
                                {pickWeek.pick7 ? `${pickWeek.pick7.selectedTeam} ${pickWeek.pick7.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className='card'>
                                {pickWeek.pick6 ? `${pickWeek.pick6.selectedTeam} ${pickWeek.pick6.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className='card'>
                                {pickWeek.pick5 ? `${pickWeek.pick5.selectedTeam} ${pickWeek.pick5.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className='card'>
                                {pickWeek.pick4 ? `${pickWeek.pick4.selectedTeam} ${pickWeek.pick4.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className='card'>
                                {pickWeek.pick3 ? `${pickWeek.pick3.selectedTeam} ${pickWeek.pick3.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className='card'>
                                {pickWeek.pick2 ? `${pickWeek.pick2.selectedTeam} ${pickWeek.pick2.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={12/2} lg={12/5}>
                    <Item>
                        <Card>
                            <CardContent className='card'>
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
                    This Week
                </Typography>
                <br />
                {list}
            </div>
        )
    }   

    
}

export default Week;

