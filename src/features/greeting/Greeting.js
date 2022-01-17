import React, { useEffect, useState } from 'react';
import "./Greeting.css";

/**
 * Displays a greeting depending on what the current time is.
 */
export default function Greeting({ name }) {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      let greeting = "";
      if (hours < 12) {
        greeting = "Good Morning";
      } else if (hours > 11 && hours < 17) {
        greeting = "Good Afternoon"
      } else {
        greeting = "Good Evening"
      }
      greeting += ` ${name}`;
      setGreeting(greeting);
    }, 100);
  }, [name]);

  return (
    <div id='greeting'>{greeting}</div>
  );

}