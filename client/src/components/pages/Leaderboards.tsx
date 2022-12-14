import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';

interface LeaderboardsProps {};

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

    let mockData:Array<any> = 
        [
            {
                rank: '1',
                username: 'John',
                points: 200,
                record: '50-50',
                successPct: 50
            },
            {
                rank: '2',
                username: 'Doe',
                points: 190,
                record: '48-52',
                successPct: 48
            },
            {
                rank: '5',
                username: 'Jimmy',
                points: 120,
                record: '30-70',
                successPct: 30
            },
            {
                rank: '3',
                username: 'Larry',
                points: 180,
                record: '42-58',
                successPct: 42
            },
            {
                rank: '4',
                username: 'Borat',
                points: 155,
                record: '36-64',
                successPct: 36
            },
            {
                rank: '6',
                username: 'Carrie',
                points: 80,
                record: '20-80',
                successPct: 20
            },
            {
                rank: '7',
                username: 'Wookie',
                points: 30,
                record: '10-90',
                successPct: 10
            }
        ]
        const sortDecreasing = (arr:Array<any>) => {
            let sortedDec = arr.sort((p1, p2) => (p1.rank < p2.rank) ? 1 : (p1.rank > p2.rank) ? -1 : 0);
            return sortedDec;
        }
    
        const sortIncreasing = (arr:Array<any>) => {
            let sortedInc = arr.sort((p1, p2) => (p1.rank > p2.rank) ? 1 : (p1.rank < p2.rank) ? -1 : 0);
            return sortedInc;
        }

    let [ order, setOrder ] = useState('decreasing')
    let [ playerData, setPlayerData ] = useState(sortIncreasing(mockData))
    // useEffect to sort data on initial page load
    useEffect(() => {
        if(order === 'increasing') {
            setPlayerData(sortDecreasing(mockData));
        }
        else {
            setPlayerData(sortIncreasing(mockData));
        }
      }, [order]);



    // can implement sorting functions here to sort table data...

    const handleOrder = () => { 
        if(order === 'increasing') setOrder('decreasing')
        else setOrder('increasing')
    }


    return (
        <div>Test</div>
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

export default Leaderboards;

