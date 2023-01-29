import React, {useState} from 'react';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Header from '../UI/Header';
import ErrorIcon from '@mui/icons-material/Error';
import Button from '@mui/material/Button';

export default function TeamPage() {
  const [text, setText] = useState("");
  const handleTextChange = (e) => {
    setText(e.target.value);
  }

  const team = [{ name: "Paul Touma", location: 'Cam1' }, { name: "Rayan", location: "Camera2" }, { name: "Aymen", location: "Floor1" }, { name: "Moncef", location: "Floor1" }];
  const teamList = team.map(({ name, location }) =>
    <div className='col-auto text-center'>
      <div className="inline m-auto">
        <ErrorIcon size="small" sx={{ color: "red" }} />
        <Avatar sx={{ backgroundColor: 'white' }} />
      </div>
      <div className='flex flex-col'>
        <h1 className='text-white'>{name}</h1>
        <h1 className='text-white'>{location}</h1>
      </div>
    </div>
  );
  return (
    <div>
      <Header />
      <div className='bg-[#2a2e3d] w-[30%] h-[30%] p-4 rounded-[15px] grid grid-cols-3 gap-10 m-auto'>
        {teamList}
      </div>
    </div>
  );
}