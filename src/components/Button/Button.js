import React from 'react';
import './Button.css';

/**
 * Button that is used throughout the application. If success, danger, or secondary are not included, the button
 * will default to primary (blue) color.
 * @author [Keanu Williams](https://github.com/keanuwilliams)
 * @param {string} contents - the string to be displayed within button; defaults to "Button" if nothing is entered
 * @param {function} onClick - the event that occurs when the button is clicked
 * @param {boolean} success - will make the button green
 * @param {boolean} danger - will make the button red
 * @param {boolean} primary - will make the bytton blue
 * @param {boolean} secondary - will make the button gray
 * @param {boolean} disabled - will make the button disabled
 */
export default function Button({ contents = "Button", onClick, success, danger, primary, secondary, disabled }) {
  // Build out CSS class name
  let btnClass = "btn"; 

  if (!disabled) {
    if (success) { // Logic for button color
      btnClass += " btn-success";
    } else if (danger) {
      btnClass += " btn-danger";
    } else if (secondary) {
      btnClass += " btn-secondary";
    } else { // default is primary
      btnClass += " btn-primary";
    }
  }

  return (
    <button 
      className={btnClass} 
      onClick={onClick}
      disabled={disabled}
    >
      {contents}
    </button>
  );
}