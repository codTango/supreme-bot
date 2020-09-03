/* eslint-disable react/prop-types */
import React from 'react';
import { IconButton } from '@material-ui/core';
import Close from '@material-ui/icons/Close';

export default function AddTaskPanel(props) {
  const { name, onExpand } = props;

  return (
    <div className="task-panel">
      <div className="title">
        <div className="group-name">
          ADD TASKS TO
          {name}
        </div>
        <IconButton size="small" onClick={onExpand}>
          <Close style={{ color: '#DE3E3E' }} />
        </IconButton>
      </div>
    </div>
  );
}