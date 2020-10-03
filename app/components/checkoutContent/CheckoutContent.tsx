/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import WarningIcon from '@material-ui/icons/Warning';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import BlockIcon from '@material-ui/icons/Block';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { FormControl, TextField, Select, MenuItem, InputLabel, Grid, Checkbox, Icon } from '@material-ui/core';
import GroupActionButton from '../groupActionButton/GroupActionButton';

export default function CheckoutContent(props): JSX.Element {
  const { profileList = [], profileInfo, onSaveProfile, onRemoveProfile, onRemoveProfileGroup } = props;
  const [ profile, setProfile ] = useState(profileInfo);


  const handleChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  return (
    <div className="analytics-region">
      <div className="gradient-box">
        <div className="window-title">
          <span>ANALYTICS</span>
        </div>

        <div className="group-box update-info">
          <WarningIcon style={{ fontSize: 18, color: '#FFFFFF' }} />
          <div className="content-area">
            <div className="title">MEKPreme update is available now</div>
            <div className="content">CLICK HERE TO UPDATE TO V 1.1</div>
          </div>
        </div>
        <div className="group-box region-1">
          <div className="window-title">
            <span>PERFORMANCE OVERVIEW</span>
          </div>
          <div className="overview-content">
            <div className="content-box">
              <div className="title">TOTAL SPENT</div>
              <div className="status-box">
                <AttachMoneyIcon style={{ fontSize: 16, color: '#8A8A8A' }} />
                <div className="number"><NumberFormat thousandSeparator displayType={'text'} prefix={'$'} value={1123.45} /></div>
              </div>
            </div>
            <div className="content-box">
              <div className="title">TOTAL CHECKOUTS</div>
              <div className="status-box" style={{ borderColor: '#00FFCF' }}>
                <EmojiEmotionsIcon style={{ fontSize: 16, color: '#00FFCF' }} />
                <div className="number">123</div>
              </div>
            </div>
            <div className="content-box">
              <div className="title">TOTAL DECLINES</div>
              <div className="status-box" style={{ borderColor: '#DE3E3E' }}>
                <BlockIcon style={{ fontSize: 16, color: '#DE3E3E' }} />
                <div className="number">123</div>
              </div>
            </div>
          </div>
        </div>
        <div className="group-box region-2">
          <div className="window-title">
            <span>WEEKLY CHECKOUTS</span>
          </div>
          box 3
        </div>

      </div>
    </div>
  );
}
