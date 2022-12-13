import React, { FC, useState, useEffect} from 'react';
import { Navigate, NavLink, redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import {
    VStack, 
    HStack,
    Divider, 
    Center, 
    Heading, 
    Text,
    Grid,
    GridItem,
    Box, 
    Image,
    Button, 
    ButtonGroup,
    StackDivider,
    Link,
    LinkBox,
    LinkOverlay,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    Progress,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

interface HeaderProps {};

const Header: FC<HeaderProps> = () => {
    const [currentRoute, setCurrentRoute] = useState('');
    const setRoute = ((route:string) => {
        setCurrentRoute(route);
    })
    return (
        // I might make this responsive like we did with bootstrap header, but thatll be for later
        <Box position='fixed' bg='#393b3d' w='100%' h='12%'>
            <Center marginBottom='2px'>
                <Heading p='10px' color='white' as='h1'>NFL Game Picker</Heading>
            </Center>
            <Center>
                <Link as={RouterLink} to={`/`} color= {currentRoute==='home' ? 'white' : '#545e6f'} className={currentRoute === 'home' ? 'selected-link' : 'nav-link'} >
                    Home
                </Link>
                <Link as={RouterLink} to={`/week`} color= {currentRoute==='week' ? 'white' : '#545e6f'} className={currentRoute === 'week' ? 'selected-link' : 'nav-link'} >
                    Week
                </Link>
                <Link as={RouterLink} to={`/picks`} color= {currentRoute==='picks' ? 'white' : '#545e6f'} className={currentRoute === 'picks' ? 'selected-link' : 'nav-link'} >
                    Picks
                </Link>
                <Link as={RouterLink} to={`/leaderboards`} color= {currentRoute==='leaderboards' ? 'white' : '#545e6f'} className={currentRoute === 'leaderboards' ? 'selected-link' : 'nav-link'} >
                    Leaderboards
                </Link>
                <Link as={RouterLink} to={`/login`} color= {currentRoute==='login' ? 'white' : '#545e6f'} className={currentRoute === 'login' ? 'selected-link' : 'nav-link'} >
                    Login
                </Link>
                <Link as={RouterLink} to={`/signup`} color= {currentRoute==='signup' ? 'white' : '#545e6f'} className={currentRoute === 'signup' ? 'selected-link' : 'nav-link'} >
                    Signup
                </Link>
                <Link as={RouterLink} to={`/logout`} color= {currentRoute==='logout' ? 'white' : '#545e6f'} className={currentRoute === 'logout' ? 'selected-link' : 'nav-link'} onClick={() => { Cookies.remove('user');}}>
                    Logout
                </Link>
            </Center>
        </Box>
        // <AppBar style={{ background: '#393b3d' }}>
        //         <Typography component="h1" variant="h4" padding="10px" align="center">
        //                 NFL Game Picker
        //         </Typography>
                
        //         <Toolbar sx={{ justifyContent: "center" }}>
        //             <div className="nav">
        //                 <NavLink
        //                     to="/"
        //                     style={({ isActive }) => ({
        //                         color: isActive ? '#fff' : '#545e6f',
        //                         background: isActive ? '#1310c0' : '#f0f0f0',
        //                     })}>Home 
        //                 </NavLink>
        //                 <NavLink
        //                     to="/week"
        //                     style={({ isActive }) => ({
        //                         color: isActive ? '#fff' : '#545e6f',
        //                         background: isActive ? '#1310c0' : '#f0f0f0',
        //                     })}>This Week
        //                 </NavLink>
        //                 <NavLink
        //                     to="/picks"
        //                     style={({ isActive }) => ({
        //                         color: isActive ? '#fff' : '#545e6f',
        //                         background: isActive ? '#1310c0' : '#f0f0f0',
        //                     })}>Make Picks
        //                 </NavLink>
        //                 <NavLink
        //                     to="/leaderboards"
        //                     style={({ isActive }) => ({
        //                         color: isActive ? '#fff' : '#545e6f',
        //                         background: isActive ? '#1310c0' : '#f0f0f0',
        //                     })}>Leaderboards
        //                 </NavLink>
        //                 <NavLink
        //                     to="/login"
        //                     style={({ isActive }) => ({
        //                         color: isActive ? '#fff' : '#545e6f',
        //                         background: isActive ? '#1310c0' : '#f0f0f0',
        //                     })}>Log in
        //                 </NavLink>
        //                 <NavLink
        //                     to="/signup"
        //                     style={({ isActive }) => ({
        //                         color: isActive ? '#fff' : '#545e6f',
        //                         background: isActive ? '#1310c0' : '#f0f0f0',
        //                     })}>Sign up
        //                 </NavLink>
        //                 <NavLink
        //                     to="/logout"
        //                     style={({ isActive }) => ({
        //                         color: isActive ? '#fff' : '#545e6f',
        //                         background: isActive ? '#1310c0' : '#f0f0f0',
        //                     })}>Log out
        //                 </NavLink>
        //             </div>
        //         </Toolbar>
        // </AppBar>
    )
}

export default Header;

