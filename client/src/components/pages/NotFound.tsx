import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';

interface NotFoundProps{};

const NotFound: FC<NotFoundProps> = () => {
    return (
        <div>
            <Typography variant='h2' align="center">
                404 Page not found
            </Typography>

            <RouterLink to="/">Return home</RouterLink>
            
        </div>
    )
}

export default NotFound;