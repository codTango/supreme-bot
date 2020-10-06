/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { FormControl, TextField, Grid, IconButton } from '@material-ui/core';
import GroupActionButton from '../groupActionButton/GroupActionButton';
import VirtualizedList from '../virtualizedList/VirtualizedList';

export default function ProxyContent(props): JSX.Element {
  // set proxy text area height
  const [ rows, setRows ] = useState(20);
  const [ windowHeight, setWindowHeight ] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      // console.log('resized to: ', window.innerWidth, 'x', window.innerHeight);
      const h = window.innerHeight;
      const rowN = Math.floor((h - 490) / 19);
      // console.log({ height: h, rows: rowN });
      setWindowHeight(h);
      setRows(rowN);
    };
    handleResize();
    window.addEventListener('resize', _.debounce(handleResize, 500));
  }, [windowHeight]);

  // set default state
  const { selectedProxy, onSaveProxy } = props;
  const [ proxy, setProxy ] = useState(selectedProxy);
  const [ testProxy, setTestProxy ] = useState([]);

  useEffect(() => {
    setProxy(selectedProxy);
  }, [selectedProxy]);

  const { name, proxyList } = proxy;
  const handleChange = (key, value) => {
    setProxy({ ...proxy, [key]: value });
  };

  const handleTestSpeed = () => {
    const list = proxyList.split(/[\n,]/).filter(v => v !== '').map(v => v.trim());
    setTestProxy(list);
  }

  return (
    <div className="proxy-region">
      <div className="gradient-box">
        <div className="window-title proxy-title">
          <span>PROXY</span>
        </div>
        <div className="group-box region-1">
          <Grid container justify="center">
            <Grid item xs={4}>
              <div className="form-container">
                <FormControl fullWidth>
                  <TextField
                    id="proxy-name-input"
                    label="PROXY NAME"
                    InputLabelProps={{ shrink: name && name !== '' }}
                    value={name}
                    onChange={(event) => { handleChange('name', event.target.value); }}
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-container btn-container">
                <FormControl fullWidth>
                  <GroupActionButton icon="save" text="Save Proxy Group" actionHandler={() => { onSaveProxy(proxy); }} />
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </div>
        <div className="region-content">
          <div id="proxy-textarea-container" className="group-box region-2">
            <div className="window-title proxy-title">
              <span>PROXY LIST</span>
            </div>
            <div className="form-container">
              <FormControl fullWidth>
                <TextField
                  id="proxy-textarea"
                  multiline
                  variant="filled"
                  rows={rows}
                  value={proxyList}
                  onChange={(event) => { handleChange('proxyList', event.target.value); }}
                />
              </FormControl>
            </div>
          </div>
          <div className="group-box region-3">
            <div className="window-title proxy-title">
              <span>PROXY TESTING</span>
            </div>
            <div className="proxy-test-list">
              <VirtualizedList list={testProxy} />
            </div>
          </div>
        </div>
        <div className="buttons">
          <div className="btn-left">
            <div className="btn-1">
              <FormControl fullWidth>
                <GroupActionButton icon="trash" text="Delete All" actionHandler={() => { handleChange('proxyList', ''); }} />
              </FormControl>
            </div>
          </div>
          <div className="btn-right">
            <div className="form-container btn-2">
              <FormControl fullWidth>
                <GroupActionButton icon="flash" text="Test Speed" actionHandler={handleTestSpeed} />
              </FormControl>
            </div>
            <div className="form-container btn-3">
              <FormControl fullWidth>
                <GroupActionButton icon="trash" text="Delete Banned" actionHandler={() => {}} />
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
