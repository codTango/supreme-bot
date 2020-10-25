import React, { useState } from 'react';
import { Grid, FormControl, TextField, FormControlLabel, Typography } from '@material-ui/core';
import GroupActionButton from '../components/groupActionButton/GroupActionButton';
import { AntSwitchRed } from '../components/antSwitch/AntSwitch';

export default function SettingPage() {
  const [ successOnly, setSuccessOnly ] = useState(true);
  const [ aycdToggle, setAycdToggle ] = useState(true);

  return (
    <div className="setting-region">
      <div className="gradient-box">
        <div className="window-title">
          <span>SETTINGS</span>
        </div>

          
        <div className="setting-container">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className="group-box">
                <div className="window-title">
                  <span>DISCORD WEBHOOK</span>
                </div>
                <div className="content-container">
                  <div className="form-container">
                    <FormControl fullWidth>
                      <TextField
                        id="proxy-group-name-input"
                        label="PROXY GROUP NAME"
                        value={''}
                        onChange={(event) => { }}
                      />
                    </FormControl>
                  </div>
                  <div className="button-group">
                    <GroupActionButton icon="save" text="Save Webhook" actionHandler={() => {console.log('save webhook');}} />
                    <GroupActionButton icon="refresh" text="Test Webhook" actionHandler={() => {console.log('callMade');}} />
                  </div>
                  <div className="switch-container">
                    <FormControl fullWidth>
                      <FormControlLabel
                        control={<AntSwitchRed checked={successOnly} onChange={(event) => { setSuccessOnly(event.target.checked) }} />}
                        label="SUCCESS ONLY"
                        labelPlacement="end"
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="group-box">
                <div className="window-title">
                  <span>LISENCE MANAGEMENT</span>
                </div>
                <div className="content-container">
                  <div className="form-container">
                    <FormControl style={{ width: '60%', marginRight: '24px' }}>
                      <TextField
                        id="auth-key-input"
                        label="KEY TYPE"
                        value={''}
                        onChange={(event) => { }}
                      />
                    </FormControl>
                    <div className="double-line-text">
                      <div>EXPIRE DATE:</div>
                      <br />
                      <div>01/01/21</div>
                    </div>
                  </div>
                  <div className="button-group">
                    <GroupActionButton id="deactive-key" icon="key" text="Deactive Key" actionHandler={() => {console.log('deactive key');}} />
                    <GroupActionButton id="renew-key" icon="key" text="Renew Key" actionHandler={() => {console.log('renew key');}} />
                  </div>
                  <div className="switch-container">
                    <div className="double-line-text">
                      <div>$60.00 USD</div>
                      <div>/6 MONTHS</div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="group-box aycd-auto-solve">
                <div className="window-title">
                  <span>AYCD AUTO SOLVE</span>
                </div>
                <div className="content-container">
                  <div className="form-container">
                    <FormControl fullWidth>
                      <TextField
                        id="access-token-input"
                        label="ACCESS TOKEN"
                        value={''}
                        onChange={(event) => { }}
                      />
                    </FormControl>
                  </div>
                  <div className="form-container">
                    <FormControl fullWidth>
                      <TextField
                        id="api-key-input"
                        label="API KEY"
                        value={''}
                        onChange={(event) => { }}
                      />
                    </FormControl>
                  </div>
                  <div className="button-group" style={{ display: 'inline-block' }}>
                    <GroupActionButton icon="save" text="Save" actionHandler={() => {console.log('save');}} />
                  </div>
                  <div className="switch-container toogle" style={{ display: 'inline-block', marginTop: 0 }}>
                    <FormControl>
                      <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                          <Grid item>Off</Grid>
                          <Grid item>
                            <AntSwitchRed checked={aycdToggle} onChange={(event) => { setAycdToggle(event.target.checked) }} />
                          </Grid>
                          <Grid item>On</Grid>
                        </Grid>
                      </Typography>
                    </FormControl>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="group-box other-settings">
                <div className="window-title">
                  <span>OTHER SETTINGS</span>
                </div>
                <div className="content-container">
                  <div className="button-group">
                    <GroupActionButton icon="close" text="Clear Logs" actionHandler={() => {console.log('clear logs');}} />
                    <GroupActionButton icon="close" text="Logs Location" actionHandler={() => {console.log('logs location');}} />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>

      </div>
    </div>
  );
}