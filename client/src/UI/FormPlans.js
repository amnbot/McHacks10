import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
});

export default function FormPlans() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Name"
          defaultValue=" "
        />
        <br></br>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">
            Icon abreviation
          </InputLabel>
          <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
        </FormControl>
        </Box>
        <li style={{display: "inline-block"}}>
        <ThemeProvider theme={theme}>
        <Typography>Floor plan</Typography>
        </ThemeProvider>
            <Stack direction="row" alignItems="right" spacing={2}>
          <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
        </Stack>
        </li>
        <br></br>
        <TextField
          id="outlined-number"
          label="Capacity"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
      > 
      <Stack direction="row" spacing={2}>
      <Button variant="contained" endIcon={<SendIcon />}>
        Confirm
      </Button>
    </Stack>
    </Box>  
      </div>
    </Box>
  );
}