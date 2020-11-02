/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { List, IconButton, Snackbar, Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import visaIcon from '../../assets/visa-icon.png';
import { SquareStack, ImportIcon, ExportIcon } from '../svgIcons/SvgIcons';

export default function ProfileList(props): JSX.Element {
  const {
    profiles,
    profileGroup,
    onAddProfile,
    onAddProfileGroup,
    onRemoveProfile,
    onRemoveProfileGroup,
    onClearAll,
    onSelect,
    selectedId,
    onImport,
    onExport
  } = props;

  const hasProfile = () => {
    return (profiles && profiles.length > 0) || (profileGroup && profileGroup.length > 0);
  }

  const MessageContent = (prop) => {
    const { isGroup = false, name, message } = prop;
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
                    className={id === selectedId ? 'selected' : ''}
                    open
                    autoHideDuration={null}
                    message={<MessageContent isGroup name={name} message={`${profileList && profileList.length} PROFILES`} />}
                    onClick={() => {onSelect(id, true);}}
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
                    className={id === selectedId ? 'selected' : ''}
                    open
                    autoHideDuration={null}
                    message={<MessageContent name={name} message={cardNum} />}
                    onClick={() => {onSelect(id, false);}}
                    action={(
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => { onRemoveProfile(id); }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    )}
                  />
                );
              })}
            </List>
          )}
        </div>
        <div className="clear-all" role="button" onClick={onClearAll}>CLEAR ALL</div>
      </div>
    </div>
  );
}
