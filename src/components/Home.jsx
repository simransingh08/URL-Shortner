import React from 'react';
import { useState} from 'react';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
const Home = () => {
    const [Url,setUrl] = useState("");
    const [shortURL,setShortURL] = useState("");
    const [buttonText,setButtonText] = useState("copy");
    const copyContent = async () => {
        try {
        await navigator.clipboard.writeText(shortURL);
        setShortURL("");
        setButtonText("copied!")
        setTimeout(() => {
            setButtonText("copy");
        }, "1000");
        console.log(shortURL);
        } catch (err) {
        console.error('Failed to copy: ', err);
        }
    };
    const handleChange = (e) => {
        setUrl(e.target.value);
        console.log(Url);
    }
    let data2 = async(url) => {
        const encodedParams = new URLSearchParams();
        encodedParams.set('url', Url);
        const options = {
            method: 'POST',
            url: 'https://shorturl9.p.rapidapi.com/functions/api.php',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '31133b3f57msh83a656b74774fdap19665cjsnca4b18e1486b',
                'X-RapidAPI-Host': 'shorturl9.p.rapidapi.com'
                },
            data:encodedParams,
        };
        try {
            axios
                .request(options)
                .then(function (response) {
                    console.log("res.data", response.data);
                    console.log(response.data);
                    if(response.data.status==="success"){
                        const res = response.data.url;
                        setShortURL(res);
                        setUrl("");
                        console.log(shortURL);
                    }
                    else{
                        setShortURL("Invalid URL");
                    }
                })
            } 
        catch (error) {
            console.error(error);
        }
    }
    return (
        <div style={{marginTop:"180px",marginLeft:"420px",marginRight:"450px",marginBottom:"100px",paddingLeft:"23px",paddingTop:"10px",paddingBottom:"10px",borderRadius:"20px", backgroundColor:"#95E1FF"}} >
        <Typography mb={3} color="#3E0B73" variant="h3" sx={{pl:"37px"}}>
            Simran url shortener
        </Typography>
        <form style={{}}>
        <TextField sx={{}} id="outlined-basic" size="small" label="Enter URL" variant="outlined" value={Url} onChange={handleChange}/>
        <Button sx={{mb:"25px"}} size="large" variant="outlined" color="secondary" onClick={data2}>shorten</Button>
        <TextField sx={{}} id="foo" size="small" label="shortened URL" variant="outlined"  value={shortURL} onChange={(e)=>setShortURL(e.target.value)}/>
        <Button sx={{mb:"8px"}} size="large" variant="outlined" color="secondary" onClick={copyContent}>
        {buttonText}
        </Button>
        </form> 
        </div>
    ) 
}

export default Home;