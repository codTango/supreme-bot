import React from 'react';

export default function Status(props) {
  const { label, count, color } = props;

  return (
    <div className="status">
      <span className="label">{label}</span>
      <div className="count" style={{ borderColor: color }}>{count}</div>
    </div>
  );
}