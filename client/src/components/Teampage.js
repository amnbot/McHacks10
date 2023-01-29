import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Header from '../UI/Header';
import ErrorIcon from '@mui/icons-material/Error';

export default function TeamPage() {

  const team = [{ name: "Paul Touma", location: 'Cam1' }, { name: "Rayan", location: "Camera2" }, { name: "Aymen", location: "Floor1" }, { name: "Moncef", location: "Floor1" }];
  const teamList = team.map(({ name, location }) =>
    <div className='inline'>
      <div className="inline-block">
        <ErrorIcon size="small" sx={{color: "red"}} />
        <Avatar sx={{backgroundColor: 'white'}} />
      <div className='columns-1'>
        <h1 className='text-white'>{name}</h1>
        <h1 className='text-white'>{location}</h1>
      </div>
      </div>
    </div>
  );
  return (
    <div>
      <Header />
      <div className='inline-block space-x-10 bg-gray-500 w-[30%] h-[30%] p-4 rounded-[15px] text-left my-10'>
        {teamList}
      </div>
    </div>
  );
}