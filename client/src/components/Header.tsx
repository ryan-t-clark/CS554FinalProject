import React, { FC, useState, useEffect} from 'react';
import { Navigate, NavLink, redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

interface HeaderProps {};

const Header: FC<HeaderProps> = () => {

    const logout = () => {
        Cookies.remove('username'); 
        Cookies.remove('userId'); 
        Cookies.remove('admin');
    }
    
    return (
        <AppBar style={{ background: '#393b3d' }}>
                <Typography component="h1" variant="h4" padding="10px" align="center">
                        NFL Game Picker
                </Typography>
                
                <Toolbar sx={{ justifyContent: "center" }}>
                    <div className="nav">
                        <NavLink
                            to="/"
                            style={({ isActive }) => ({
                                color: isActive ? '#fff' : '#545e6f',
                                background: isActive ? '#1310c0' : '#f0f0f0',
                            })}>Home 
                        </NavLink>
                        <NavLink
                            to="/week"
                            style={({ isActive }) => ({
                                color: isActive ? '#fff' : '#545e6f',
                                background: isActive ? '#1310c0' : '#f0f0f0',
                            })}>This Week
                        </NavLink>
                        <NavLink
                            to="/picks"
                            style={({ isActive }) => ({
                                color: isActive ? '#fff' : '#545e6f',
                                background: isActive ? '#1310c0' : '#f0f0f0',
                            })}>Make Picks
                        </NavLink>
                        <NavLink
                            to="/leaderboards"
                            style={({ isActive }) => ({
                                color: isActive ? '#fff' : '#545e6f',
                                background: isActive ? '#1310c0' : '#f0f0f0',
                            })}>Leaderboards
                        </NavLink>
                        <NavLink
                            to="/login"
                            style={({ isActive }) => ({
                                color: isActive ? '#fff' : '#545e6f',
                                background: isActive ? '#1310c0' : '#f0f0f0',
                            })}>Log in
                        </NavLink>
                        <NavLink
                            to="/signup"
                            style={({ isActive }) => ({
                                color: isActive ? '#fff' : '#545e6f',
                                background: isActive ? '#1310c0' : '#f0f0f0',
                            })}>Sign up
                        </NavLink>
                        <Button
                            onClick={logout}
                            variant='contained'
                        >
                            Log out
                        </Button>
                    </div>
                </Toolbar>
        </AppBar>
    )
}

export default Header;

