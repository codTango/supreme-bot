/* eslint-disable react/prop-types */
import React from 'react';
import Refresh from '@material-ui/icons/Refresh';
import Delete from '@material-ui/icons/Delete';
import { ListItem, ListItemText, SvgIcon, IconButton } from '@material-ui/core';
import { AutoSizer } from 'react-virtualized';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

const StatusIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path id="path-1" d="m 24 0 c -2 0 -4 2 -4 4 l 0 16 c 0 2 2 4 4 4" />
    </SvgIcon>
  );
}

function renderRow(props: ListChildComponentProps) {
  const { index, style, data } = props;
  const color = 'red';

  return (
    <ListItem style={style} key={index}>
      {/* <ListItemText primary={data[index]} /> */}
      <div className="list-item">
        <div className="status"><StatusIcon id="proxy-status" style={{ color }} /></div>
        <div className="proxy-ip">{data[index]}</div>
        <div className="latency" style={{ color }}>{'500 MS'}</div>
        <div className="actions">
          <IconButton size="small">
            <Refresh style={{ fontSize: 18 }} />
          </IconButton>
          <IconButton size="small">
            <Delete style={{ fontSize: 18 }} />
          </IconButton>
        </div>
      </div>
    </ListItem>
  );
}

export default function VirtualizedList(props) {
  const { list = [] } = props;

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          width={width}
          itemSize={46}
          itemCount={list.length}
          itemData={list}
        >
          {renderRow}
        </List>
      )}
    </AutoSizer>
  );
}
