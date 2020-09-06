/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';
import { IconButton, FormControl, TextField, Select, MenuItem, InputLabel, Button, FormControlLabel, Switch } from '@material-ui/core';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { sizeList, modeList } from '../../constants/listValue';

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 28,
      height: 18,
      padding: 0,
      display: 'flex',
      marginTop: 20,
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: '#C1C1C1',
          borderColor: '#C1C1C1',
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      height: 14,
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: '#444444',
      borderColor: '#444444'
    },
    checked: {},
  }),
)(Switch);

export default function AddTaskPanel(props) {
  const { index, groupId, name, onClose, onAddTasks } = props;

  const [ taskInfo, setTaskInfo ] = useState({
    mode: '',
    size: '',
    color: '',
    profile: '',
    taskQuantity: 0,
    itemQuantity: 0,
    bypass: false
  });

  const {
    mode,
    size,
    color,
    profile,
    taskQuantity,
    itemQuantity,
    bypass
  } = taskInfo;

  return (
    <div className="task-panel">
      <div className="title">
        <div className="group-name">
          ADD TASKS TO {name}
        </div>
        <div className="close-btn">
          <IconButton size="small" onClick={onClose}>
            <Close style={{ color: '#DE3E3E' }} />
          </IconButton>
        </div>
      </div>
      <div className="panel-area">
        <div className="row-1">
          <div className="form-container">
            <FormControl fullWidth>
              <InputLabel id="task-mode-label">TASK MODE</InputLabel>
              <Select
                labelId="task-mode-label"
                id="task-mode-select"
                value={mode}
                onChange={(event) => { setTaskInfo({ ...taskInfo, mode: event.target.value }) }}
                IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
              >
                {modeList.map(value => (<MenuItem key={value} value={value}>{value}</MenuItem>))}
              </Select>
            </FormControl>
          </div>
          <div className="form-container">
            <FormControl fullWidth>
              <InputLabel id="size-select-label">SIZE</InputLabel>
              <Select
                labelId="size-select-label"
                id="size-select"
                value={size}
                onChange={(event) => { setTaskInfo({ ...taskInfo, size: event.target.value }) }}
                IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
              >
                {sizeList.map(value => (<MenuItem key={value} value={value}>{value}</MenuItem>))}
              </Select>
            </FormControl>
          </div>
          <div className="form-container">
            <FormControl fullWidth>
              <TextField
                id="color-input"
                label="COLOR"
                value={color}
                onChange={(event) => { setTaskInfo({ ...taskInfo, color: event.target.value }) }}
                multiline
              />
            </FormControl>
          </div>
          <div className="form-container">
            <FormControl fullWidth>
              <InputLabel id="profile-select-label">PROFILE</InputLabel>
              <Select
                labelId="profile-select-label"
                id="profile-select"
                value={profile}
                onChange={(event) => { setTaskInfo({ ...taskInfo, profile: event.target.value }) }}
                IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
              >
                <MenuItem value={'task mode 1'}>task mode 1</MenuItem>
                <MenuItem value={'task mode 2'}>task mode 2</MenuItem>
                <MenuItem value={'task mode 3'}>task mode 3</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="row-2">
          <div className="form-container">
            <FormControl fullWidth>
              <TextField
                id="task-quantity-input"
                label="TASK QUANTITY"
                type="number"
                value={taskQuantity}
                onChange={(event) => { setTaskInfo({ ...taskInfo, taskQuantity: event.target.value }) }}
                multiline
              />
            </FormControl>
          </div>
          <div className="form-container">
            <FormControl fullWidth>
              <TextField
                id="item-quantity-input"
                label="ITEM QUANTITY"
                type="number"
                value={itemQuantity}
                onChange={(event) => { setTaskInfo({ ...taskInfo, itemQuantity: event.target.value }) }}
                multiline
              />
            </FormControl>
          </div>
          <div className="form-container" style={{ width: '17%' }}>
            <FormControl fullWidth>
              <FormControlLabel
                control={<AntSwitch checked={bypass} onChange={(event) => { setTaskInfo({ ...taskInfo, bypass: event.target.checked }) }} />}
                label="REGIONABLE BYPASS"
                labelPlacement="top"
              />
            </FormControl>
          </div>
          <div className="form-container" style={{ width: '130px', verticalAlign: 'bottom' }}>
            <FormControl fullWidth>
              <Button variant="outlined" onClick={() => { onAddTasks({ ...taskInfo, index, groupId }) }}>
                + Add Tasks
              </Button>
            </FormControl>
          </div>

        </div>
      </div>
    </div>
  );
}