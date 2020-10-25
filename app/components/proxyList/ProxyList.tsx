/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/prop-types */
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { List, IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { DateTime } from 'luxon';

export default function ProxyList(props): JSX.Element {
  const { selectedId, proxies, onSelect, onAddProxy, onRemoveProxy } = props;

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
        <div className="window-title icon-title">
          <span className="title-text">PROXY GROUPS</span>
          <IconButton size="small" onClick={onAddProxy}>
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
                const { _id: id, name = '', proxyList = [], createdAt } = n;
                return (
                  <Snackbar
                    key={id}
                    open
                    autoHideDuration={null}
                    className={id === selectedId ? 'selected' : ''}
                    message={<MessageContent name={name} count={proxyList.length} createdAt={createdAt} />}
                    onClick={() => { onSelect(id); }}
                    action={(
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => { onRemoveProxy(id); }}
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
