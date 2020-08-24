import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';

export default function Notification(): JSX.Element {
  const [ notificatins, setNotification ] = useState([]);

  const hasNotification = () => {
    return notificatins.length > 0;
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
        </div>
      </div>
    </div>
  );
}
