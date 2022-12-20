import React, { FC,useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import Cookies from 'js-cookie';
import { saveAs } from 'file-saver';
import baseUrl from '../../environment.js';

// const gm = require('gm').subclass({imageMagick:true});

interface ProfileProps {};

const Profile: FC<ProfileProps> = () => {
    // const fs = require('fs');
    // const gm = require('gm').subclass({imageMagick:true});
    // const [selectedImage, setSelectedImage] = useState('');
    // const t = new File(null as unknown[],"a");

    const [selectedFile,setSelectedFile] = useState<File>();
    const [loaded, setLoaded] = useState(0);

    const userId = Cookies.get('userId');
    // async function updateImage(event: React.ChangeEvent<HTMLInputElement>){
    //     if (event.target.files && event.target.files[0]) {
    //         let img = event.target.files[0];
    //         console.log(img);
    //         // const x = saveAs(img);
    //         var x = URL.createObjectURL(img)
    //         console.log(x);
            
    //         // gm()
    //         // setSelectedImage(x)
    //         // var x = URL.createObjectURL(img)
    //         // setSelectedImage(x)
    //         console.log("here");
    //         // const formData = new FormData();
    //         // formData.append("image",event.target.files[0]);
    //         try{
    //             const link = process.env.NODE_ENV === 'production' ? 'http://127.0.0.1:8080/api' : 'http://localhost:3008/api'
    //             console.log(link);
    //             console.log(`${link}/users/updateImage/${userId}`);
                
    //             // fetch(`${link}/users/updateImage/${userId}`,{
    //                 // method:"POST" as string,

    //                 // body:formData, 
    //                 // dataType: "json" as Object
    //             // }) as RequestInit
    //             const response = await axios.post(`${link}/users/updateImage/${userId}`,{
    //                 "image":x
    //             });
    //             console.log(response);
    //         } catch (error) {
    //             console.log(error);
    //             console.log(""); 
    //         }
    //         console.log("here 2");
             
    //         // console.log(URL.createObjectURL(img));
    //         // console.log(selectedImage);
    //       }
    // }
    
    async function handleselectedFile(event: React.ChangeEvent<HTMLInputElement>){
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0] as File);
            setLoaded(0);
        }
        // this.setState({
        //   selectedFile: event.target.files[0],
        //   loaded: 0,
        // })
      }
    
    async function handleUpload(){
        const data = new FormData()
        if(selectedFile){
            data.append('file', selectedFile as Blob, selectedFile.name as string)
    
        axios
        .post(`${baseUrl.baseUrl}/upload`, data, {

        //   .post(`${baseUrl.baseUrl}/users/updateImage/${userId}`, data, {
            onUploadProgress: ProgressEvent => {
                if(ProgressEvent.total){
                    setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100)
                }
            //   this.setState({
            //     loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
            //   })
            },
          })
          .then(res => {
            console.log(res.statusText)
          })
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

