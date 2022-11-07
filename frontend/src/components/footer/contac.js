import * as React from 'react';
import { blue, deepOrange, red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const Style = {
    cursor: "pointer"
}

export default function Contac() {
  return (
    <center> 
        <h4 style={{color: "white"}} className="subtitle is-4">Siguenos en redes sociales</h4>
        <center>
            <Stack style={{width: "40%", marginBottom: "1rem"}} direction="row" spacing={2}>
            <Avatar style={Style} sx={{ bgcolor: blue[500] }}>
                <FacebookIcon/>
            </Avatar>
            <Avatar style={Style} sx={{ bgcolor: red[500] }}>
                <YouTubeIcon/>
            </Avatar>
            <Avatar style={Style} sx={{ bgcolor: deepOrange[500] }}>
                <InstagramIcon/>
            </Avatar>
            </Stack>
        </center>
        <h4 style={{color: "white"}} className="subtitle is-4">Números telefónicos</h4>
        <h5 style={{color: "white"}} className="subtitle is-5">(57+) 315 6858570</h5>
    </center>
  );
}