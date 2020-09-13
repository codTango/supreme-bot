/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import GroupContent from '../groupContent/GroupContent';
import AddTaskPanel from '../addTaskPanel/AddTaskPanel';
import TaskList from '../taskList/taskList';

export default function TaskGroup(props) {
  const {
    groups = [],
    onSave,
    onDeleteGroup,
    onAddTasks,
    onClearTaskList
  } = props;

  // group expandTaskList state
  const [ expandTaskList, setExpandTaskList ] = useState(false);
  const [ openGroupId, setOpenGroupId ] = useState(-1);
  const [ expandTaskPanel, setExpandTaskPanel ] = useState(false);

  const handleExpandTaskList = (open, id, taskList) => {
    // if (taskList.length > 0) {
      setExpandTaskList(!open);
      setOpenGroupId((!open || expandTaskPanel) ? id : -1);
    // }
  }

  const handleExpandTaskPanel = (open, id) => {
    setExpandTaskPanel(open);
    setOpenGroupId((open || expandTaskList) ? id : -1);
  }

  const handleDeleteGroup = (id) => {
    onDeleteGroup(id);
    setExpandTaskList(false);
    setExpandTaskPanel(false);
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

  const renderContent = (id, name, taskList) => {
    if (expandTaskPanel) {
      return (
        <AddTaskPanel
          groupId={id}
          name={name}
          onClose={() => { handleExpandTaskPanel(false, id) }}
          onAddTasks={onAddTasks}
          expandTaskList={() => { handleExpandTaskPanel(false, id); handleExpandTaskList(false, id, taskList); }}
        />
      );
    }

    if (taskList.length > 0 && expandTaskList) {
        return (<TaskList taskList={taskList} />);
    }
  }

  const renderGroup = (group, i) => {
    const {
      _id,
      name,
      status: { summary = false } = {},
      taskList = []
    } = group;
    const groupStatusColor = summary ? '#00A4FF' : '#E03C38';

    return (
      <div key={i} className="group-box" style={{ height: expandTaskPanel ? '400px' : ( expandTaskList ? '95%' : '190px' ) }}>

        <div className="group-title">
          <div className="name-status">
            <div className="status">
              <div className="status-node" style={{ backgroundColor: groupStatusColor, boxShadow: `0 0 5px 2px ${groupStatusColor}` }} />
            </div>
            <div className="group-name">{name}</div>
          </div>
          <div className="icon-group">
            <IconButton size="small" onClick={() => { handleExpandTaskList(expandTaskList, _id, taskList) }}>
              <KeyboardArrowDown style={{ color: '#DE3E3E' }} />
            </IconButton>
            <IconButton size="small" onClick={() => { handleDeleteGroup(_id) }}>
              <Close style={{ color: '#DE3E3E' }} />
            </IconButton>
          </div>
        </div>

        <GroupContent
          key={i}
          group={group}
          onSave={onSave}
          onAddTask={() => { handleExpandTaskPanel(true, _id); }}
          onClearTaskList={() => { onClearTaskList(_id); }}
        />

        {renderContent(_id, name, taskList)}
      </div>
    );
  }

  return (
    <div className="group-container">
      <div className="group-inner-container" style={{ overflow: expandTaskList ? 'unset' : 'auto' }}>
        {groups.map((group, i) => {
          const { _id } = group;
          if (expandTaskList || expandTaskPanel) {
            if (openGroupId === _id) {
              return renderGroup(group, i);
            }
            return;
          }
          
          return renderGroup(group, i);
        })}
      </div>
    </div>
  );
}
