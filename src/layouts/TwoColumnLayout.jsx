import React from "react";
import ReactDOM from "react-dom";

export default function TwoColumnLayout({ left, right }) {
  return (
    <div className="grid min-h-screen w-full xl:grid-cols-2">
      {left && <div className="border-r border-(--color-background-2) grow-0 min-h-0 min-w-0">{left}</div>} 

      {right && <div>{right}</div>} 
    </div>
  );
}
