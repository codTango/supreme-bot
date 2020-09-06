/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import GroupContent from '../groupContent/GroupContent';
import AddTaskPanel from '../addTaskPanel/AddTaskPanel';

export default function TaskGroup(props) {
  const {
    groups = [],
    onSave,
    onDeleteGroup,
    onAddTasks
  } = props;

  // group expand state
  const [ expand, setExpand ] = useState(false);
  const [ openGroupId, setOpenGroupId ] = useState(-1);
  const [ addTask, setAddTask ] = useState(false);

  const handleExpand = (open, id, taskList) => {
    if (taskList.length > 0) {
      setExpand(!open);
      setOpenGroupId((!open || addTask) ? id : -1);
    }
  }

  const handleAddTask = (open, id) => {
    setAddTask(open);
    setOpenGroupId((open || expand) ? id : -1);
  }

  const handleDeleteGroup = (index) => {
    onDeleteGroup(index);
    setExpand(false);
    setAddTask(false);
    setOpenGroupId(-1);
  }

  if (groups.length === 0) {
    return (
      <div className="no-data-container">
        <div className="no-data-primary">No Task Groups</div>
        <div className="no-data-secondary">Select the + above to create your first task group</div>
      </div>
    );
  }

  const renderContent = (index, id, name, taskList) => {
    if (addTask) {
      return (
        <AddTaskPanel
          index={index}
          groupId={id}
          name={name}
          onClose={() => { handleAddTask(false, id) }}
          onAddTasks={onAddTasks}
        />
      );
    }

    if (taskList.length > 0 && expand) {
        return (<div>{taskList.length}</div>);
    }
  }

  const render = (group, i) => {
    const {
      id,
      name,
      status: { summary = false } = {},
      taskList = []
    } = group;
    const groupStatusColor = summary ? '#00A4FF' : '#E03C38';

    return (
      <div key={i} className="group-box" style={{ height: addTask ? '400px' : ( expand ? '670px' : '190px' ) }}>

        <div className="group-title">
          <div className="name-status">
            <div className="status">
              <div className="status-node" style={{ backgroundColor: groupStatusColor, boxShadow: `0 0 5px 2px ${groupStatusColor}` }} />
            </div>
            <div className="group-name">{name}</div>
          </div>
          <div className="icon-group">
            <IconButton size="small" onClick={() => { handleExpand(expand, id, taskList) }}>
              <KeyboardArrowDown style={{ color: '#DE3E3E' }} />
            </IconButton>
            <IconButton size="small" onClick={() => { handleDeleteGroup(i) }}>
              <Close style={{ color: '#DE3E3E' }} />
            </IconButton>
          </div>
        </div>

        <GroupContent
          key={i}
          group={group}
          onSave={(groupInfo) => { onSave(groupInfo, i) }}
          onAddTask={() => { handleAddTask(true, id) }}
        />

        {renderContent(i, id, name, taskList)}
      </div>
    );
  }

  return (
    <div className="group-container">
      {groups.map((group, i) => {
        const { id } = group;
        if (expand || addTask) {
          if (openGroupId === id) {
            return render(group, i);
          } else {
            return;
          }
        }
        
        return render(group, i);
      })}
    </div>
  );
}
