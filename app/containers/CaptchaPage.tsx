/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { IconButton, Grid } from '@material-ui/core';
import CaptchaContent from '../components/captchaContent/CaptchaContent';
import Tooltip from '../components/Tooltip/Tooltip';
import db from '../database/database';

export default function CaptchaPage() {
  const [ harvesters, setHarvester ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const harvestersData = await db.find('harvester', {});
      setHarvester(harvestersData);
    }
    
    fetchData();
  }, []);

  const handleAdd = async () => {
    const data = { type: '', proxy: '' };
    const res = await db.insert('harvester', data);
    setHarvester([ ...harvesters, res ]);
  }

  const handleRemove = (id) => {
    const index = harvesters.findIndex(h => h._id === id);
    db.remove('harvester', { _id: id });
    setHarvester([
      ...harvesters.slice(0, index),
      ...harvesters.slice(index + 1)
    ]);
  }

  const handleSave = async (harvesterInfo) => {
    const { _id } = harvesterInfo;
    const res = await db.update('harvester', { _id }, harvesterInfo, { returnUpdatedDocs: true });

    const newHarvester = harvesters.map(item => {
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

    setHarvester(newHarvester);
  }

  return (
    <div className="captcha-region">
      <div className="gradient-box">
        <div className="window-title icon-title">
          <span>HARVESTER</span>
          <Tooltip title="add">
            <IconButton size="small" onClick={handleAdd}>
              <AddIcon style={{color: '#de2e31'}} />
            </IconButton>
          </Tooltip>
        </div>

        <div className="captcha-container">
          <Grid container spacing={2}>
            {harvesters.map(h => (
              <Grid item xs={3} key={h._id}>
                <CaptchaContent content={h} onRemove={handleRemove} onSave={handleSave} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}
