import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import {Button, IconButton} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InputLabel from '@mui/material/InputLabel';

import { baseUrl } from '../../environment.js';

interface LeaderboardsProps {};

interface leaderboardEntry {
    username: string,
    totalPoints: number,
    totalCorrectPicks: number,
    totalIncorrectPicks: number
}

const Leaderboards: FC<LeaderboardsProps> = () => {
    // will be accepting data from backend here on all things users
    // for now here is mock data

    const [leaderboardData, setLeaderboardData] = useState<(leaderboardEntry[])>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [sortState, setSortState] = useState('increasing');
    const sortDecreasing = (arr:leaderboardEntry[]) => {
        let sortedDec = arr.sort((p1, p2) => (p1.totalPoints < p2.totalPoints) ? 1 : (p1.totalPoints > p2.totalPoints) ? -1 : 0);
        return sortedDec;
    }

    const sortIncreasing = (arr:leaderboardEntry[]) => {
        let sortedInc = arr.sort((p1, p2) => (p1.totalPoints > p2.totalPoints) ? 1 : (p1.totalPoints < p2.totalPoints) ? -1 : 0);
        return sortedInc;
    }

    useEffect( () => {
        async function fetchData() {
            try {
                setNotFound(false);
                setLoading(true);
                let { data } = await axios.get(`${baseUrl}/users/standings`);
                setLeaderboardData(sortDecreasing(data));
                setSortState('decreasing');
                setLoading(false);
            } catch (e) {
                setNotFound(true);
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        if(sortState === 'increasing') {
            setLeaderboardData(sortDecreasing(leaderboardData));
        }
        else {
            setLeaderboardData(sortIncreasing(leaderboardData));
        }
      }, [sortState]);

      const handleOrder = () => { 
        if(sortState === 'increasing') setSortState('decreasing')
        else setSortState('increasing')
    }

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    } else if (notFound) {
        return (
            <div>
                Something went wrong... try reloading.
            </div>
        )
    } else {
        return (
            <div>
                <Typography variant="h4" component="h2" align='center'>
                    Leaderboards
                </Typography>
                <Table className='leaderboard-table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Total Points
                                <InputLabel htmlFor="icon-id" sx={{color:'black'}}></InputLabel>
                                <IconButton onClick={handleOrder} id='icon-id'>
                                {
                                    sortState === 'decreasing' &&
                                    <ArrowUpwardIcon></ArrowUpwardIcon>
                                }{
                                    sortState === 'increasing' &&
                                    <ArrowDownwardIcon></ArrowDownwardIcon>
                                }
                            </IconButton></TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Pick Record</TableCell>
                            <TableCell>Pick Percentage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            leaderboardData.map( (user: leaderboardEntry) => {
                                return (
                                    <TableRow key={user.username}>
                                        <TableCell>{user.totalPoints}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.totalCorrectPicks}-{user.totalIncorrectPicks}</TableCell>
                                        <TableCell>{isNaN(user.totalCorrectPicks*100/(user.totalCorrectPicks+user.totalIncorrectPicks)) ?
                                        0 :
                                        user.totalCorrectPicks*100/(user.totalCorrectPicks+user.totalIncorrectPicks)}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }
    
}

export default Leaderboards;

