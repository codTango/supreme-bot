/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { List, IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import visaIcon from '../../assets/visa-icon.png';

export default function CheckoutList(props): JSX.Element {
  const { checkoutList, onRemoveCheckout, onClearAll, onSelect, selectedId } = props;

  const hasCheckout = () => {
    return checkoutList.length > 0;
  }

  const MessageContent = (prop) => {
    const { name, message } = prop;
    return (
      <div className="message">
        <div className="message-icon">
          <img alt="visa-icon" src={visaIcon} />
        </div>
        <div className="message-text">
          <div className="message-main">{name}</div>
          <div className="message-secondary">{message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-list">
      <div className="gradient-box">
        <div className="window-title">
          <span className="title-text">RECENT CHECKOUTS</span>
        </div>
        <div className="info-area">
          {!hasCheckout() && (
            <div className="no-data">
              <h3>No Checkouts</h3>
              <p>Nothing to see here...yet</p>
            </div>
          )}
          {hasCheckout() && (
            <List>
              {checkoutList.map(n => {
                const { _id: id, name = '', cardNum = '' } = n;
                return (
                  <Snackbar
                    key={id}
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
                        onClick={() => { onRemoveCheckout(id); }}
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
