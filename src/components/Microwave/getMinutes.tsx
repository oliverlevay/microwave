const getMinutes = (time: number) => {
  let minutes = Math.floor(time / 60);
  const seconds = Math.round((time - minutes * 60) / 15) * 15;
  if (seconds === 60) minutes += 1;
  return `${minutes}:${seconds}`;
};

export default getMinutes;
