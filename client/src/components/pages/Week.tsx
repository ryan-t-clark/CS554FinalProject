import React, { FC, useState, useEffect } from 'react';
import axios from 'axios'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

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

    const buildPickWeek = (pickWeek: PickWeek) => {
        
        return (
            <div>
                <Typography variant="h5" component="h3">
                    {pickWeek.username}
                </Typography>
                <Grid container key={pickWeek._id}>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} justifyContent="center" direction="row" alignItems="center" container>
                        <Card>
                            <CardContent>
                                {pickWeek.pick10 ? `${pickWeek.pick10.selectedTeam} ${pickWeek.pick10.selectedSpread}`  : "No pick submitted"}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                {pickWeek.pick9 ? `${pickWeek.pick9.selectedTeam} ${pickWeek.pick9.selectedSpread}` : "No pick submitted"}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                {pickWeek.pick8 ? `${pickWeek.pick8.selectedTeam} ${pickWeek.pick8.selectedSpread}` : "No pick submitted"}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                {pickWeek.pick7 ? `${pickWeek.pick7.selectedTeam} ${pickWeek.pick7.selectedSpread}` : "No pick submitted"}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                {pickWeek.pick6 ? `${pickWeek.pick6.selectedTeam} ${pickWeek.pick6.selectedSpread}` : "No pick submitted"}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                {pickWeek.pick5 ? `${pickWeek.pick5.selectedTeam} ${pickWeek.pick5.selectedSpread}` : "No pick submitted"}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                {pickWeek.pick4 ? `${pickWeek.pick4.selectedTeam} ${pickWeek.pick4.selectedSpread}` : "No pick submitted"}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                {pickWeek.pick3 ? `${pickWeek.pick3.selectedTeam} ${pickWeek.pick3.selectedSpread}` : "No pick submitted"}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                {pickWeek.pick2 ? `${pickWeek.pick2.selectedTeam} ${pickWeek.pick2.selectedSpread}` : "No pick submitted"}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                {pickWeek.pick1 ? `${pickWeek.pick1.selectedTeam} ${pickWeek.pick1.selectedSpread}` : "No pick submitted"}
                            </CardContent>
                        </Card>
                               
                    </Grid>
                </Grid>
                <br />
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
                <Typography variant="h4" component="h2">
                        This Week
                </Typography>
                <br />
                
                {list}
               
            

            </div>
        )
    }   

    
}

export default Week;

