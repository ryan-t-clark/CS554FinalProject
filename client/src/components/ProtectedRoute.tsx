import React, { FC } from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ProtectedRouteProps {};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const session = Cookies.get('userId');
    
    let authenticated  = false;
    if(session)
        authenticated = true;

    console.log('authenticated user', authenticated);
    
    return (
        authenticated ? children : <Navigate to='/login'/>
    );
}

export default ProtectedRoute;