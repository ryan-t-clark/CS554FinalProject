import React, { FC } from 'react';

interface WeekProps {};

const Week: FC<WeekProps> = () => {
    
    
    return (
        <div>
            <h2>This Week</h2>
            <p>will have data on how everyone is doing this week</p>
            <p>when logged in, it will show the user's picks for the week</p>
        </div>
    )
}

export default Week;

