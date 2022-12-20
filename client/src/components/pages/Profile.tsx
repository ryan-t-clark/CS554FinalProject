import React, { FC,useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import baseUrl from '../../environment.js';

interface ProfileProps {};

const Profile: FC<ProfileProps> = () => {

    const [selectedFile,setSelectedFile] = useState<File>();
    const [loaded, setLoaded] = useState(0);

    const userId = Cookies.get('userId');
    
    async function handleselectedFile(event: React.ChangeEvent<HTMLInputElement>){
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0] as File);
            setLoaded(0);
        }
      }
    
    async function handleUpload(){
        const data = new FormData()
        if(selectedFile){
            data.append('profile_pic', selectedFile as Blob, userId as string);
        

            axios.post(`${baseUrl.baseUrl}/upload`, data, {
                onUploadProgress: ProgressEvent => {
                    if(ProgressEvent.total){
                        setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100)
                    }
                }
            })
            .then(res => {
                console.log(res.statusText)
            })
        }
    }

    return (
        <div >
            
            <Typography variant='h2' gutterBottom align='center'>
                Welcome to your profile!
            </Typography>
            <Box
                component='img'
                src={`${baseUrl.baseUrl}/images/${userId}_profile_pic.jpg`}
                alt='user profile pic'
                sx={{
                    height: 170,
                    width: 170
                }}
            />
            <Button variant="contained" component="label">
                Upload
                <div className="App">
                    <input type="file" name="" id="" onChange={handleselectedFile} />
                    <button onClick={handleUpload}>Upload</button>
                    <div> {loaded} %</div>
                </div>
                {/* <input hidden accept="image/*" multiple type="file" onChange={updateImage}/> */}
            </Button>
            {/* <img src = {selectedImage}></img> */}
        </div>
    )
}

export default Profile;

