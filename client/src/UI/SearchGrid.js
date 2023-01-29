import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Header from './Header';
import { Grid } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import TerrainIcon from '@mui/icons-material/Terrain';
import StairsIcon from '@mui/icons-material/Stairs';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../firebase';

export default function SearchGrid() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const [plans, setPlans] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(plans.filter(({ cameraId }) => selectedItems.includes(cameraId)))
  }, [selectedItems])

  const handleAddItem = (e, camIdArg) => {
    if (e.target.checked) {
      setSelectedItems(prev => [...prev, camIdArg])
    } else {
      setSelectedItems(prev => {
        var index = prev.indexOf(camIdArg);
        prev.splice(index)
        return prev
      })
    }
  }

  const addFavorites = async (e) => {
    e.preventDefault();
    const submittedFavorites = {favorites}
    console.log(favorites)
    try {
      const docRef = await addDoc(collection(db, "favorites"), submittedFavorites);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

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
      <div className='flex text-center justify-center align-middle items-center my-4 space-x-4'>
        {favorites.map(({ abbrevation, name }) => {
          return (
            <div className='flex flex-col text-center text-white'>
              <Button className='transition-transform hover:scale-110' variant="contained" color="primary" style={{ width: 75, height: 75 }}>
                <h1>{abbrevation}</h1>
              </Button>
              <h1 className='text-center'>{name}</h1>
            </div>
          )
        })}
      </div>
      <div className='flex justify-center align-middle items-center my-4'>

        <TextField onChange={handleChange} sx={{ width: '40%' }} label="Search" id="fullWidth" color="info" />
      </div>
      <div className='flex justify-center items-center'>
        <div className="grid grid-cols-3 gap-10">
          {filteredData.map(({ abbrevation, name, cameraId, capacity, imgPath }) => {
            return (
              <div className='flex flex-col text-center text-white'>
                <Button sx={{borderRadius: 5, padding: '5px 5px'}}  onClick={() => navigate('/',
                  { state: { camId: cameraId, cap: capacity, imgPath, name } })} className='transition-transform hover:scale-110' variant="contained" color="primary" style={{ width: 75, height: 75 }}>
                  <h1>{abbrevation}</h1>
                </Button>
                <h1 className='text-center'>{name}</h1>
                    <input className='w-[20px] h-[20px]' type="checkbox" onChange={(e) => handleAddItem(e, cameraId)} />
              </div>
            )
          })}
          <div className='flex flex-col text-center text-white'>
            <Button sx={{borderRadius: 5, padding: '5px 5px'}} onClick={() => navigate('/plan/create')} className='transition-transform hover:scale-110' variant="contained" color="primary" style={{ width: 75, height: 75 }}>
              <AddIcon />
            </Button>
            <h1 className='text-center'>Add</h1>
          </div>
        </div>
      </div>
      <div className='flex justify-center align-middle items-center my-4'>
        <Button onClick={addFavorites} variant="contained" endIcon={<SendIcon />}>
          Confirm
        </Button>
      </div>
    </div >

  );



}