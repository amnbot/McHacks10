import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

//by Paul
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import MapIcon from '@mui/icons-material/Map';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';

import { Link } from 'react-router-dom'

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{backgroundColor: '#2a2e3d', height: '100%', overflow: "hidden"}}
    >
      <List style={{marginLeft: 2}}>
        {[{ name: 'Home', icon: <HomeIcon />, path: '/' },
        { name: 'Plans', icon: <MapIcon />, path: '/plans' },
        { name: 'Team', icon: <GroupsIcon />, path: '/team' },
        { name: 'Settings', icon: <SettingsIcon />, path: '/settings' }].map(({ name, icon, path }, index) => (
          <ListItem style={{marginLeft: 10}} key={name} disablePadding>
            <Link to={path}>
              <div className='flex flex-row my-2'>
                <div className='flex ml-1 align-middle'>
                  <ListItemIcon style={{color: 'white'}}>
                    {icon}
                  </ListItemIcon>
                </div>
                <h1 className='font-bold text-white align-middle'>{name}</h1>
              </div>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Sign out'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon style={{color: 'white'}}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon >
              <h1 className='font-bold text-white align-middle'>Sign Out</h1>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button style={{ width: 50, height: 60, backgroundColor: '#3d7bf8' }} sx={{borderRadius: 50, padding: '5px 5px', marginTop: 2, marginLeft: 2}}  className="text-center sm:text-left" onClick={toggleDrawer(anchor, true)}>
            <ListIcon style={{color: 'white'}} />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}