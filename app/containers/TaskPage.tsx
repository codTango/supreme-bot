/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import TaskGroupTitle from '../components/taskGroupTitle/TaskGroupTitle';
import TaskGroup from '../components/taskGroup/TaskGroup';
import db from '../database/database';

// fake task list
const taskList = [];
Array.from(Array(Math.floor(Math.random() * 100) + 1)).forEach((x, i) => {
  taskList.push({ mode: 'Super', size: 'Random', color: 'Random', profile: 'test', itemQuantity: 10, bypass: true });
});
const fakeGroups = [
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
      category: 'New',
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
      category: 'Hats',
      monitor: 'tshirt',
      proxy: 'shoes'
    },
    taskList
  }
];

export default function TaskGroupPage() {
  // group list state
  const [ groups, setGroups ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const groupsData = await db.find('taskGroups', {});
      setGroups(groupsData);
    }
    
    fetchData();
  }, []);
  
  const handleAddGroup = async (groupInfo) => {
    const data = { ...groupInfo, taskList: [], detail: {}, status: { tasks: 0, checkouts: 0, declines: 0} };
    const res = await db.insert('taskGroups', data);
    setGroups([ ...groups, res ]);
  }

  const handleSaveUpdate = (groupInfo) => {
    const { _id } = groupInfo;

    const res = db.update('taskGroups', { _id }, groupInfo, { returnUpdatedDocs: true });

    const newGroups = groups.map((item, i) => {
      if (item._id !== _id) {
        // This isn't the item we care about - keep it as-is
        return item
      }
  
      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...res
      }
    });
    setGroups(newGroups);
  }

  const handleDeleteGroup = (id) => {
    const index = groups.findIndex(group => group._id === id);
    db.remove('taskGroups', { _id: id });
    setGroups([
      ...groups.slice(0, index),
      ...groups.slice(index + 1)
    ]);
  }

  const handleAddTasks = (taskInfo) => {
    const {
      groupId,
      mode,
      size,
      color,
      profile,
      taskQuantity,
      itemQuantity,
      bypass
    } = taskInfo;
    const [ selectedGroup ] = groups.filter(group => group._id === groupId);

    for (let i = 0; i < Number(taskQuantity); i++) {
      selectedGroup.taskList.push({
        mode,
        size,
        color,
        profile,
        itemQuantity,
        bypass
      })
    }

    selectedGroup.status.tasks += Number(taskQuantity);

    handleSaveUpdate(selectedGroup);
  }

  const handleClearTaskList = (groupId) => {
    const [ selectedGroup ] = groups.filter(group => group._id === groupId);
    selectedGroup.taskList = [];
    selectedGroup.status.tasks = 0;
    handleSaveUpdate(selectedGroup);
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
          onClearTaskList={handleClearTaskList}
        />
      </div>
    </div>
  );
}
