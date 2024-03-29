/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { ipcRenderer, remote } from 'electron';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, FormControl, TextField, InputLabel, Select, MenuItem } from '@material-ui/core';
import GroupActionButton from '../components/groupActionButton/GroupActionButton';
import LoginLogoIcon from '../assets/login-logo.png';

export default function LoginPage() {
  const [ key, setKey ] = useState('');

  const handleClose = () => {
    const win = remote.getCurrentWindow();
    win.close();
  }

  return (
    <div className="login-page">
      <div className="title">
        <div>WELCOME TO MEKPREME</div>
        <IconButton size="small" onClick={handleClose}>
          <CloseIcon style={{ fontSize: 18 }} />
        </IconButton>
      </div>
      <div className="login-form">
        <div className="logo"><img src={LoginLogoIcon} alt="login-logo" /></div>
        <div className="content">
          <div className="form-container">
            <FormControl fullWidth>
              <TextField
                id="activation-key-input"
                label="ACTIVATION KEY"
                value={key}
                onChange={(event) => { setKey(event.target.value) }}
              />
            </FormControl>
          </div>
          <div className="form-container">
            <FormControl fullWidth>
              <TextField
                id="proxy-input"
                label="PROXY"
                value={''}
                onChange={() => {}}
              />
            </FormControl>
          </div>
          <div className="form-container">
            <FormControl fullWidth>
              <InputLabel id="region-select-label">REGION</InputLabel>
              <Select
                labelId="region-select-label"
                id="region-select"
                value={''}
                onChange={(event) => {}}
                IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
              >
                <MenuItem value={'region 1'}>region 1</MenuItem>
                <MenuItem value={'region 2'}>region 2</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="login-btn">
            <GroupActionButton style={{ width: '150px', height: '35px' }} text="Activate" actionHandler={() => { ipcRenderer.sendSync('login', key); }} />
          </div>
        </div>
      </div>
      <a href="#"><div className="dashboard">DASHBOARD</div></a>
    </div>
  );
}
