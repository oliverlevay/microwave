const degreesToMinutes = (degrees: number, round = true) => {
  let minutes = Math.floor(degrees / 60);
  let seconds;
  if (round) {
    seconds = Math.round((degrees - minutes * 60) / 15) * 15;
  } else {
    seconds = Math.round(degrees - minutes * 60);
  }
  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }
  if (!minutes && !seconds) {
    return { minutes: "", seconds: "" };
  }
  const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();
  const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString();
  return { minutes: minutesString, seconds: secondsString };
};

export default degreesToMinutes;
