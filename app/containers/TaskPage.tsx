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
        tasks: 1000,
        checkouts: 5,
        declines: 3
      },
      detail: {
        monitorDelay: '12',
        checkoutDelay: '100',
        keywords: 'test keyword',
        category: 'shoes',
        monitor: 'tshirt',
        proxy: 'shoes'
      },
      taskList: []
    },
    {
      id: 11,
      name: 'test2',
      store: 'testStore',
      status: {
        summary: false,
        tasks: 500,
        checkouts: 5,
        declines: 3
      },
      detail: {
        monitorDelay: '12',
        checkoutDelay: '100',
        keywords: 'test keyword',
        category: 'shoes',
        monitor: 'tshirt',
        proxy: 'shoes'
      },
      taskList: [
        'test'
      ]
    }
  ]);
  
  const handleAddGroup = (groupInfo) => {
    setGroups([ ...groups, { ...groupInfo, taskList: [] } ]);
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

  const handleDeleteGroup = (index) => {
    setGroups([
      ...groups.slice(0, index),
      ...groups.slice(index + 1)
    ]);
  }

  const handleAddTasks = (taskInfo) => {
    const {
      index,
      groupId,
      mode,
      size,
      color,
      profile,
      taskQuantity,
      itemQuantity,
      bypass
    } = taskInfo;
    const [ selectedGroup ] = groups.filter(group => group.id === groupId);

    for (let i = 0; i < taskQuantity; i++) {
      selectedGroup.taskList.push({
        mode,
        size,
        color,
        profile,
        itemQuantity,
        bypass
      })
    }

    handleSaveUpdate(selectedGroup, index);
  }
  
  return (
    <div className="task-group-region">
      <div className="gradient-box">
        <TaskGroupTitle onAddGroup={handleAddGroup} />
        <TaskGroup
          groups={groups}
          onSave={handleSaveUpdate}
          onDeleteGroup={handleDeleteGroup}
          onAddTasks={handleAddTasks}
        />
      </div>
    </div>
  );
}
