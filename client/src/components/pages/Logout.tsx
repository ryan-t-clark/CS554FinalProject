import React, { FC, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Navigate, Route, RouteProps } from 'react-router-dom';


interface LogoutProps {};

const Logout: FC<LogoutProps> = () => {
    Cookies.remove('username'); 
    Cookies.remove('userId'); 
    Cookies.remove('admin');

    return (
        <Navigate to='/'/>
    )

}

export default Logout;