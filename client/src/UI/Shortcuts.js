import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';

import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import TerrainIcon from '@mui/icons-material/Terrain';
import StairsIcon from '@mui/icons-material/Stairs';
import ShuffleIcon from '@mui/icons-material/Shuffle';

import { useNavigate } from 'react-router-dom';

export default function Shortcuts({ camId, setCamId }) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    if (value === 3) {
      navigate('/planCreation')
    }
    console.log(value, 'new value')
    setCamId(value)
  }, [value])
  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Camera 1" icon={<VideoCameraBackIcon />} />
        <BottomNavigationAction label="Camera 2" icon={<TerrainIcon />} />
        <BottomNavigationAction label="Floor 1" icon={<StairsIcon />} />
        <BottomNavigationAction label="My plans" icon={<SearchIcon />} />

      </BottomNavigation>
    </Box >
  );
}
