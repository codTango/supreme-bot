/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { IconButton, FormControl, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import GroupActionButton from '../groupActionButton/GroupActionButton';

export default function CaptchaContent(props) {
  const { content = {}, onRemove, onSave } = props;
  const [ harvester, setHarvester ] = useState(content);

  useEffect(() => {
    setHarvester(content);
  }, [content]);

  const { _id: id, type = '', proxy = '' } = harvester;

  const handleChange = (key, value) => {
    setHarvester({ ...harvester, [key]: value });
  };

  return (
    <div className="group-box">
      <div className="window-title icon-title">
        <div className="title">HARVESTER</div>
        <IconButton size="small" onClick={() => { onRemove(id); }}>
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
              value={type}
              onChange={(event) => { handleChange('type', event.target.value); }}
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
              value={proxy}
              onChange={(event) => { handleChange('proxy', event.target.value); }}
            />
          </FormControl>
        </div>
        <div className="button-group">
          <GroupActionButton tooltip="Gmail" icon="email" actionHandler={() => {console.log('email');}} />
          <GroupActionButton tooltip="Save" icon="save" actionHandler={() => { onSave(harvester); }} />
          <GroupActionButton tooltip="Open" icon="callMade" actionHandler={() => {console.log('callMade');}} />
        </div>
        <div className="clear-cookies">CLEAR COOKIES</div>
      </div>
    </div>
  );
}