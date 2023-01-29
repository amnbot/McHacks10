import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Header from '../UI/Header';

export default function TeamPage() {

  const team = [{name: "Paul Touma", location: 'Cam1'}, {name: "Rayan", location: "Camera2"}, {name: "Aymen", location: "Floor1"}, {name: "Moncef", location: "Random"}];
  const teamList = team.map(({name, location}) => 
    <div className=''>
      <div className='bg-stone-300 rounded-[50%] w-[40px] h-[40px]'>
      <Avatar />
      </div>
      <h1>{name}</h1>
      <h1>{location}</h1>
      </div>
  );
  return (
    <div>
      <Header/>
      {teamList} 
    </div>
  );
}