const INTERVAL = 25;
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");
const timer = document.querySelector(".timer");
const column = document.querySelector(".column");
const units = ["d", "h", "m", "s", "ms"];
const padding = ["00", "00", "00", "00", "000"];
let running = false;
let current = 0;

start.textContent = "Start";
reset.textContent = "Reset";

start.addEventListener("click", evt => {
  const baseTime = Date.now();
  switch (evt.target.textContent) {
    case "Start":
      running = true;
      updateTimer(baseTime, baseTime, 0);
      evt.target.textContent = "Pause";
      evt.target.classList.add("orange");
      evt.target.classList.remove("green");
      break;
    case "Pause":
      running = false;
      evt.target.textContent = "Unpause";
      evt.target.classList.add("green");
      evt.target.classList.remove("orange");
      break;
    case "Unpause":
      running = true;
      updateTimer(baseTime, baseTime, current);
      evt.target.textContent = "Pause";
      evt.target.classList.add("orange");
      evt.target.classList.remove("green");
      break;
  };
});

reset.addEventListener("click", evt => {
  running = false;
  setTimeout(() => {
    const values = [...timer.children];
    for (let i = 0; i < units.length; ++i) {
      values[i].children[0].textContent = padding[i];
      values[i].children[1].textContent = units[i];
    };
  }, INTERVAL);
  current = 0;
  start.textContent = "Start";
  start.classList.add("green");
  start.classList.remove("orange");
  if (!evt.isTrusted) {
    console.log("not trusted");
  };
});

function updateTimer(baseTime, currentTime, savedTime) {
  current = currentTime - baseTime + savedTime;
  const values = makeReadable(current);
  if (+values[0] >= 24) reset.dispatchEvent(new Event("click"));
  for (let i = 0; i < 5; ++i) {
    timer.children[i].children[0].textContent = values[i];
    timer.children[i].children[1].textContent = ["d", "h", "m", "s", "ms"][i];
  };
  if (running) setTimeout(() => updateTimer(baseTime, Date.now(), savedTime), INTERVAL);
};

function makeReadable(time) {
  let days = String(Math.floor((time / 1000 / 60 / 60 / 24)));
  let hours = String(Math.floor((time / 1000 / 60 / 60) % 24));
  let minutes = String(Math.floor((time / 1000 / 60) % 60));
  let seconds = String(Math.floor((time / 1000) % 60));
  let miliseconds = String(time % 1000);
  let values = [days, hours, minutes, seconds, miliseconds];
  for (let i = 0; i < values.length; ++i) values[i] = values[i].padStart(padding[i].length, "0");
  return values;
};
