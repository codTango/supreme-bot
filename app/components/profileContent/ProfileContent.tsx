import React, { useState, useEffect } from 'react';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { FormControl, TextField, Select, MenuItem, InputLabel, Grid, Paper } from '@material-ui/core';

export default function ProfileContent(props): JSX.Element {

  return (
    <div className="profile-region">
      <div className="gradient-box">
        <div className="window-title profile-title">
          <span>PROFILES</span>
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
                  <InputLabel id="region-select-label">REGION</InputLabel>
                  <Select
                    labelId="region-select-label"
                    id="region-select"
                    value={''}
                    onChange={(event) => { }}
                    IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
                  >
                    <MenuItem value={'region 1'}>region 1</MenuItem>
                    <MenuItem value={'region 2'}>region 2</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={4} />
          </Grid>
        </div>
        <div className="group-box region-2">
          <Grid container justify="center">
            <Grid item xs={3}>
              <div className="form-container">
                <FormControl fullWidth>
                  <TextField
                    id="first-name-input"
                    label="FIRST NAME"
                    value={''}
                    onChange={(event) => { }}
                    multiline
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="form-container">
                <FormControl fullWidth>
                  <TextField
                    id="last-name-input"
                    label="LAST NAME"
                    value={''}
                    onChange={(event) => { }}
                    multiline
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={3} />
          </Grid>
          <Grid container justify="center">
            <Grid item xs={3}>
              <div className="form-container">
                <FormControl fullWidth>
                  <TextField
                    id="address-1-input"
                    label="ADDRESS 1"
                    value={''}
                    onChange={(event) => { }}
                    multiline
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="form-container">
                <FormControl fullWidth>
                  <TextField
                    id="address-2-input"
                    label="ADDRESS 2"
                    value={''}
                    onChange={(event) => { }}
                    multiline
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="form-container">
                <FormControl fullWidth>
                  <TextField
                    id="address-3-input"
                    label="ADDRESS 3"
                    value={''}
                    onChange={(event) => { }}
                    multiline
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={3} />
          </Grid>
          <Grid container justify="center">
            <Grid item xs={3}>
              <div className="form-container">
                <FormControl fullWidth>
                  <TextField
                    id="city-input"
                    label="CITY"
                    value={''}
                    onChange={(event) => { }}
                    multiline
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="form-container">
                <FormControl fullWidth>
                  <InputLabel id="state-select-label">STATE</InputLabel>
                  <Select
                    labelId="state-select-label"
                    id="state-select"
                    value={''}
                    onChange={(event) => { }}
                    IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
                  >
                    <MenuItem value={'state 1'}>state 1</MenuItem>
                    <MenuItem value={'state 2'}>state 2</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="form-container">
                <FormControl fullWidth>
                  <TextField
                    id="zip-input"
                    label="ZIP"
                    value={''}
                    onChange={(event) => { }}
                    multiline
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="form-container">
                <FormControl fullWidth>
                  <InputLabel id="country-select-label">COUNTRY</InputLabel>
                  <Select
                    labelId="country-select-label"
                    id="country-select"
                    value={''}
                    onChange={(event) => { }}
                    IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
                  >
                    <MenuItem value={'country 1'}>country 1</MenuItem>
                    <MenuItem value={'country 2'}>country 2</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="group-box region-3">
          <div className="input-area">
            <div className="form-container" style={{ width: '50%' }}>
              <FormControl fullWidth>
                <TextField
                  id="cardholder-name-input"
                  label="CARDHOLDER NAME"
                  value={''}
                  onChange={(event) => { }}
                  multiline
                />
              </FormControl>
            </div>
            <div className="form-container">
              <FormControl fullWidth>
                <TextField
                  id="cardholder-name-input"
                  label="CARDHOLDER NAME"
                  value={''}
                  onChange={(event) => { }}
                  multiline
                />
              </FormControl>
            </div>
            <div className="form-container">
              <Grid container justify="center">
                <Grid item xs={4}>
                  <div style={{ marginRight: '24px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="exp-month-select-label">EXP. MONTH</InputLabel>
                      <Select
                        labelId="exp-month-select-label"
                        id="exp-month-select"
                        value={''}
                        onChange={(event) => { }}
                        IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
                      >
                        <MenuItem value={'region 1'}>region 1</MenuItem>
                        <MenuItem value={'region 2'}>region 2</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div style={{ marginRight: '24px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="exp-year-select-label">EXP. YEAR</InputLabel>
                      <Select
                        labelId="exp-year-select-label"
                        id="exp-year-select"
                        value={''}
                        onChange={(event) => { }}
                        IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
                      >
                        <MenuItem value={'region 1'}>region 1</MenuItem>
                        <MenuItem value={'region 2'}>region 2</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div>
                    <FormControl fullWidth>
                      <TextField
                        id="cvv-name-input"
                        label="CVV"
                        value={''}
                        onChange={(event) => { }}
                        multiline
                      />
                    </FormControl>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className="credit-card">
            <div className="number-label">CARD NUMBER</div>
            <div className="number">{'1234 1234 1234 1234'}</div>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: '2 1 auto'}}>
                <div className="name-label">CARD HOLDER</div>
                <div className="name">{'MIKE MEOW'}</div>
              </div>
              <div style={{ flex: '1 1 auto'}}>
                <div className="expiration-label">VALID UNTIL</div>
                <div className="expiration">{'01/21'}</div>
              </div>
              <div style={{ flex: '1 1 auto'}}>
                <div className="cvv-label">CVV</div>
                <div className="cvv">{'123'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
