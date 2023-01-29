import React, { useState } from 'react';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Header from '../UI/Header';
import ErrorIcon from '@mui/icons-material/Error';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

export default function TeamPage() {
  const chatLog = [
    { name: 'Paul Touma', msg: 'Hi' },
    { name: 'Aymen Ouali', msg: 'Hello' },
    { name: 'Rayan Ait-Aoudia', msg: 'Hey' },
    { name: 'Moncef Amchech', msg: 'Good morning' }
  ]
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(chatLog)
  const handleTextChange = (e) => {
    setText(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 && e.target.value) setMessages(prev => prev = [...prev, { msg: e.target.value, name: "Aymen Ouali" }]);
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
      <div>
        <div className='bg-[#2a2e3d] w-[30%] h-[30%] p-4 rounded-[15px] grid grid-cols-3 gap-10 m-auto'>
          {teamList}
        </div>
        <div className='flex flex-col bg-[#2a2e3d] w-[30%] py-4 m-auto rounded-[15px] text-[#e8e8ff] justify-items-center justify-center items-center align-middle my-10'>
          <div className='flex flex-col-reverse'>
            {chatLog.map(({ name, msg }) => (
              <div className='flex flex-row my-3 test-left'>
                <h1><b>{name}:</b> {msg}</h1>
              </div>
            ))}
          </div>
          <TextField onKeyDown={handleKeyPress} />
        </div>
      </div>
    </div>
  );
}