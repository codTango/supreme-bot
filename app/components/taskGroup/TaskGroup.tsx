import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';

export default function TaskGroup(): JSX.Element {

  return (
    <div className="task-group">
      <div className="gradient-box">
        <div className="window-title task-group-title">
          <span className="title-text">TASK GROUPS</span>
          <IconButton size="small">
            <AddIcon style={{color: '#de2e31'}} />
          </IconButton>
        </div>
        <div className="task-area">task list here</div>
      </div>
    </div>
  );
}
