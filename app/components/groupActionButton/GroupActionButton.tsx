import React from 'react';
import { IconButton } from '@material-ui/core';
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Add from '@material-ui/icons/Add';

export default function GroupActionButton(props) {
  const { icon, actionHandler, text } = props;
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
    default:
      break;
  }
  
  return (
    <IconButton size={text ? 'medium' : 'small'} style={{ padding: text ? '10px 24px' : '5px' }} onClick={actionHandler}>
      <Icon style={{ fontSize: text ? 12 : 24 }} />
      {text && <span className='text'>{text}</span>}
    </IconButton>
  );
}