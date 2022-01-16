import React, { useEffect, useState } from 'react';
import "./Greeting.css";

/**
 * Displays a greeting depending on what the current time is.
 */
export default function Greeting() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      if (hours < 12) {
        setGreeting("Good Morning");
      } else if (hours > 11 && hours < 17) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    }, 100);
  }, []);

  return (
    <div id='greeting'>{greeting}</div>
  );

}