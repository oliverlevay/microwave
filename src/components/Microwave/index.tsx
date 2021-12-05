import { useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import "react-rotatable/dist/css/rotatable.min.css";
import "./Microwave.css";
import getMinutes from "./getMinutes";

gsap.registerPlugin(Draggable);

const rotationSnap = 15;

const Microwave = () => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    Draggable.create("#knob", {
      type: "rotation",
      inertia: true,
      snap: function (endValue) {
        //this function gets called when the mouse/finger is released and it plots where rotation should normally end and we can alter that value and return a new one instead. This gives us an easy way to apply custom snapping behavior with any logic we want. In this case, just make sure the end value snaps to 90-degree increments but only when the "snap" checkbox is selected.
        return Math.round(endValue / rotationSnap) * rotationSnap;
      },
      onDrag: () => {
        const knob = document.getElementById("knob");
        let transform = knob?.style.transform;
        const degrees = Number(
          transform?.split("rotate(")[1]?.replace("deg)", "")
        );
        setTime(degrees);
      },
    });
  }, []);
  console.log(getMinutes(time));

  return (
    <div className="m-container">
      <div className="m-control-panel">
        <div className="m-time-knob" id="knob">
          <div className="m-top-indicator" />
        </div>
        <div className="m-effect-knob" />
      </div>
      <div className="m-window" />
    </div>
  );
};

export default Microwave;
