import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { FormControl, TextField, Grid, IconButton } from '@material-ui/core';
import GroupActionButton from '../groupActionButton/GroupActionButton';

export default function ProxyContent(props): JSX.Element {

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
                    value={''}
                    onChange={(event) => { }}
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={5}>
              <div className="form-container btn-container">
                <FormControl fullWidth>
                  <GroupActionButton icon="save" text="Save Proxy Group" actionHandler={() => {}} />
                  {/* <IconButton variant="outlined" onClick={() => {}}>
                    <SaveIcon /> Save Proxy Group
                  </IconButton> */}
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
            proxy test list
          </div>
        </div>
      </div>
    </div>
  );
}
