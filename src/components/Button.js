import React from 'react';
import './Button.css';

export default function GoalButton({ contents = "Button", onClick, danger, success, secondary }) {
  let btnClass = "btn";

  /** Logic for CSS coloring */
  if (success) {
    btnClass += " btn-success";
  } else if (danger) {
    btnClass += " btn-danger";
  } else if (secondary) {
    btnClass += " btn-secondary";
  }

  return (
    <button 
      className={btnClass} 
      onClick={onClick}
    >
      {contents}
    </button>
  );
}