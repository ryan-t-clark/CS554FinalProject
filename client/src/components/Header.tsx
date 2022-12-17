import React, { FC, useState, useEffect, useCallback} from 'react';
import { Navigate, NavLink, redirect, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

interface HeaderProps {};

const Header: FC<HeaderProps> = () => {

    const userId = Cookies.get('userId');
    const admin = Cookies.get("admin");
    const { pathname } = useLocation();
    var Picks,Profile,Logout,Signup,Login,Admin;

    if(admin){
        Admin = <NavLink
            to="/admin"
            style={({ isActive }) => ({
                color: isActive ? '#fff' : '#545e6f',
                background: isActive ? '#1310c0' : '#f0f0f0',
            })}>Admin Page
            </NavLink>
    }

    if(userId){
        Picks = <NavLink
                    to="/picks"
                    style={({ isActive }) => ({
                        color: isActive ? '#fff' : '#545e6f',
                        background: isActive ? '#1310c0' : '#f0f0f0',
                    })}>Make Picks
                </NavLink>
        Profile = <NavLink
                    to="/profile"
                    style={({ isActive }) => ({
                        color: isActive ? '#fff' : '#545e6f',
                        background: isActive ? '#1310c0' : '#f0f0f0',
                    })}>Profile
                </NavLink>
        Logout = <NavLink
                    to="/logout"
                    style={({ isActive }) => ({
                        color: isActive ? '#fff' : '#545e6f',
                        background: isActive ? '#1310c0' : '#f0f0f0',
                    })}>Logout
                </NavLink>
    } else {
        Login = <NavLink
                    to="/login"
                    style={({ isActive }) => ({
                        color: isActive ? '#fff' : '#545e6f',
                        background: isActive ? '#1310c0' : '#f0f0f0',
                    })}>Log in
                </NavLink>
        Signup = <NavLink
                    to="/signup"
                    style={({ isActive }) => ({
                        color: isActive ? '#fff' : '#545e6f',
                        background: isActive ? '#1310c0' : '#f0f0f0',
                    })}>Sign up
                </NavLink>
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
                        {Picks}
                        <NavLink
                            to="/leaderboards"
                            style={({ isActive }) => ({
                                color: isActive ? '#fff' : '#545e6f',
                                background: isActive ? '#1310c0' : '#f0f0f0',
                            })}>Leaderboards
                        </NavLink>
                        {Login}
                        {Signup}
                        {Profile}
                        {Logout}
                        {Admin}
                    </div>
                </Toolbar>
        </AppBar>
    )
}

export default Header;

