/* eslint-disable react/prop-types */
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { IconButton, FormControl, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import GroupActionButton from '../groupActionButton/GroupActionButton';

export default function CaptchaContent(props) {
  
  return (
    <div className="group-box">
      <div className="window-title icon-title">
        <div className="title">CAPTCHA 1</div>
        <IconButton size="small" onClick={() => { }}>
          <CloseIcon style={{color: '#de2e31', fontSize: 20}} />
        </IconButton>
      </div>
      <div className="content-container">
        <div className="form-container">
          <FormControl fullWidth>
            <InputLabel id="harvester-select-label">HARVESTER TYPE</InputLabel>
            <Select
              labelId="harvester-select-label"
              id="harvester-select"
              value={''}
              onChange={(event) => { }}
              IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
            >
              <MenuItem value={'region 1'}>region 1</MenuItem>
              <MenuItem value={'region 2'}>region 2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="form-container">
          <FormControl fullWidth>
            <TextField
              id="proxy-input"
              label="PROXY"
              value={''}
              onChange={(event) => { }}
            />
          </FormControl>
        </div>
        <div className="button-group">
          <GroupActionButton tooltip="Gmail" icon="email" actionHandler={() => {console.log('email');}} />
          <GroupActionButton tooltip="Save" icon="save" actionHandler={() => {console.log('save');}} />
          <GroupActionButton tooltip="Open" icon="callMade" actionHandler={() => {console.log('callMade');}} />
        </div>
        <div className="clear-cookies">CLEAR COOKIES</div>
      </div>
    </div>
  );
}