import React from 'react';
// import './Navbar.scss';

export default function Navbar(): JSX.Element {

  return (
    <div className="nav-bar">
      <div className="browser-buttons">
        <div className="close">
          <a className="closebutton" href="#"><span><strong>x</strong></span></a>
        </div>
        <div className="minimize">
          <a className="minimizebutton" href="#"><span><strong>&ndash;</strong></span></a>
        </div>
        <div className="zoom">
          <a className="zoombutton" href="#"><span><strong>&#43;</strong></span></a>
        </div>
      </div>
      <div className="menu">
        nav items go here
      </div>
    </div>
  );
}
