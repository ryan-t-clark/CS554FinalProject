import React, { FC } from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import Cookies from 'js-cookie';

interface AdminRouteProps {};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const sessionAdmin = Cookies.get('admin');
    
    console.log(sessionAdmin);
    let admin  = false;
    if(sessionAdmin && sessionAdmin === 'true')
        admin = true;

    console.log('admin', admin);
    
    return (
        admin ? children : <Navigate to='/login'/>
    );
}

export default AdminRoute;