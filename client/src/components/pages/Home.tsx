import React, { FC } from 'react';

interface HomeProps {};

const Home: FC<HomeProps> = () => {
    return (
        <div>Changing</div>
        // <Center paddingBottom='100px'>
        //     <Box w='50%'>
        //         <Center>
        //             <Heading as='h2' size='xl'>Welcome to NFL Game Picker!</Heading>
        //         </Center>
        //         <Spacer />
        //         <br></br>
        //         <Box>
        //             <Heading as='h3' size='md'>NFL Game Picker</Heading>
        //             <br></br>
        //             <Text>
        //                 NFL Game Picker is a competitive site that will allow users to compete against one another in guessing the outcomes
        //                 of upcoming NFL games during the regular season. Players will be able to compete for points and bragging rights
        //                 in this heated competition.
        //             </Text>
        //         </Box>
        //         <br></br>
        //         <Box>
        //             <Heading as='h3' size='md'>Picks and Scoring</Heading>
        //             <br></br>
        //             <Text>
        //                 Each week a schedule of games will be released for NFL games. In most cases these games will be released on Tuesday, 
        //                 and all players will receive an email notification alerting them to the release of the upcoming week's schedule.
        //             </Text>
        //             <br></br>
        //         </Box>
        //         <br></br>
        //         <Box>
        //             <Heading as='h3' size='md'>Registration</Heading>
        //             <br></br>
        //             <Text> To register, just simply create an account and get picking! </Text>
        //         </Box>
        //         <br></br>
        //         <Box>
        //             <Heading as='h3' size='md'>Rules</Heading>
        //             <br></br>
        //             <Text>
        //                 Each week players will make their picks. Although a player is not required to make all picks, there is no penalty for a loss so it is in a player's best interest to always make their picks.
        //             </Text>
        //             <br></br>
        //             <Text>
        //                 A player is not required to submit all picks at once. As long as a pick is made before a game is started a player is free to submit picks at any time.
        //             </Text>
        //             <br></br>
        //             <Text>
        //                 Each pick made will be given a "confidence weight" from 10 down to 1. For each correct selection a player will receive that many points for that game. Once a "confidence weight" is set for a pick, 
        //                 that weight is no longer available for any remaining picks. In other words, a player can only choose 1 pick to have a value of 10, 1 pick to have a value of 9 and so on.
        //             </Text>
        //                 <br></br>
        //             <Text>A pick may not be made on a game that has already begun.</Text>
        //         </Box>
        //         <br></br>
        //         <Box>
        //             <Heading as='h3' size='md'>Weekly Scedule</Heading>
        //             <br></br>
        //             <Text> There are 18 weeks in the competition </Text>
        //             <br></br>
        //             <Text> We can edit this stuff later... </Text>
        //             <TableContainer maxWidth='100%'>
        //                 <Table variant='striped'>
        //                     <Thead>
        //                         <Tr>
        //                             <Th>Week</Th>
        //                             <Th>Week Start</Th>
        //                             <Th>Week End</Th>
        //                         </Tr>
        //                     </Thead>
        //                     <Tbody>
        //                         <Tr>
        //                             <Td>Week 1</Td>
        //                             <Td>Week 1 Start</Td>
        //                             <Td>Week 1 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 2</Td>
        //                             <Td>Week 2 Start</Td>
        //                             <Td>Week 2 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 3</Td>
        //                             <Td>Week 3 Start</Td>
        //                             <Td>Week 3 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 4</Td>
        //                             <Td>Week 4 Start</Td>
        //                             <Td>Week 4 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 5</Td>
        //                             <Td>Week 5 Start</Td>
        //                             <Td>Week 5 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 6</Td>
        //                             <Td>Week 6 Start</Td>
        //                             <Td>Week 6 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 7</Td>
        //                             <Td>Week 7 Start</Td>
        //                             <Td>Week 7 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 8</Td>
        //                             <Td>Week 8 Start</Td>
        //                             <Td>Week 8 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 9</Td>
        //                             <Td>Week 9 Start</Td>
        //                             <Td>Week 9 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 10</Td>
        //                             <Td>Week 10 Start</Td>
        //                             <Td>Week 10 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 11</Td>
        //                             <Td>Week 11 Start</Td>
        //                             <Td>Week 11 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 12</Td>
        //                             <Td>Week 12 Start</Td>
        //                             <Td>Week 12 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 13</Td>
        //                             <Td>Week 13 Start</Td>
        //                             <Td>Week 13 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 14</Td>
        //                             <Td>Week 14 Start</Td>
        //                             <Td>Week 14 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 15</Td>
        //                             <Td>Week 15 Start</Td>
        //                             <Td>Week 15 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 16</Td>
        //                             <Td>Week 16 Start</Td>
        //                             <Td>Week 16 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 17</Td>
        //                             <Td>Week 17 Start</Td>
        //                             <Td>Week 17 End</Td>
        //                         </Tr>
        //                         <Tr>
        //                             <Td>Week 18</Td>
        //                             <Td>Week 18 Start</Td>
        //                             <Td>Week 18 End</Td>
        //                         </Tr> 
        //                     </Tbody>
        //                 </Table>
        //             </TableContainer>
        //         </Box>
        //         <br></br>
        //     </Box>
        // </Center>
    )
}

export default Home;

