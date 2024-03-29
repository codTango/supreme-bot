/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { FormControl, TextField, Select, MenuItem, InputLabel, Grid } from '@material-ui/core';
import Status from '../status/Status';
import GroupActionButton from '../groupActionButton/GroupActionButton';
import { categoryList } from '../../constants/listValue';
import shoe from '../../assets/shoe.png';

export default function GroupContent(props) {
  const { group, proxyList, onSave, onAddTask, onClearTaskList, onDuplicate } = props;

  // state of group
  const [ groupInfo, setGroupInfo ] = useState(group);
  const {
    _id,
    detail: {
      monitorDelay = '',
      checkoutDelay = '',
      keywords = '',
      category = '',
      monitor = '',
      proxy = ''
    } = {},
    status: {
      tasks = 0,
      success = 0,
      carted = 0,
      queued = 0
    } = {}
  } = groupInfo;

  useEffect(() => {
    setGroupInfo(group);
  }, [group]);

  const handleGroupInfoChange = (event, key) => {
    const { detail = {} } = groupInfo;
    detail[key] = event.target.value;
    setGroupInfo({ ...groupInfo, detail });
  }

  const handleSave = () => {
    onSave(groupInfo);
  }

  return (
    <div className="group-content">
      <Grid container>

        <Grid item xs={3}>
          <div className="product-img">
            <img alt="product-img" src={shoe} />
          </div>
          <div className="half-form-container">
            <FormControl fullWidth>
              <TextField
                id="monior-delay-input"
                label="MONITOR DELAY (MS)"
                value={monitorDelay}
                onChange={(event) => { handleGroupInfoChange(event, 'monitorDelay') }}
              />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '10px' }}>
              <TextField
                id="checkout-delay-input"
                label="CHECKOUT DELAY (MS)"
                value={checkoutDelay}
                onChange={(event) => { handleGroupInfoChange(event, 'checkoutDelay') }}
              />
            </FormControl>
          </div>
        </Grid>

        <Grid item xs={5}>
          <div className="full-form-container">
            <FormControl fullWidth>
              <TextField
                id="keywords-input"
                label="KEYWORDS"
                value={keywords}
                onChange={(event) => { handleGroupInfoChange(event, 'keywords') }}
              />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '10px' }}>
              <InputLabel id="category-select-label">CATEGORY</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                onChange={(event) => { handleGroupInfoChange(event, 'category') }}
                IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
              >
                {categoryList.map(value => (<MenuItem key={value} value={value}>{value}</MenuItem>))}
              </Select>
            </FormControl>
          </div>
          <div className="full-form-container">
            <FormControl fullWidth>
              <InputLabel id="monitor-select-label">MONITOR LIST</InputLabel>
              <Select
                labelId="monitor-select-label"
                id="monitor-select"
                value={monitor}
                onChange={(event) => { handleGroupInfoChange(event, 'monitor') }}
                IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
              >
                <MenuItem value={'shoes'}>Shoes</MenuItem>
                <MenuItem value={'tshirt'}>T-shirt</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '10px' }}>
              <InputLabel id="proxy-select-label">PROXY</InputLabel>
              <Select
                labelId="proxy-select-label"
                id="proxy-select"
                value={proxy}
                onChange={(event) => { handleGroupInfoChange(event, 'proxy') }}
                IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
              >
                {proxyList.map((p) => {
                  const { _id: id, name } = p;
                  return (
                    <MenuItem key={id} value={name}>{name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="status-group">
            <Status label="TASKS" count={tasks} color="#C1C1C1" />
            <Status label="CARTED" count={carted} color="#F3B81A" />
            <Status label="QUEUED" count={queued} color="#B6A4FF" />
            <Status label="SUCCESS" count={success} color="#00FFCF" />
          </div>
          <div className="group-actions">
            <GroupActionButton tooltip="save" icon="save" actionHandler={handleSave} />
            <GroupActionButton tooltip="clear all" icon="trash" actionHandler={onClearTaskList} />
            <GroupActionButton tooltip="start" icon="play" actionHandler={() => {console.log('play action');}} />
            <GroupActionButton tooltip="add task" icon="plus" actionHandler={onAddTask} />
            <GroupActionButton tooltip="duplicate" icon="duplicate" actionHandler={() => { onDuplicate(_id); }} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}