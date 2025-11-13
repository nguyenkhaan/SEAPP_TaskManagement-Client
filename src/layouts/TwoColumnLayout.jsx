import React from "react";
import ReactDOM from "react-dom";

export default function TwoColumnLayout({ left, right }) {
  return (
    <div className="grid min-h-screen w-full grid-cols-2">
      <div className="border-r border-gray-200">{left}</div>

      <div>{right}</div>
    </div>
  );
}
