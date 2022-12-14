import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

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

    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        async function fetchData() {
            try {
                setLoading(true);
                let { data } = await axios.get(`http://localhost:3008/users/standings`);
                setLeaderboardData(data);
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        }
        fetchData();
    }, [])


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
                    Leaderboards
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Total Points</TableCell>
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
                                        <TableCell>TODO</TableCell>
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

