import React, { FC,useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import Cookies from 'js-cookie';

// const gm = require('gm').subclass({imageMagick:true});

interface ProfileProps {};

const Profile: FC<ProfileProps> = () => {
    // const fs = require('fs');
    // const gm = require('gm').subclass({imageMagick:true});
    const [selectedImage, setSelectedImage] = useState('');
    const userId = Cookies.get('userId');
    async function updateImage(event: React.ChangeEvent<HTMLInputElement>){
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            console.log(img);
            var x = URL.createObjectURL(img)

            // gm()
            setSelectedImage(x)
            // var x = URL.createObjectURL(img)
            // setSelectedImage(x)
            console.log("here");
            const formData = new FormData();
            formData.append("image",event.target.files[0]);
            // try{
                // const link = process.env.NODE_ENV === 'production' ? 'http://127.0.0.1:8080/api' : 'http://localhost:3008/api'
                // console.log(link);
                // console.log(`${link}/users/updateImage/${userId}`);
                
                // fetch(`${link}/users/updateImage/${userId}`,{
                    // method:"POST" as string,

                    // body:formData, 
                    // dataType: "json" as Object
                // }) as RequestInit
                // const response = await axios.post(`${link}/users/updateImage/${userId}`,{
                //     "image":x
                // });
                // console.log(response);
            // } catch (error) {
                // console.log(error);
                // console.log(""); 
            // }
            console.log("here 2");
             
            // console.log(URL.createObjectURL(img));
            // console.log(selectedImage);
          }
    }
    // }
    return (
        <div >
            <Typography variant='h2' gutterBottom align='center'>
                Welcome to your profile!
            </Typography>
            <Button variant="contained" component="label">
                Upload
                <input hidden accept="image/*" multiple type="file" onChange={updateImage}/>
            </Button>
            <img src = {selectedImage}></img>
        </div>
    )
}

export default Profile;

