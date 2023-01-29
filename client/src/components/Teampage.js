import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Header from '../UI/Header';

export default function TeamPage() {

  const team = [{ name: "Paul Touma", location: 'Cam1' }, { name: "Rayan", location: "Camera2" }, { name: "Aymen", location: "Floor1" }, { name: "Moncef", location: "Floor2" }];
  const teamList = team.map(({ name, location }) =>
    <div className=''>
      <div className='bg-white rounded-[50%] w-[40px] h-[40px]'>
        <Avatar />
      </div>
      <h1 className='text-white'>{name}</h1>
      <h1 className='text-white'>{location}</h1>
    </div>
  );
  return (
    <div>
      <Header />
      <div className='flex bg-gray-500 w-[30%] h-[30%] p-4 rounded-[15px] flex-row justify-center items-center align-middle text-center my-10 space-x-4'>
        {teamList}
      </div>
    </div>
  );
}