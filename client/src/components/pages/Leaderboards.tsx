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
                setLoading(true);
                let { data } = await axios.get(`http://localhost:3008/api/users/standings`);
                setLeaderboardData(sortDecreasing(data));
                setSortState('decreasing');
                console.log(typeof data)
                setLoading(false);
            } catch (e) {
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
    } else {
        console.log(leaderboardData);
        return (
            <div>
                <Typography variant="h4" component="h2" align='center'>
                    Leaderboards
                </Typography>
                <Table className='leaderboard-table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Total Points<IconButton onClick={handleOrder}>
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
                            <TableCell>Pick Percentage<Button></Button></TableCell>
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
            // <Center>
            //     <Box width='60%'>
            //         <VStack>
            //             <Heading as='h2' size='2xl'>Standings</Heading>
            //             <TableContainer width='100%'>
            //                 <Table variant='striped' colorScheme='facebook'>
            //                     <Thead>
            //                         <Tr>
            //                             <Th><Button onClick={handleOrder}>Rank</Button></Th>
            //                             <Th>Contender</Th>
            //                             <Th>Points</Th>
            //                             <Th>Record</Th>
            //                             <Th>Success Rate</Th>
            //                         </Tr>
            //                     </Thead>
            //                     <Tbody>
            //                         {
            //                             playerData?.map((user)=> {
            //                                 return (
            //                                     <Tr>
            //                                         <Td>
            //                                             {
            //                                                 (user.rank == '1' &&
            //                                                 <Text><Badge colorScheme='yellow' variant='subtle' fontSize='0.8rem'>1st</Badge></Text>) ||
            //                                                 (user.rank == '2' &&
            //                                                 <Text><Badge colorScheme='gray' variant='subtle' fontSize='0.8rem'>2nd</Badge></Text>) ||
            //                                                 (user.rank == '3' &&
            //                                                 <Text><Badge colorScheme='orange' variant='subtle' fontSize='0.8rem'>3rd</Badge></Text>) ||
            //                                                 user.rank
            //                                             }
            //                                         </Td>
            //                                         <Td>{user.username}</Td>
            //                                         <Td>{user.points}</Td>
            //                                         <Td>{user.record}</Td>
            //                                         <Td><Progress isAnimated hasStripe value={user.successPct} colorScheme='blue'></Progress></Td>
            //                                     </Tr>
            //                                 )
            //                             }) 
            //                         }
            //                     </Tbody>
            //                 </Table>
            //             </TableContainer>
            //         </VStack>
            //     </Box>
            // </Center>
        )
    }
    
}

export default Leaderboards;

