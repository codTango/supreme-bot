import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Icon from '@material-ui/core/Icon';
import { remote } from 'electron';

export default function Navbar(): JSX.Element {
  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="mek-tasks-collapsed" transform="translate(-41.000000, -144.000000)" fill="#444A58">
            <g id="home-copy" transform="translate(41.000000, 144.000000)">
              <path d="M10.5,12.85125 L10.5,15.9325 C10.5,16.4157492 10.8917508,16.8075 11.375,16.8075 L16.625,16.8075 C17.1082492,16.8075 17.5,16.4157492 17.5,15.9325 L17.5,8.1975 C17.5,7.82618666 17.3525448,7.47007157 17.09,7.2075 L9.73875,1.1075 C9.47662185,0.845070101 9.12091862,0.697613126 8.75,0.697613126 C8.37908138,0.697613126 8.02337815,0.845070101 7.76125,1.1075 L0.41,7.2075 C0.147455215,7.47007157 0,7.82618666 0,8.1975 L0,15.9325 C0,16.4157492 0.391750844,16.8075 0.875,16.8075 L6.125,16.8075 C6.35706443,16.8075 6.5796241,16.7153128 6.74371843,16.5512184 C6.90781276,16.3871241 7,16.1645644 7,15.9325 L7,12.85125 C7,11.8847517 7.78350169,11.10125 8.75,11.10125 C9.71649831,11.10125 10.5,11.8847517 10.5,12.85125 Z" id="Home" />
            </g>
          </g>
        </g>
      </SvgIcon>
    );
  }

  function PlusIcon(props) {
    return (
      <SvgIcon {...props}>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="mek-tasks-collapsed" transform="translate(-621.000000, -219.000000)" fill="#D8D8D8" stroke="#787878">
            <path d="M626.5,219.5 C626.223858,219.5 626,219.723858 626,220 L626,223.998857 L625.500143,223.999 L622,224 C621.723858,224 621.5,224.223858 621.5,224.5 C621.5,224.776142 621.723858,225 621.999857,225 L626,224.998857 L626,229 C626,229.276142 626.223858,229.5 626.5,229.5 C626.776142,229.5 627,229.276142 627,229 L627,225 L631,225 C631.276142,225 631.5,224.776142 631.5,224.5 C631.5,224.223858 631.276142,224 631,224 L627,224 L627,220 C627,219.723858 626.776142,219.5 626.5,219.5 Z" id="Path-Copy" />
          </g>
        </g>
      </SvgIcon>
    );
  }

  const handleClose = () => {
    const win = remote.getCurrentWindow();
    win.close();
  }

  const handleMinimize = () => {
    const win = remote.getCurrentWindow();
    win.minimize();
  }

  const handleMaximize= () => {
    const win = remote.getCurrentWindow();

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
  
  return (
    <div className="nav-bar">
      <div className="browser-buttons">
        <div style={{ display: 'inline-block' }}>
          <div id="close-btn" className="close" onClick={handleClose}>
            <div className="closeButton"><span><strong>x</strong></span></div>
            {/* <a className="closebutton" href="#"><span><strong>x</strong></span></a> */}
          </div>
        </div>
        <div style={{ display: 'inline-block' }}>
          <div id="min-btn" className="minimize" onClick={handleMinimize}>
            <div className="minimizeButton"><span><strong>&ndash;</strong></span></div>
          </div>
        </div>
        <div style={{ display: 'inline-block' }}>
          <div id="max-btn" className="zoom" onClick={handleMaximize}>
            <div className="zoomButton"><span><strong>&#43;</strong></span></div>
          </div>
        </div>
      </div>
      <div className="menu">
        <IconButton aria-label="delete">
          <HomeIcon />
          {/* <Icon>
            <img src="app/assets/home.svg"/>
          </Icon> */}
        </IconButton>
      </div>
    </div>
  );
}
