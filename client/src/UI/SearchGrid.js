import React, { useEffect, useState } from 'react';

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
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';


export default function SearchGrid() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const [plans, setPlans] = useState([]);

  const fetchPost = async () => {

    await getDocs(collection(db, "plans"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setPlans(newData);
        setFilteredData(newData);
        console.log(newData);
      })
  }

  useEffect(() => {
    fetchPost();
  }, [])

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      setFilteredData(
        plans.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm])

  return (
    <div>
      <Header />
      <div className='flex justify-center align-middle items-center my-4'>

        <TextField onChange={handleChange} sx={{ width: '40%' }} label="Search" id="fullWidth" color="info" />
      </div>
      <div className='flex justify-center items-center'>
        <div className="grid grid-cols-3 gap-10">
          {/* <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      /> */}
          {filteredData.map(({ abbrevation, name, cameraId, capacity, imgPath }) => {
            return (
              <div className='flex flex-col text-center text-white'>
                <Button onClick={() => navigate('/',
                  { state: { camId: cameraId, cap: capacity, imgPath } })} className='transition-transform hover:scale-110' variant="contained" color="primary" style={{ width: 75, height: 75 }}>
                  {/* <VideoCameraBackIcon /> */}
                  <h1>{abbrevation}</h1>
                </Button>
                <h1 className='text-center'>{name}</h1>
              </div>
            )
          })}
          <div className='flex flex-col text-center text-white'>
            <Button onClick={() => navigate('/plan/create')} className='transition-transform hover:scale-110' variant="contained" color="primary" style={{ width: 75, height: 75 }}>
              <AddIcon />
            </Button>
            <h1 className='text-center'>Add</h1>
          </div>
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
    </div >

  );



}