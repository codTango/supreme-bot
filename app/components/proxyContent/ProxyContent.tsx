import React, { useState, useEffect } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { FormControl, TextField, Grid, IconButton } from '@material-ui/core';
import GroupActionButton from '../groupActionButton/GroupActionButton';

export default function ProxyContent(props): JSX.Element {

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
                    multiline
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="form-container">
                <FormControl fullWidth>
                  <GroupActionButton icon="save" text="Save Proxy Group" actionHandler={() => {}} />
                  {/* <IconButton variant="outlined" onClick={() => {}}>
                    <SaveIcon /> Save Proxy Group
                  </IconButton> */}
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={4} />
          </Grid>
        </div>
      </div>
    </div>
  );
}
