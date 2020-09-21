/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import TaskGroupTitle from '../components/taskGroupTitle/TaskGroupTitle';
import TaskGroup from '../components/taskGroup/TaskGroup';
import db from '../database/database';

export default function TaskGroupPage() {
  // group list state
  const [ groups, setGroups ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const groupsData = await db.find('taskGroups', {});
      setGroups(groupsData);
      console.log('task: fetch data on task');
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
