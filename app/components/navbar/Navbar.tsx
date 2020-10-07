/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonIcon from '@material-ui/icons/Person';
import TwitterIcon from '@material-ui/icons/Twitter';
import { remote } from 'electron';
import { NavLink } from 'react-router-dom';
import {
  ProxyIcon,
  CaptchaIcon,
  AnalyticsIcon,
  SettingIcon,
  SelectionBarIcon,
  DiscordIcon
} from '../svgIcons/SvgIcons';

export default function Navbar(): JSX.Element {


  const handleClose = () => {
    const win = remote.getCurrentWindow();
    win.close();
  }

  const handleMinimize = () => {
    const win = remote.getCurrentWindow();
    win.minimize();
  }

  const handleMaximize= () => {
    const win = remote.getCurrentWindow();

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
  
  return (
    <div className="nav-bar">
      <div className="browser-buttons">
        <div style={{ display: 'inline-block' }}>
          <div id="close-btn" className="close" role="button" tabIndex={0} onClick={handleClose}>
            <div className="closeButton"><span><strong>x</strong></span></div>
          </div>
        </div>
        <div style={{ display: 'inline-block' }}>
          <div id="min-btn" className="minimize" role="button" tabIndex={0} onClick={handleMinimize}>
            <div className="minimizeButton"><span><strong>&ndash;</strong></span></div>
          </div>
        </div>
        <div style={{ display: 'inline-block' }}>
          <div id="max-btn" className="zoom" role="button" tabIndex={0} onClick={handleMaximize}>
            <div className="zoomButton"><span><strong>&#43;</strong></span></div>
          </div>
        </div>
      </div>
      <div className="menu">
        <div className="menu-item">
          <NavLink to="/analytics" activeClassName="selected">
            <IconButton>
              <AnalyticsIcon className="menu-item-icon" />
            </IconButton>
            <SelectionBarIcon className="selectionBar" />
          </NavLink>
        </div>
        <div className="menu-item">
          <NavLink to="/task" activeClassName="selected">
            <IconButton style={{width: '44px'}}>
              <AssignmentIcon className="menu-item-icon" />
            </IconButton>
            <SelectionBarIcon className="selectionBar" />
          </NavLink>
        </div>
        <div className="menu-item">
          <NavLink to="/profile" activeClassName="selected">
            <IconButton style={{width: '44px'}}>
              <PersonIcon className="menu-item-icon" />
            </IconButton>
            <SelectionBarIcon className="selectionBar" />
          </NavLink>
        </div>
        <div className="menu-item">
          <NavLink to="/proxy" activeClassName="selected">
            <IconButton>
              <ProxyIcon className="menu-item-icon" />
            </IconButton>
            <SelectionBarIcon className="selectionBar" />
          </NavLink>
        </div>
        <div className="menu-item">
          <NavLink to="/captcha" activeClassName="selected">
            <IconButton>
              <CaptchaIcon className="menu-item-icon" />
            </IconButton>
            <SelectionBarIcon className="selectionBar" />
          </NavLink>
        </div>
        <div className="menu-item">
          <NavLink to="/setting" activeClassName="selected">
            <IconButton>
              <SettingIcon className="menu-item-icon" />
            </IconButton>
            <SelectionBarIcon className="selectionBar" />
          </NavLink>
        </div>
      </div>
      <div className="status">
        <div className="status-box">
          <div className="dot" style={{ background: '#DE3E3E' }} />
          READY
        </div>
        <div className="status-box">
          <div className="dot" />
          POOKY
        </div>
      </div>
      <div className="nav-footer">
        <div className="social-icons">
          <a href="#">
            <DiscordIcon style={{ fontSize: 18, color: '#444A58' }} />
          </a>
          <a href="#">
            <TwitterIcon style={{ fontSize: 18, color: '#444A58' }} />
          </a>
        </div>
        <div className="version">1.0.0</div>
      </div>
    </div>
  );
}
