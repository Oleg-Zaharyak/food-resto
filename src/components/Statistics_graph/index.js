import React from "react";
import style from "./styles.module.scss";

const Circle = ({ radius, colour, pct }) => {
  const circ = 2 * Math.PI * radius;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={radius}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"12px"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

export const CircleGraph = ({ radius, pct, colour, secondColor }) => {
  return (
    <svg className={style.circle} style={{ width: "100%", height: "100%" }}>
      <g transform={`rotate(-90 ${"100 100"})`}>
        <Circle radius={radius} colour={secondColor} />
        <Circle radius={radius} colour={colour} pct={pct} />
      </g>
    </svg>
  );
};
