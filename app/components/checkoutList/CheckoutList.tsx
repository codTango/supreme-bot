/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/prop-types */
import React from 'react';
import { List, IconButton, Snackbar } from '@material-ui/core';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import visaIcon from '../../assets/visa-icon.png';

export default function CheckoutList(props): JSX.Element {
  const { checkoutList, onRemoveCheckout, onClearAll, onSelect, selectedId } = props;

  const hasCheckout = () => {
    return checkoutList.length > 0;
  }

  const MessageContent = (prop) => {
    const { expand, name, date, mode, delay, color, size } = prop;
    return (
      <div className="message" style={{height: expand ? '120px' : 'inherit'}}>
        <div className="message-icon">
          <img alt="visa-icon" src={visaIcon} />
        </div>
        <div className="message-text">
          <div className="message-main">{name}</div>
          <div className="message-secondary">{date}</div>
        </div>
        {expand && (
          <div className="expand-text">
            <div className="message-detail">
              <span className="label">MODE:</span>
              {mode}
            </div>
            <div className="message-detail">
              <span className="label">CHECKOUT DELAY:</span>
              {delay}
            </div>
            <div className="message-detail">
              <span className="label">COLOR:</span>
              {color}
            </div>
            <div className="message-detail">
              <span className="label">SIZE:</span>
              {size}
            </div>
          </div>
        )}
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
                const { _id: id, name = '', date = '', mode = '', checkoutDelay = '', color = '', size = '' } = n;
                return (
                  <Snackbar
                    key={id}
                    className={id === selectedId ? 'selected' : ''}
                    open
                    autoHideDuration={null}
                    message={<MessageContent expand={id === selectedId} name={name} date={date} mode={mode} delay={checkoutDelay} color={color} size={size} />}
                    onClick={() => {onSelect(id);}}
                    action={(
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => { onRemoveCheckout(id); }}
                      >
                        {id === selectedId ? <KeyboardArrowUp fontSize="inherit" /> : <KeyboardArrowDown fontSize="inherit" />}
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
