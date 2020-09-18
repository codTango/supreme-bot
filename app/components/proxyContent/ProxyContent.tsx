/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { FormControl, TextField, Grid, IconButton } from '@material-ui/core';
import GroupActionButton from '../groupActionButton/GroupActionButton';
import VirtualizedList from '../virtualizedList/VirtualizedList';

export default function ProxyContent(props): JSX.Element {
  const { proxy } = props;

  const [ name, setName ] = useState(proxy.name);
  const [ proxyList, setProxyList ] = useState(proxy.proxyList);

  const [ rows, setRows ] = useState(20);
  const [ windowHeight, setWindowHeight ] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      console.log('resized to: ', window.innerWidth, 'x', window.innerHeight);
      const h = window.innerHeight;
      const rowN = Math.floor((h - 490) / 19);
      console.log({ height: h, rows: rowN });
      setWindowHeight(h);
      setRows(rowN);
    };
    handleResize();
    window.addEventListener('resize', _.debounce(handleResize, 500));
  }, [windowHeight])

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  return (
    <div className="proxy-region">
      <div className="gradient-box">
        <div className="window-title proxy-title">
          <span>PROXY</span>
        </div>
        <div className="group-box region-1">
          <Grid container justify="center">
            <Grid item xs={4}>
              <div className="form-container">
                <FormControl fullWidth>
                  <TextField
                    id="profile-name-input"
                    label="PROFILE NAME"
                    value={name}
                    onChange={handleNameChange}
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={5}>
              <div className="form-container btn-container">
                <FormControl fullWidth>
                  <GroupActionButton icon="save" text="Save Proxy Group" actionHandler={() => {}} />
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={3} />
          </Grid>
        </div>
        <div className="region-content">
          <div id="proxy-textarea-container" className="group-box region-2">
            <div className="window-title proxy-title">
              <span>PROXY LIST</span>
            </div>
            <div className="form-container">
              <FormControl fullWidth>
                <TextField
                  id="proxy-textarea"
                  multiline
                  variant="filled"
                  rows={rows}
                />
              </FormControl>
            </div>
          </div>
          <div className="group-box region-3">
            <div className="window-title proxy-title">
              <span>PROXY TESTING</span>
            </div>
            <div className="proxy-test-list">
              <VirtualizedList list={proxyList} />
            </div>
          </div>
        </div>
        <div className="buttons">
          <div className="btn-left">
            <div className="btn-1">
              <FormControl fullWidth>
                <GroupActionButton icon="trash" text="Delete All" actionHandler={() => {}} />
              </FormControl>
            </div>
          </div>
          <div className="btn-right">
            <div className="form-container btn-2">
              <FormControl fullWidth>
                <GroupActionButton icon="flash" text="Test Speed" actionHandler={() => {}} />
              </FormControl>
            </div>
            <div className="form-container btn-3">
              <FormControl fullWidth>
                <GroupActionButton icon="trash" text="Delete Banned" actionHandler={() => {}} />
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
