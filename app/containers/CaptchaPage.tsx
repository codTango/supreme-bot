import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { IconButton, Grid } from '@material-ui/core';
import CaptchaContent from '../components/captchaContent/CaptchaContent';
import Tooltip from '../components/Tooltip/Tooltip';

export default function CaptchaPage() {
  return (
    <div className="captcha-region">
      <div className="gradient-box">
        <div className="window-title icon-title">
          <span>CAPTCHA</span>
          <Tooltip title="add">
            <IconButton size="small" onClick={() => { }}>
              <AddIcon style={{color: '#de2e31'}} />
            </IconButton>
          </Tooltip>
        </div>

        <div className="captcha-container">
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <CaptchaContent />
            </Grid>
            <Grid item xs={3}>
              <CaptchaContent />
            </Grid>
            <Grid item xs={3}>
              <CaptchaContent />
            </Grid>
            <Grid item xs={3}>
              <CaptchaContent />
            </Grid>
            <Grid item xs={3}>
              <CaptchaContent />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
