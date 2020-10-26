/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Avatar, List, IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CheckIcon } from '../svgIcons/SvgIcons';

export default function Notification(props): JSX.Element {
  const { notificationProp = [] } = props;
  const [ notificatins, setNotifications ] = useState(notificationProp);

  useEffect(() => {
    setNotifications(notificationProp);
  }, [notificationProp]);

  const entries = notificatins.map(n => ([ n.id, true ]));
  const [open, setOpen] = useState(Object.fromEntries(entries));

  const hasNotification = () => {
    return notificatins.length > 0;
  }

  const handleClearAll = () => {
    setNotifications([]);
  }

  const MessageContent = (prop) => {
    const { mainText, secondaryText } = prop;
    return (
      <div className="message">
        <div className="message-icon"><CheckIcon /></div>
        <div className="message-text">
          <div className="message-main">{mainText}</div>
          <div className="message-secondary">{secondaryText}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="notification">
      <div className="user-info">
        <Avatar />
        <div className="info">
          <div>user name</div>
          <div>experination time</div>
        </div>
      </div>
      <div className="gradient-box">
        <div className="window-title notification-title">
          <span>NOTIFICATIONS</span>
        </div>
        <div className="info-area">
          {!hasNotification() && (
            <div className="no-data">
              <h3>No Notifications</h3>
              <p>Nothing to see here...yet</p>
            </div>
          )}
          {hasNotification() && (
            <List>
              {notificatins.map(n => {
                const { id, mainText = '', secondaryText = '' } = n;
                return (
                  <Snackbar
                    key={id}
                    open={open[id]}
                    autoHideDuration={null}
                    message={<MessageContent mainText={mainText} secondaryText={secondaryText} />}
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
          <div className="clear-all" role="button" onClick={handleClearAll}>CLEAR ALL</div>
        </div>
      </div>
    </div>
  );
}
