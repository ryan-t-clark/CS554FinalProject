import React, { FC, useState } from 'react';
import axios from 'axios';
import {
    VStack, 
    Center, 
    Heading, 
    FormControl,
    FormLabel,
    Input,
    Box, 
    Button, 
} from '@chakra-ui/react';

interface LogoutProps {};

const Logout: FC<LogoutProps> = () => {

    return (
        <Center>
            <VStack>
                <Box>
                    Sucessfuly Logged out
                </Box>
            </VStack>
        </Center>
    )

}

export default Logout;