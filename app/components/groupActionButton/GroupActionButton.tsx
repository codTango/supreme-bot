/* eslint-disable react/prop-types */
import React from 'react';
import { IconButton, SvgIcon } from '@material-ui/core';
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Add from '@material-ui/icons/Add';

const Flash = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M 19.386719 9.253906 C 19.300781 9.097656 19.132812 9 18.953125 9 L 12.402344 9 L 13.5 0.609375 C 13.527344 0.378906 13.390625 0.160156 13.167969 0.0820312 C 12.949219 0.00390625 12.707031 0.0898438 12.582031 0.28125 L 4.613281 14.238281 C 4.519531 14.390625 4.515625 14.585938 4.605469 14.742188 C 4.691406 14.902344 4.859375 15 5.039062 15 L 11.492188 15 L 10.621094 23.402344 C 10.605469 23.632812 10.746094 23.847656 10.964844 23.917969 C 11.183594 23.992188 11.425781 23.90625 11.546875 23.710938 L 19.382812 9.757812 C 19.476562 9.601562 19.476562 9.410156 19.386719 9.253906 Z M 19.386719 9.253906" />
    </SvgIcon>
  );
};

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
    case 'flash':
      Icon = Flash;
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