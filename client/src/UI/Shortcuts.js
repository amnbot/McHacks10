import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';

import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import TerrainIcon from '@mui/icons-material/Terrain';
import StairsIcon from '@mui/icons-material/Stairs';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';

import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../firebase';

export default function Shortcuts({ camId, setCamId }) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(camId);
  const [favorites, setFavorites] = React.useState([]);
  useEffect(() => {
    if (value === 3) {
      navigate('/plans')
    }
    console.log(value, 'new value')
    setCamId(value)
  }, [value])

  const fetchPost = async () => {

    await getDocs(collection(db, "favorites"))
      .then((snapshot) => {
        const newData = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setFavorites(newData[0].favorites)
        console.log(newData[0].favorites);
      })
  }

  useEffect(() => {
    fetchPost();
  }, [])

  return (
    <div className='bg-[#2a2e3d] text-[#e8e8ff] rounded-[15px] w-[40%] p-2'>
      <div className='flex flex-row justify-center items-center align-middle space-x-2'>

        <h1 className='font-medium tracking-widest'>Favorites</h1>
        <StarIcon sx={{ color: '#ffd500' }} />
      </div>
      <div className='flex flex-row justify-center space-x-5'>
        {favorites.map(({ abbrevation, name, cameraId, imgPath, capacity }) => (
          <div className='flex flex-col text-center'>
            <Button variant="contained" sx={{borderRadius: 5, padding: '5px 5px'}} onClick={() => navigate('/',
              { state: { camId: cameraId, cap: capacity, imgPath, name } })} className='transition-transform hover:scale-110' style={{ width: 50, height: 60, backgroundColor: '#3d7bf8' }}>
              <h1 className='font-medium tracking-widest' >{abbrevation}</h1>
            </Button>
          </div>
        ))}
        <Button style={{borderRadius: 10}} onClick={() => navigate('/plans')}>
          <SearchIcon sx={{color: 'white'}} />
        </Button>
      </div>
    </div>
  );
}
