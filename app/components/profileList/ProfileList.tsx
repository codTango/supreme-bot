/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { List, IconButton, SvgIcon, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import visaIcon from '../../assets/visa-icon.png';

export default function ProfileList(props): JSX.Element {
  const { profiles } = props;

  const entries = profiles.map(n => ([ n.id, true ]));
  const [open, setOpen] = useState(Object.fromEntries(entries));

  const hasProfile = () => {
    return profiles.length > 0;
  }

  const MessageContent = (prop) => {
    const { name, cardNumber } = prop;
    return (
      <div className="message">
        <div className="message-icon"><img alt="visa-icon" src={visaIcon} /></div>
        <div className="message-text">
          <div className="message-main">{name}</div>
          <div className="message-secondary">{cardNumber}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-list">
      <div className="gradient-box">
        <div className="window-title profile-title">
          <span className="title-text">PROFILES</span>
          <IconButton size="small" onClick={() => {}}>
            <AddIcon style={{color: '#de2e31'}} />
          </IconButton>
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
              {profiles.map(n => {
                const { id, name = '', cardNum = '' } = n;
                return (
                  <Snackbar
                    key={id}
                    open={open[id]}
                    autoHideDuration={null}
                    message={<MessageContent name={name} cardNumber={cardNum} />}
                    action={(
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen({ ...open, [id]: false });
                        }}
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
      </div>
    </div>
  );
}
