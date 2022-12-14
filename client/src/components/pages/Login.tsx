import React, { FC, useState } from 'react';
import Cookies from 'js-cookie';
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
import { useNavigate } from 'react-router-dom';
interface LoginProps {};

const Login: FC<LoginProps> = () => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();

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
        try{ 
            const response = await axios.post("http://localhost:3008/users/login",{
                "username":username,
                "password":password
            });
            console.log(response);

            return response.data.user;
        } catch (error) {
            console.log(error);
            console.log("invalid login"); 
        } 
    }

    const loginFunc = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        // login user authenticating on backend
        const user = await login(username,password);

        // Set cookies to keep user logged in
        Cookies.set('username', user.username);
        Cookies.set('userId', user.userId);
        // extra cookie for admins
        Cookies.set('admin', user.admin.toString());

        (document.getElementById('usernameInput') as HTMLFormElement).value = "";
        (document.getElementById('passwordInput') as HTMLFormElement).value = "";
        setPassword("");
        setUsername("");

        navigate('/picks');
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
                                <Button variant='outline' width="full" mt={4} type="submit">
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

