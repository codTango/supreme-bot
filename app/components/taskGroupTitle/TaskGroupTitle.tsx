import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { IconButton, FormControl, TextField, Select, MenuItem, InputLabel, Button } from '@material-ui/core';
import _ from 'lodash';

export default function TaskGroupTitle(props): JSX.Element {
  const { onAddGroup } = props;

  const storeList = [ 'store1', 'store2', 'store3', 'store4' ];

  // state: title expand
  const [ titleOpen, setTitleOpen ] = useState(false);
  const handleExpandTitle = (open) => {
    setTitleOpen(!open);
  }

  // state: group name
  const [ name, setName ] = useState('');
  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  // state: store select
  const [ store, setStore ] = useState('');
  const handleStoreChange = (event) => {
    setStore(event.target.value);
  }

  // handle add group
  const handleClick = () => {
    setName('');
    setStore('');
    onAddGroup({ id: _.uniqueId(), name, store });
    // setTitleOpen(false);
  }

  return (
    <div className="task-group-title-bar">
      <div className="title-area">
        <span className="title-text">TASK GROUPS</span>
        <IconButton size="small" onClick={() => { handleExpandTitle(titleOpen) }}>
          {titleOpen ? <KeyboardArrowUp style={{color: '#de2e31'}} /> : <AddIcon style={{color: '#de2e31'}} />}
        </IconButton>
      </div>

      {titleOpen && (
        <div className="input-area">
          <div className="form-container">
            <FormControl fullWidth>
              <TextField
                id="group-name-input"
                label="GROUP NAMES"
                placeholder="Enter a name"
                value={name}
                onChange={handleNameChange}
                multiline
              />
            </FormControl>
          </div>
          <div className="form-container">
            <FormControl fullWidth>
              <InputLabel id="store-select-label">Store</InputLabel>
              <Select
                labelId="store-select-label"
                id="store-select"
                value={store}
                onChange={handleStoreChange}
                IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
              >
                {storeList.map(s => (<MenuItem key={s} value={s}>{s}</MenuItem>))}
              </Select>
            </FormControl>
          </div>
          <div className="form-container" style={{ width: '160px' }}>
            <FormControl fullWidth>
              <Button variant="outlined" onClick={handleClick}>
                + Add Task Group
              </Button>
            </FormControl>
          </div>
        </div>
      )}
    </div>
  );
}
