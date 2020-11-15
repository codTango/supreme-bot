/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { FormControl, TextField, Select, MenuItem, InputLabel, Grid, Checkbox, ListItemText } from '@material-ui/core';
import GroupActionButton from '../groupActionButton/GroupActionButton';

export default function ProfileContent(props): JSX.Element {
  const { profileList = [], profileInfo, onSaveProfile, onRemoveProfile, onRemoveProfileGroup } = props;
  const [ profile, setProfile ] = useState(profileInfo);

  useEffect(() => {
    setProfile(profileInfo);
  }, [profileInfo]);

  const {
    type = 'profile',
    name = '',
    region = '',
    firstName = '',
    lastName = '',
    address1 = '',
    address2 = '',
    address3 = '',
    city = '',
    state = '',
    zip = '',
    country = '',
    cardHolder = '',
    cardType = '',
    cardNum = '',
    expMonth = '',
    expYear = '',
    cvv = '',
    profiles = []
  } = profile;

  const handleChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  const renderContent = () => {
    if (type === 'profile') {
      return (
        <>
          <div className="group-box region-1">
            <Grid container justify="center">
              <Grid item xs={4}>
                <div className="form-container">
                  <FormControl fullWidth>
                    <TextField
                      id="profile-name-input"
                      label="PROFILE NAME"
                      value={name}
                      onChange={(event) => { handleChange('name', event.target.value); }}
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
                      value={region}
                      onChange={(event) => { handleChange('region', event.target.value); }}
                      IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
                    >
                      <MenuItem value={'region 1'}>region 1</MenuItem>
                      <MenuItem value={'region 2'}>region 2</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="profile-group-actions">
                  <div className="save-btn">
                    <FormControl fullWidth>
                      <GroupActionButton tooltip="save" icon="save" actionHandler={() => { onSaveProfile(profile, false); }} />
                    </FormControl>
                  </div>
                  <div className="remove-btn">
                    <FormControl fullWidth>
                      <GroupActionButton tooltip="delete" icon="trash" actionHandler={() => { onRemoveProfile([profile._id]); }} />
                    </FormControl>
                  </div>
                </div>
              </Grid>
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
                      value={firstName}
                      onChange={(event) => { handleChange('firstName', event.target.value); }}
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
                      value={lastName}
                      onChange={(event) => { handleChange('lastName', event.target.value); }}
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
                      value={address1}
                      onChange={(event) => { handleChange('address1', event.target.value); }}
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
                      value={address2}
                      onChange={(event) => { handleChange('address2', event.target.value); }}
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
                      value={address3}
                      onChange={(event) => { handleChange('address3', event.target.value); }}
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
                      value={city}
                      onChange={(event) => { handleChange('city', event.target.value); }}
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
                      value={state}
                      onChange={(event) => { handleChange('state', event.target.value); }}
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
                      value={zip}
                      onChange={(event) => { handleChange('zip', event.target.value); }}
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
                      value={country}
                      onChange={(event) => { handleChange('country', event.target.value); }}
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
              <div className="form-container">
                <Grid container justify="center">
                  <Grid item xs={6}>
                    <div style={{ marginRight: '24px' }}>
                      <FormControl fullWidth>
                        <TextField
                          id="cardholder-name-input"
                          label="CARDHOLDER NAME"
                          value={cardHolder}
                          onChange={(event) => { handleChange('cardHolder', event.target.value); }}
                        />
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="card-type-select-label">CARD TYPE</InputLabel>
                      <Select
                        labelId="card-type-select-label"
                        id="card-type-select"
                        value={cardType}
                        onChange={(event) => { handleChange('cardType', event.target.value); }}
                        IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
                      >
                        <MenuItem value={'Visa'}>Visa</MenuItem>
                        <MenuItem value={'Mastercard'}>Mastercard</MenuItem>
                        <MenuItem value={'American Express'}>American Express</MenuItem>
                        <MenuItem value={'Discover'}>Discover</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
              <div className="form-container">
                <FormControl fullWidth>
                  <TextField
                    id="cardholder-name-input"
                    label="CARD NUMBER"
                    value={cardNum}
                    onChange={(event) => { handleChange('cardNum', event.target.value); }}
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
                          value={expMonth}
                          onChange={(event) => { handleChange('expMonth', event.target.value); }}
                          IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
                        >
                          <MenuItem value={'01'}>01</MenuItem>
                          <MenuItem value={'02'}>02</MenuItem>
                          <MenuItem value={'03'}>03</MenuItem>
                          <MenuItem value={'04'}>04</MenuItem>
                          <MenuItem value={'05'}>05</MenuItem>
                          <MenuItem value={'06'}>06</MenuItem>
                          <MenuItem value={'07'}>07</MenuItem>
                          <MenuItem value={'08'}>08</MenuItem>
                          <MenuItem value={'09'}>09</MenuItem>
                          <MenuItem value={'10'}>10</MenuItem>
                          <MenuItem value={'11'}>11</MenuItem>
                          <MenuItem value={'12'}>12</MenuItem>
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
                          value={expYear}
                          onChange={(event) => { handleChange('expYear', event.target.value); }}
                          IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
                        >
                          <MenuItem value={'21'}>2021</MenuItem>
                          <MenuItem value={'22'}>2022</MenuItem>
                          <MenuItem value={'23'}>2023</MenuItem>
                          <MenuItem value={'24'}>2024</MenuItem>
                          <MenuItem value={'25'}>2025</MenuItem>
                          <MenuItem value={'26'}>2026</MenuItem>
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
                          value={cvv}
                          onChange={(event) => { handleChange('cvv', event.target.value); }}
                        />
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="credit-card">
              <div className="number-label">CARD NUMBER</div>
              <div className="number">{cardNum}</div>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: '2 1 auto'}}>
                  <div className="name-label">CARD HOLDER</div>
                  <div className="name">{cardHolder}</div>
                </div>
                <div style={{ flex: '1 1 auto'}}>
                  <div className="expiration-label">VALID UNTIL</div>
                  <div className="expiration">{(expMonth !== '' && expYear !== '') ? `${expMonth}/${expYear}` : ''}</div>
                </div>
                <div style={{ flex: '1 1 auto'}}>
                  <div className="cvv-label">CVV</div>
                  <div className="cvv">{cvv}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="group-box region-1">
          <Grid container justify="center">
            <Grid item xs={4}>
              <div className="form-container">
                <FormControl fullWidth>
                  <TextField
                    id="profile-name-input"
                    label="PROFILE GROUP NAME"
                    value={name}
                    onChange={(event) => { handleChange('name', event.target.value); }}
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="form-container">
                <FormControl fullWidth>
                  <InputLabel id="profile-list-select-label">{`PROFILES${profiles.length > 0 ? ` (${profiles.length})` : ''}`}</InputLabel>
                  <Select
                    labelId="profile-list-select-label"
                    id="profile-list-select"
                    multiple
                    value={profiles}
                    renderValue={(selected) => profileList.filter(p => selected.indexOf(p._id) > -1).map(p => p.name).join(', ')}
                    onChange={(event) => { handleChange('profiles', event.target.value); }}
                    IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#787878'}} /> : <KeyboardArrowDown style={{color: '#787878'}} />)}
                  >
                    {profileList.map(({_id: id, name: profileName}) => (
                      <MenuItem key={id} value={id}>
                        <Checkbox checked={profiles.indexOf(id) > -1} />
                        <ListItemText primary={profileName} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="profile-group-actions">
                <div className="save-btn">
                  <FormControl fullWidth>
                    <GroupActionButton icon="save" actionHandler={() => { onSaveProfile(profile, true); }} />
                  </FormControl>
                </div>
                <div className="remove-btn">
                  <FormControl fullWidth>
                    <GroupActionButton icon="trash" actionHandler={() => { onRemoveProfileGroup(profile._id); }} />
                  </FormControl>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }

  return (
    <div className="profile-region">
      <div className="gradient-box">
        <div className="window-title profile-title">
          <span>{type === 'profile' ? 'PROFILES' : 'PROFILE GROUP'}</span>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
