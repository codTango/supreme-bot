/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Avatar, List, IconButton, SvgIcon, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function Notification(): JSX.Element {
  const [ notificatins, setNotification ] = useState([
    { id: 1, mainText: 'Check Email', secondaryText: 'Successful order completed!' },
    { id: 2, mainText: 'Check Email', secondaryText: 'Successful order completed!Successful order completed!' },
    { id: 3, mainText: 'new', secondaryText: 'Successful order!' },
  ]);

  const entries = notificatins.map(n => ([ n.id, true ]));
  const [open, setOpen] = useState(Object.fromEntries(entries));

  const hasNotification = () => {
    return notificatins.length > 0;
  }

  const CheckIcon = (props) => {
    return (
      <SvgIcon {...props}>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="mek-tasks-expanded" transform="translate(-1257.000000, -223.000000)">
            <g id="Group-10" transform="translate(1257.000000, 223.000000)">
              <circle id="Oval" fill="#30C9AC" cx="9" cy="9" r="9" />
              <g id="check" transform="translate(3.000000, 2.000000)" fill="#FFFFFF" fillRule="nonzero">
                <path d="M4.54344742,11.3832404 L0.574326212,7.37568686 C0.206608274,7.00483305 0,6.50165655 0,5.97696529 C0,5.45227403 0.206608274,4.94909754 0.574326212,4.57824373 L0.574326212,4.57824373 C1.33996132,3.80655674 2.58010456,3.80655674 3.34573967,4.57824373 L5.8314404,7.08498349 C5.93575499,7.18969102 6.10426661,7.18969102 6.2085812,7.08498349 L12.6542603,0.578765243 C13.4198954,-0.192921748 14.6600387,-0.192921748 15.4256738,0.578765243 L15.4256738,0.578765243 C15.7933917,0.949619054 16,1.45279555 16,1.97748681 C16,2.50217807 15.7933917,3.00535456 15.4256738,3.37620837 L7.49428847,11.3832404 C6.6793708,12.2055865 5.35836509,12.2055865 4.54344742,11.3832404 Z" id="Path" />
              </g>
            </g>
          </g>
        </g>
      </SvgIcon>
    );
  }

  const MessageContent = (props) => {
    const { mainText, secondaryText } = props;
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
        </div>
      </div>
    </div>
  );
}
