/* eslint-disable react/prop-types */
import React from 'react';
import { IconButton } from '@material-ui/core';
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Add from '@material-ui/icons/Add';
import Email from '@material-ui/icons/Email';
import CallMade from '@material-ui/icons/CallMade';
import { Flash } from '../svgIcons/SvgIcons';

export default function GroupActionButton(props) {
  const { icon, actionHandler, text, style = {} } = props;
  let Icon;

  switch (icon) {
    case 'save':
      Icon = Save;
      break;
    case 'trash':
      Icon = Delete;
      break;
    case 'play':
      Icon = PlayArrow;
      break;
    case 'plus':
      Icon = Add;
      break;
    case 'flash':
      Icon = Flash;
      break;
    case 'email':
      Icon = Email;
      break;
    case 'callMade':
      Icon = CallMade;
      break;
    default:
      break;
  }
  
  return (
    <IconButton size={text ? 'medium' : 'small'} style={{ padding: text ? '10px 24px' : '5px', ...style }} onClick={actionHandler}>
      {icon && <Icon style={{ fontSize: text ? 12 : 24 }} />}
      {text && <span style={{ marginLeft: icon ? '10px' : '0' }}>{text}</span>}
    </IconButton>
  );
}