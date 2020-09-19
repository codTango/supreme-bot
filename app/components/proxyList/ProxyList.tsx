/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { List, IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { DateTime } from 'luxon';

export default function ProxyList(props): JSX.Element {
  const { proxies } = props;

  const entries = proxies.map(n => ([ n.id, true ]));
  const [open, setOpen] = useState(Object.fromEntries(entries));

  const hasProxy = () => {
    return proxies.length > 0;
  }

  const MessageContent = (prop) => {
    const { name, count = 0, createdAt } = prop;
    const date = DateTime.fromISO(createdAt).toFormat('LL-dd-yy');

    return (
      <div className="message">
        <div className="message-text">
          <div className="message-main">{name}</div>
          <div className="message-secondary">{`${count} PROXIES / CREATED ${date}`}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="proxy-list">
      <div className="gradient-box">
        <div className="window-title proxy-title">
          <span className="title-text">PROXY GROUPS</span>
          <IconButton size="small" onClick={() => {}}>
            <AddIcon style={{color: '#de2e31'}} />
          </IconButton>
        </div>
        <div className="info-area">
          {!hasProxy() && (
            <div className="no-data">
              <h3>No Proxies</h3>
              <p>Nothing to see here...yet</p>
            </div>
          )}
          {hasProxy() && (
            <List>
              {proxies.map(n => {
                const { id, name = '', proxyList = [], createdAt } = n;
                return (
                  <Snackbar
                    key={id}
                    open={open[id]}
                    autoHideDuration={null}
                    message={<MessageContent name={name} count={proxyList.length} createdAt={createdAt} />}
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
        <div className="clear-all">CLEAR ALL</div>
      </div>
    </div>
  );
}
