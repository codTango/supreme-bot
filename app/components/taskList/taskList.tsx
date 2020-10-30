/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import VirtualizedTable from '../virtualizedTable/VirtualizedTable';

export default function TaskList(props) {
  const { theGroup, onBypassToggle, onBypassToggleBulk } = props;
  const { taskList } = theGroup;

  return (
    <div className="task-list">
      <VirtualizedTable
        onBypassToggle={onBypassToggle}
        onBypassToggleBulk={onBypassToggleBulk}
        rowCount={taskList.length}
        rowGetter={({ index }) => taskList[index]}
        columns={[
          {
            width: 100,
            label: '#',
            dataKey: 'index',
          },
          {
            width: 200,
            label: 'PROFILE',
            dataKey: 'profile',
            numeric: true,
          },
          {
            width: 200,
            label: 'BYPASS',
            dataKey: 'bypass',
            numeric: true,
          },
          {
            width: 200,
            label: 'SIZE',
            dataKey: 'size',
            numeric: true,
          },
          {
            width: 200,
            label: 'COLOR',
            dataKey: 'color',
            numeric: true,
          },
          {
            width: 200,
            label: 'MODE',
            dataKey: 'mode',
            numeric: true,
          },
          {
            width: 200,
            label: 'STATUS',
            dataKey: 'status',
            numeric: true,
          },
          {
            width: 300,
            label: 'ACTION',
            dataKey: 'action',
            numeric: true,
          },
        ]}
      />
    </div>
  );
}