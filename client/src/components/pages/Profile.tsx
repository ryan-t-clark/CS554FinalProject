import React, { FC,useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import baseUrl from '../../environment.js';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {};

interface User {
    _id: any,
    username: string,
    totalPoints: number,
    totalCorrectPicks: number,
    totalIncorrectPicks: number,
}

const Profile: FC<ProfileProps> = () => {

    const userId = Cookies.get('userId');
    const [selectedFile,setSelectedFile] = useState<File>();
    const [proPicLink, setProPicLink ] = useState(`${baseUrl.baseUrl}/images/${userId}_profile_pic.jpg`)
    const [newUpload, setNewUpload ] = useState(false)
    const [loaded, setLoaded] = useState(0);
    const [userData, setUserData ] = useState<User | undefined>(undefined);
    const navigate = useNavigate();

    async function refreshImg() {
        const temp = proPicLink;
        setProPicLink('')
        setTimeout(() => {
            setProPicLink(temp)
        }, 100)
    }

    useEffect( () => {
        async function fetchData() {
            try {
                let { data } = await axios.get(`${baseUrl.baseUrl}/users/profile/${userId}`);
                setUserData(data);
                console.log(data)
            } catch (e) {
                navigate('*')
            }
        }
        fetchData();
    }, []);

    useEffect( () => {
        setProPicLink(proPicLink)
    }, [proPicLink]);
    
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
            const objUrl = URL.createObjectURL(selectedFile)
            axios.post(`${baseUrl.baseUrl}/upload`, data, {
                onUploadProgress: ProgressEvent => {
                    if(ProgressEvent.total){
                        setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100)
                    }
                }
            })
            .then(res => {
                console.log(res.statusText)
                // const imgPath = res.data.imgPath
                refreshImg()
                // console.log(imgPath)
                // setProPicLink(`${objUrl}`)
                // console.log(`${baseUrl.baseUrl}/images/${userId}_profile_pic.jpg`)
            })
        }
    }

    var cardStyle = {
        display: 'block',
        width: '80%',
        transitionDuration: '0.3s',
        height:'75%',
        marginTop: '5vh',
        marginBottom: '5vh',
        background: '#83D7E6',
        borderWidth: '2px',
        borderColor: 'black',
        padding:'2vh',
        color: 'black',
    }
    return (
        <div >
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center">
                <Card style={cardStyle} sx={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);'}}>
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center">
                        <Grid item justifyContent="center" alignItems="center" >
                            <CardContent>    
                                <Grid container
                                    spacing={0}
                                    direction="column"
                                    alignItems="center">            
                                    <Typography variant='h2' gutterBottom align='center'>
                                        Welcome to your profile, {userData?.username}!
                                    </Typography>
                                    <Box
                                        component='img'
                                        src={proPicLink}
                                        alt='user profile pic'
                                        sx={{
                                            height: 170,
                                            width: 170
                                        }}
                                    />
                                    <Box sx={{padding:'5px'}}>
                                        <Typography align='center'>Upload a new profile picture here...</Typography>
                                        <Button variant="contained" component="label">
                                            <div className="App">
                                                <input type="file" name="" id="" onChange={handleselectedFile} />
                                                <button onClick={handleUpload}>Upload</button>
                                                <div> {loaded} %</div>
                                            </div>
                                            {/* <input hidden accept="image/*" multiple type="file" onChange={updateImage}/> */}
                                        </Button>
                                    </Box>
                                    <Box sx={{padding:'5px'}}>
                                        <Typography align='center'>Users total points: {userData?.totalPoints} </Typography>
                                        <Typography align='center'>Users total correct picks: {userData?.totalCorrectPicks} </Typography>
                                        <Typography align='center'>Users total incorrect picks: {userData?.totalIncorrectPicks} </Typography>
                                    </Box>
                                </Grid>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            {/* <img src = {selectedImage}></img> */}
        </div>
    )
}

export default Profile;

