/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-chartkick'
import 'chart.js'
import NumberFormat from 'react-number-format';
import WarningIcon from '@material-ui/icons/Warning';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import BlockIcon from '@material-ui/icons/Block';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { FormControl, Select, MenuItem } from '@material-ui/core';

export default function CheckoutContent(props): JSX.Element {
  const { seasonList, upToDate = true } = props;
  const [ seasonData, setSeasonData ] = useState(seasonList[0]);
  const [ filterList, setFilterList ] = useState([]);
  const [ filterValue, setFilterValue ] = useState('ALL');

  useEffect(() => {
    const list = [];
    seasonList.forEach(data => {
      list.push(data.season);
    });
    setSeasonData(seasonList[0]);
    setFilterList(list);
  }, [seasonList]);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    const selectedSeason = seasonList.find(d => d.season === event.target.value);
    setSeasonData(selectedSeason);
  }

  const { totalSpent, totalCheckouts, totalDeclines, checkoutList } = seasonData;

  return (
    <div className="analytics-region">
      <div className="gradient-box">
        <div className="window-title">
          <span>ANALYTICS</span>
        </div>

        <div className="group-box update-info" style={{ background: upToDate ? '' : 'linear-gradient(to right, #7d211f, #de3e3e, #772020)' }}>
          {upToDate ?
            (
              <>
                <CheckCircleIcon style={{ fontSize: 18, color: '#00A4FF' }} />
                <div className="content-area">
                  <div className="title">MEKPreme is up-to-date</div>
                  <div className="content">YOU ARE RUNNING THE LATEST VERSION OF MEKPREME (V1.0.0)</div>
                </div>
              </>
            ) : (
              <>
                <WarningIcon style={{ fontSize: 18, color: '#FFFFFF' }} />
                <div className="content-area">
                  <div className="title">MEKPreme update is available now</div>
                  <div className="content">CLICK HERE TO UPDATE TO V 1.1</div>
                </div>
              </>
          )}
        </div>
        <div className="group-box region-1">
          <div className="window-title">
            <div className="title-label">PERFORMANCE OVERVIEW</div>
            <div className="filter">
              <FormControl fullWidth>
                <Select
                  disableUnderline
                  id="store-select"
                  displayEmpty
                  value={filterValue}
                  onChange={handleFilterChange}
                  IconComponent={(prop) => (prop.className.includes('MuiSelect-iconOpen') ? <KeyboardArrowUp style={{color: '#DE3E3E'}} /> : <KeyboardArrowDown style={{color: '#DE3E3E'}} />)}
                >
                  {filterList.map(filter => (
                    <MenuItem key={filter} value={filter}>{filter}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="overview-content">
            <div className="content-box">
              <div className="title">TOTAL SPENT</div>
              <div className="status-box">
                <AttachMoneyIcon style={{ fontSize: 16, color: '#8A8A8A' }} />
                <div className="number"><NumberFormat thousandSeparator displayType={'text'} prefix={'$'} value={totalSpent} /></div>
              </div>
            </div>
            <div className="content-box">
              <div className="title">TOTAL CHECKOUTS</div>
              <div className="status-box" style={{ borderColor: '#00FFCF' }}>
                <EmojiEmotionsIcon style={{ fontSize: 16, color: '#00FFCF' }} />
                <div className="number">{totalCheckouts}</div>
              </div>
            </div>
            <div className="content-box">
              <div className="title">TOTAL DECLINES</div>
              <div className="status-box" style={{ borderColor: '#DE3E3E' }}>
                <BlockIcon style={{ fontSize: 16, color: '#DE3E3E' }} />
                <div className="number">{totalDeclines}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="group-box region-2">
          <div className="window-title">
            <span>WEEKLY CHECKOUTS</span>
          </div>
          <div className="chart-area">
            <LineChart
              height="100%"
              colors={["#DE3E3E"]}
              curve
              data={checkoutList}
              library={{tooltips: { backgroundColor: '#D8D8D8', titleFontColor: '#17171B', bodyFontColor: '#17171B' }}}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
