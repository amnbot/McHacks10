import React from 'react';

import Button from '@mui/material/Button';
import Header from './Header';
import { Grid } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import TerrainIcon from '@mui/icons-material/Terrain';
import StairsIcon from '@mui/icons-material/Stairs';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AddIcon from '@mui/icons-material/Add';



export default function SearchGrid() {
const bhys = [{path: '', icon: <VideoCameraBackIcon />, label: "Camera 1"}, {path: '', icon: <TerrainIcon />, label: "Camera 2"}, {path: '', icon: <StairsIcon />, label: "Floor 1"}, {path: '', icon: <ShuffleIcon />, label: "Floor 2"}, {path: '', icon: <CameraAltIcon />, label: "Camera 3"}, {path: '', icon: <RestoreIcon />, label: "Camera 4"}, {path: '', icon: <FavoriteIcon />, label: "Camera 5"}, {path: '', icon: <LocationOnIcon />, label: "Camera 6"}, {path: '/plan/create', icon: <AddIcon />, label: "Add"}]
  return (
    <div>
     <Header/>
     <div className='flex justify-center items-center'>
      <div className ="grid grid-cols-3 gap-10">
        {bhys.map(({icon, label}) => {
            return (
                <div className='flex flex-col text-center text-white'>
                    <Button variant="contained" color="primary" style={{width :50, height:50}}>
                    {icon}
                    </Button>
                    {label}
                </div>
            )
        })}
      {/* <Button variant="contained" color="primary" style={{width :50, height:50}}>
        <VideoCameraBackIcon/>
      </Button>
      <Button variant="contained" color="primary" style={{width :50, height:50}}>
        <TerrainIcon/>
      </Button>
      <Button variant="contained" color="primary" style={{width :50, height:50}}>
        <StairsIcon/>
      </Button>
      <Button variant="contained" color="primary" style={{width :50, height:50}}>
        <ShuffleIcon/>
      </Button>
      <Button variant="contained" color="primary" style={{width :50, height:50}}>
        <CameraAltIcon/>
      </Button>
      <Button variant="contained" color="primary" style={{width :50, height:50}}>
        <RestoreIcon/>
      </Button>
      <Button variant="contained" color="primary" style={{width :50, height:50}}>
        <FavoriteIcon/>
      </Button>
      <Button variant="contained" color="primary" style={{width :50, height:50}}>
      <LocationOnIcon/>
      </Button>
      <Button variant="contained" color="primary" style={{width :50, height:50}}>
      <AddIcon/>
      </Button> */}

      </div>
    </div>
    </div>
  );
}