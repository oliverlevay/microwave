import { useEffect, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import "react-rotatable/dist/css/rotatable.min.css";
import "./Microwave.css";
import degreesToMinutes from "./degreesToMinutes";

gsap.registerPlugin(Draggable);

enum Effect {
  stop = "-120deg",
  "keep-warm" = "-95deg",
  defrost = "-60deg",
  "350w" = "-25deg",
  "500w" = "25deg",
  "650w" = "60deg",
  "750w" = "87deg",
  jet = "120deg",
}

const Microwave = () => {
  const [microwaveFinished] = useState(
    new Audio("/soundEffects/microwave-finished.wav")
  );
  const [microwaveRunning] = useState(
    new Audio("/soundEffects/microwave-running.wav")
  );
  const [effect, setEffect] = useState(Effect["750w"]);
  const [time, setTime] = useState(degreesToMinutes(0));
  const [finishedRotating, setFinishedRotating] = useState(false);
  const [screenIsLit, setScreenIsLit] = useState(false);
  const [end, setEnd] = useState(false);
  useEffect(() => {
    microwaveFinished.load();
    microwaveRunning.load();
    setEffect(localStorage.getItem("effect") as Effect);
    Draggable.create("#knob", {
      type: "rotation",
      inertia: true,
      onDragEnd: () => {
        setFinishedRotating(true);
      },
      onDrag: () => {
        const knob = document.getElementById("knob");
        setFinishedRotating(false);
        setEnd(false);
        if (knob) {
          const transform = knob.style.transform;
          const degrees = Number(
            transform?.split("rotate(")[1]?.replace("deg)", "")
          );
          if (degrees > 0) {
            const _time = degreesToMinutes(degrees);
            setTime(_time);
            knob.setAttribute(
              "rotation",
              (Math.round(degrees / 15) * 15).toString()
            );
          } else {
            setScreenIsLit(false);
            knob.style.transform = "rotate(0)";
          }
        }
      },
    });
  }, [microwaveFinished, microwaveRunning]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (finishedRotating) {
        const knob = document.getElementById("knob");
        if (knob) {
          const rotation = Number(knob.getAttribute("rotation"));
          if (!isNaN(rotation) && rotation - 1 > 0) {
            knob.setAttribute("rotation", (rotation - 1).toString());
            knob.style.transform = `rotate(${rotation - 1}deg)`;
            setTime(degreesToMinutes(rotation - 1, false));
          } else {
            knob.style.transform = `rotate(0)`;
            setTime({ minutes: "", seconds: "" });
            setEnd(true);
            setScreenIsLit(false);
            setFinishedRotating(false);
            microwaveFinished.play();
          }
        }
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [time, finishedRotating, setTime, microwaveFinished]);

  useEffect(() => {
    if (finishedRotating && time.minutes) {
      microwaveRunning.play();
      setScreenIsLit(true);
    } else {
      microwaveRunning.pause();
      microwaveRunning.currentTime = 0;
    }
  }, [finishedRotating, microwaveRunning, time.minutes]);

  useEffect(() => {
    localStorage.setItem("effect", effect);
  }, [effect]);

  return (
    <div className="m-container">
      <div className="m-control-panel">
        <div className="m-time-panel">
          {end ? "E n d" : `${time.minutes}:${time.seconds}`}
        </div>
        <div className="m-time-knob" id="knob">
          <div className="m-top-indicator" />
        </div>
        <div className="m-effect-knob">
          <div
            className="m-effect-dial"
            style={{ transform: `rotate(${effect})` }}
          />
          <button
            className="m-effect-text m-keep-warm"
            style={{ color: effect === Effect["keep-warm"] ? "darkred" : "" }}
            onClick={() => setEffect(Effect["keep-warm"])}
          >
            KEEP WARM
          </button>
          <button
            className="m-effect-text m-defrost"
            style={{ color: effect === Effect.defrost ? "darkred" : "" }}
            onClick={() => setEffect(Effect.defrost)}
          >
            DEFROST
          </button>
          <button
            className="m-effect-text m-350w"
            style={{ color: effect === Effect["350w"] ? "darkred" : "" }}
            onClick={() => setEffect(Effect["350w"])}
          >
            350w
          </button>
          <button
            className="m-effect-text m-500w"
            style={{ color: effect === Effect["500w"] ? "darkred" : "" }}
            onClick={() => setEffect(Effect["500w"])}
          >
            500w
          </button>
          <button
            className="m-effect-text m-650w"
            style={{ color: effect === Effect["650w"] ? "darkred" : "" }}
            onClick={() => setEffect(Effect["650w"])}
          >
            650w
          </button>
          <button
            className="m-effect-text m-750w"
            style={{ color: effect === Effect["750w"] ? "darkred" : "" }}
            onClick={() => setEffect(Effect["750w"])}
          >
            750w
          </button>
          <button
            className="m-effect-text m-jet"
            style={{ color: effect === Effect.jet ? "darkred" : "" }}
            onClick={() => setEffect(Effect.jet)}
          >
            JET
          </button>
        </div>
      </div>
      <div className="m-window">
        <img className="m-popcorn" src="/images/popcorn.jpg" alt="Popcorn" />
        <div className={`m-screen ${screenIsLit && "m-screen-lit"}`} />
      </div>
    </div>
  );
};

export default Microwave;
