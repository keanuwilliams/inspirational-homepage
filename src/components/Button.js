import React from 'react';
import '../App.css';

export default function GoalButton({ contents = "Button", onClick, danger, success }) {
  let btnClass = "btn";

  if (success) {
    btnClass += " btn-success";
  } else if (danger) {
    btnClass += " btn-danger";
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