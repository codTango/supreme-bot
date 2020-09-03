/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import GroupContent from '../groupContent/GroupContent';

export default function TaskGroup(props) {
  const {
    groups = [],
    taskList = [],
    onSave,
    onDeleteGroup,
    onAddTasks
  } = props;

  // group expand state
  const [ expand, setExpand ] = useState(false);
  const [ openGroupId, setOpenGroupId ] = useState(-1);
  const handleExpand = (open, id) => {
    setExpand(!open);
    setOpenGroupId(!open ? id : -1);
  }

  const handleRemoveGroup = (id) => {
    console.log('remove: ', id);
  }

  if (groups.length === 0) {
    return (
      <div className="no-data-container">
        <div className="no-data-primary">No Task Groups</div>
        <div className="no-data-secondary">Select the + above to create your first task group</div>
      </div>
    );
  }

  const render = (group, i) => {
    const {
      id,
      name,
      status: { summary = false } = {}
    } = group;
    const groupStatusColor = summary ? '#00A4FF' : '#E03C38';

    return (
      <div key={i} className="group-box" style={{ height: expand ? '400px' : '190px' }}>

        <div className="group-title">
          <div className="name-status">
            <div className="status">
              <div className="status-node" style={{ backgroundColor: groupStatusColor, boxShadow: `0 0 5px 2px ${groupStatusColor}` }} />
            </div>
            <div className="group-name">{name}</div>
          </div>
          <div className="icon-group">
            <IconButton size="small" onClick={() => { handleExpand(expand, id) }}>
              <KeyboardArrowDown style={{ color: '#DE3E3E' }} />
            </IconButton>
            <IconButton size="small" onClick={() => { onDeleteGroup(i) }}>
              <Close style={{ color: '#DE3E3E' }} />
            </IconButton>
          </div>
        </div>

        <GroupContent
          key={i}
          group={group}
          onSave={(groupInfo) => { onSave(groupInfo, i) }}
        />

        {(taskList.length === 0 && expand) && <div>add task here</div>}
        {(taskList.length > 0 && expand) && <div>task list here</div>}
      </div>
    );
  }

  return (
    <div className="group-container">
      {groups.map((group, i) => {
        const { id } = group;
        if (openGroupId === -1) {
          return render(group, i);
        }

        if (openGroupId !== -1 && openGroupId === id) {
          return render(group, i);
        }
      })}
    </div>
  );
}
