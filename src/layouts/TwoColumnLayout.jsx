import React from "react";
import ReactDOM from "react-dom";

export default function TwoColumnLayout({ left, right }) {
  return (
    <div className="grid min-h-screen w-full xl:grid-cols-2">
      {left && <article className="border-r border-gray-200 grow-0 min-h-0 min-w-0">{left}</article>} 

      {right && <article>{right}</article>} 
    </div>
  );
}
