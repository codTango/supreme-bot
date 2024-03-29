/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import TaskGroupTitle from '../components/taskGroupTitle/TaskGroupTitle';
import TaskGroup from '../components/taskGroup/TaskGroup';
import { NotificationContext } from '../components/notification/Notification';
import db from '../database/database';

export default function TaskGroupPage() {
  // group list state
  const [ groups, setGroups ] = useState([]);
  const [ profileList, setProfileList ] = useState([]);
  const [ proxyList, setProxyList ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const groupsData = await db.find('taskGroups', {});
      const profilesData = await db.find('profiles', {});
      const profileGroupData = await db.find('profileGroups', {});
      const proxyData = await db.find('proxy', {});
      setGroups(groupsData);
      setProfileList(profileGroupData.concat(profilesData));
      setProxyList(proxyData);
    }
    
    fetchData();
  }, []);
  
  const handleAddGroup = async (groupInfo) => {
    const data = { ...groupInfo, taskList: [], detail: {}, status: { tasks: 0, success: 0, carted: 0, queued: 0 } };
    const res = await db.insert('taskGroups', data);
    setGroups([ ...groups, res ]);
  }

  const handleSaveUpdate = async (groupInfo) => {
    const { _id } = groupInfo;

    const res = await db.update('taskGroups', { _id }, groupInfo, { returnUpdatedDocs: true });

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
      bypass,
      status
    } = taskInfo;
    const [ selectedGroup ] = groups.filter(group => group._id === groupId);

    let profileData = [ profile ];
    if (profile.type === 'profileGroup') {
      const { profiles } = profile;
      profileData = profileList.filter(p => profiles.indexOf(p._id) > -1);
    }
    for (let i = 0; i < Number(taskQuantity); i++) {
      for (let j = 0; j < profileData.length; j++) {
        selectedGroup.taskList.push({
          mode,
          size,
          color,
          profile: profileData[j],
          itemQuantity,
          bypass,
          status
        });
      }
    }

    selectedGroup.status.tasks += Number(taskQuantity * profileData.length);

    handleSaveUpdate(selectedGroup);
  }

  const handleDuplicate = async (id) => {
    const data = await db.findOne('taskGroups', { _id: id });
    delete data._id;
    const res = await db.insert('taskGroups', { ...data });
    setGroups([ ...groups, res ]);
  }

  const handleClearTaskList = (groupId) => {
    const [ selectedGroup ] = groups.filter(group => group._id === groupId);
    selectedGroup.taskList = [];
    selectedGroup.status.tasks = 0;
    handleSaveUpdate(selectedGroup);
  }
  
  return (
    <NotificationContext.Consumer>
      {({setNotification}) => (
        <div className="task-group-region">
          <div className="gradient-box">
            <TaskGroupTitle onAddGroup={handleAddGroup} />
            <TaskGroup
              taskGroup={groups}
              profileList={profileList}
              proxyList={proxyList}
              onSave={(groupInfo) => {
                handleSaveUpdate(groupInfo);
                setNotification({ id: uuid(), mainText: 'Task Group Saved', secondaryText: 'Successful saved task group!' });
              }}
              onDeleteGroup={handleDeleteGroup}
              onAddTasks={handleAddTasks}
              onDuplicate={(id) => {
                handleDuplicate(id);
                setNotification({ id: uuid(), mainText: 'Task Group Duplicated', secondaryText: 'Successful duplicated task group!' });
              }}
              onClearTaskList={handleClearTaskList}
            />
          </div>
        </div>
      )}
    </NotificationContext.Consumer>
  );
}
