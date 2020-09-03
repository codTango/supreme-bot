/* eslint-disable react/prop-types */
import React from 'react';

export default function Status(props) {
  const { label, count, color } = props;

  return (
    <div className="status">
      <div className="label">{label}</div>
      <div className="count" style={{ borderColor: color }}>{count}</div>
    </div>
  );
}