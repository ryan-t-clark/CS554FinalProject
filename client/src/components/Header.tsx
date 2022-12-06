import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface HeaderProps {};

const Header: FC<HeaderProps> = () => {
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
                        <NavLink
                            to="/logout"
                            style={({ isActive }) => ({
                                color: isActive ? '#fff' : '#545e6f',
                                background: isActive ? '#1310c0' : '#f0f0f0',
                            })}>Log out
                        </NavLink>
                    </div>
                </Toolbar>
        </AppBar>
    )
}

export default Header;

