import React, { useState } from 'react';
import TaskGroupTitle from '../components/taskGroupTitle/TaskGroupTitle';
import TaskGroup from '../components/taskGroup/TaskGroup';

export default function TaskGroupPage() {

  // group list state
  const [ groups, setGroups ] = useState([
    {
      id: 10,
      name: 'test',
      store: 'testStore',
      status: {
        summary: true,
        tasks: 0,
        checkouts: 0,
        declines: 0
      },
      detail: {
        monitorDelay: '',
        checkoutDelay: '',
        keywords: '',
        category: '',
        monitor: '',
        proxy: ''
      }
    }
  ]);
  
  const handleAddGroup = (groupInfo) => {
    setGroups([ ...groups, groupInfo ]);
  }

  const handleSaveUpdate = (groupInfo, index) => {
    groups.map((item, i) => {
      if (i !== index) {
        // This isn't the item we care about - keep it as-is
        return item
      }
  
      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...groupInfo
      }
    });
    setGroups(groups);
  }
  
  return (
    <div className="task-group-region">
      <div className="gradient-box">
        <TaskGroupTitle onAddGroup={handleAddGroup} />
        <TaskGroup groups={groups} onSave={handleSaveUpdate} />
      </div>
    </div>
  );
}
