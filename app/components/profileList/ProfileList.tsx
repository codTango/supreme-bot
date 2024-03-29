/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { List, IconButton, Snackbar, Menu, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '../Tooltip/Tooltip';
import visaIcon from '../../assets/visa-icon.png';
import { SquareStack, ImportIcon, ExportIcon } from '../svgIcons/SvgIcons';

export default function ProfileList(props): JSX.Element {
  const {
    profiles,
    profileGroup,
    onAddProfile,
    onAddProfileGroup,
    onDuplicateProfile,
    onRemoveProfile,
    onRemoveProfileGroup,
    onClearAll,
    onSelect,
    selectedId,
    onImport,
    onExport
  } = props;

  const [ menu, setMenu ] = useState({
    mouseX: null,
    mouseY: null,
  });

  const handleRightClick = (event) => {
    event.preventDefault();
    setMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleMenuClose = () => {
    setMenu({
      mouseX: null,
      mouseY: null,
    });
  };

  const handleDuplicate = () => {
    onDuplicateProfile(selectedId);
    handleMenuClose();
  }

  const handleDelete = () => {
    onRemoveProfile(selectedId);
    handleMenuClose();
  }

  const hasProfile = () => {
    return (profiles && profiles.length > 0) || (profileGroup && profileGroup.length > 0);
  }

  const MessageContent = (prop) => {
    const { isGroup = false, name, message = '' } = prop;
    return (
      <div className="message">
        <div className="message-icon">{isGroup ? <SquareStack style={{ color: '#de2e31', fontSize: 18 }} /> : <img alt="visa-icon" src={visaIcon} />}</div>
        <div className="message-text">
          <div className="message-main">{name}</div>
          <div className="message-secondary">{message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-list">
      <div className="gradient-box">
        <div className="window-title icon-title">
          <span className="title-text">PROFILES</span>
          <Tooltip title="Add Profile">
            <IconButton size="small" onClick={onAddProfile}>
              <AddIcon style={{color: '#de2e31'}} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Profile Group">
            <IconButton className="stack-btn" size="small" onClick={onAddProfileGroup}>
              <SquareStack style={{ color: '#de2e31', fontSize: 14 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export Profile">
            <IconButton className="export-btn" size="small" onClick={onExport}>
              <ExportIcon style={{ color: '#de2e31' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Import Profile">
            <IconButton className="import-btn" size="small" onClick={onImport}>
              <ImportIcon style={{ color: '#de2e31' }} />
            </IconButton>
          </Tooltip>
        </div>
        <div className="info-area">
          {!hasProfile() && (
            <div className="no-data">
              <h3>No Profiles</h3>
              <p>Nothing to see here...yet</p>
            </div>
          )}
          {hasProfile() && (
            <List>
              {profileGroup.map(n => {
                const { _id: id, name, profiles: profileList } = n;
                return (
                  <Snackbar
                    key={`profile-group-${id}`}
                    className={selectedId.indexOf(id) > -1 ? 'selected' : ''}
                    open
                    autoHideDuration={null}
                    message={<MessageContent isGroup name={name} message={`${profileList && profileList.length} PROFILES`} />}
                    onClick={(event) => {onSelect(event, id, true);}}
                    action={(
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => { onRemoveProfileGroup(id); }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    )}
                  />
                );
              })}
              {profiles.map(n => {
                const { _id: id, name = '', cardNum = '' } = n;
                return (
                  <Snackbar
                    key={`profile-${id}`}
                    className={selectedId.indexOf(id) > -1 ? 'selected' : ''}
                    open
                    autoHideDuration={null}
                    message={<MessageContent name={name} message={cardNum !== '' ? `****${cardNum.substring(cardNum.length - 4)}` : ''} />}
                    onClick={(event) => {onSelect(event, id, false);}}
                    onContextMenu={handleRightClick}
                  />
                );
              })}
            </List>
          )}
        </div>
        <Menu
          keepMounted
          open={menu.mouseY !== null}
          onClose={handleMenuClose}
          anchorReference="anchorPosition"
          anchorPosition={
            menu.mouseY !== null && menu.mouseX !== null
              ? { top: menu.mouseY, left: menu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={handleDuplicate}>Duplicate</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
        <div className="clear-all" role="button" onClick={onClearAll}>CLEAR ALL</div>
      </div>
    </div>
  );
}
