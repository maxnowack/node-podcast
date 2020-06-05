function pad(num) {
  const paddedString = ("0" + num);
  return paddedString.substring(paddedString.length-2);
}
function toDurationString(seconds) {
  const hh = Math.floor(seconds/(60*60));
  seconds = seconds % (60*60);
  const mm = Math.floor(seconds/60);
  const ss = Math.floor(seconds % 60);
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
}

export default toDurationString;
