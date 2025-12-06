import React from "react";
import ReactDOM from "react-dom";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import getStatusColor from "../services/getStatusColor";
function CircleStatus({ statusValue = 60, caption = "default" }) {
  const color = getStatusColor(caption);
  return (
    <div className="flex items-center flex-col justify-evenly gap-1">
      <Gauge
        width={138}
        height={160}
        startAngle={360}
        endAngle={0}
        sx={(theme) => ({
          [`& .${gaugeClasses.valueArc}`]: {
            fill: `var(${color})`,
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
        text={`${statusValue}%`}
        floodColor={"black"}
        color="black"
        fontSize={24}
        value={statusValue}
      />
      <span
        className={`text-[15px] flex items-center`}
        style={{
          color: `var(${color})`,
        }}
      >
        <i className="fa-solid fa-circle mr-1 text-[10px]"></i>
        {caption}
      </span>
    </div>
  );
}
export default CircleStatus;
