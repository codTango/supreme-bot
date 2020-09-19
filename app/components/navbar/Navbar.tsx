import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonIcon from '@material-ui/icons/Person';
import { remote } from 'electron';
import { NavLink } from 'react-router-dom';
import {
  ProxyIcon,
  CaptchaIcon,
  AnalyticsIcon,
  SettingIcon,
  SelectionBarIcon
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
    </div>
  );
}
