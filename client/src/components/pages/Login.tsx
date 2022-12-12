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
interface LoginProps {};

const Login: FC<LoginProps> = () => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleUsername = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        const value = target.value
        setUsername(value)
    }

    const handlePassword = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        const value = target.value
        setPassword(value)
    }

    async function login(username:string,password:string){
        try{ const response = await axios.post("http://localhost:3008/users/login",{
            "username":username,
            "password":password
        })
        console.log(response);
        } catch (error){
            console.log(error);
            console.log("invalid login");
        } 
    }

    const loginFunc = (e: React.SyntheticEvent) => {
        e.preventDefault();
        login(username,password);
    }

    const resetForm = () => {
        (document.getElementById('form-id') as HTMLFormElement).reset();
    }

    function togglePassword() {
        var x = document.getElementById("myInput") as HTMLFormElement;
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
    }

    return (
        <Center>
            <VStack>
                <Heading as='h2'>Log in</Heading>
                <Box>
                    <form id='form-id' onSubmit={loginFunc} >
                            <FormControl>
                                <FormLabel id='username' htmlFor='usernameInput'>Username</FormLabel>
                                <Input id='usernameInput' type='text' name='username' value={username} onChange={handleUsername}/>
                                <FormLabel id='password' htmlFor='passwordInput'>Password</FormLabel>
                                <Input id='passwordInput' type='password' name='password' value={password} onChange={handlePassword}/>
                                <Button variant='outline' width="full" mt={4} type="submit" onClick={resetForm}>
                                    Submit
                                </Button>
                            </FormControl>
                    </form>
                </Box>
            </VStack>
        </Center>
    )
}

export default Login;

