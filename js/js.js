const mainClock = document.querySelector("#mainClock");
const inputHour = document.querySelector("#Hour");
const inputMinutes = document.querySelector("#Minutes");
const inputAMPM = document.querySelector("#AMPM");
const btnAlarm = document.querySelector(".setAlarm");
const btnStop = document.querySelector(".Stop");
const btnSnooze = document.querySelector(".Snooze");
const alarmsContainer = document.querySelector(".alarmsContainer");
let audio = new Audio("../audio/alarm-audio.mp3");
let arrAlarm = [];
let dateAlarm, AMPM;

setInterval(() => {
  let date = new Date().toLocaleTimeString().split(":");
  renderClock(...date);
}, 1000);

function renderClock(Hour, Minutes, second) {
  AMPM = "AM";
  if (Hour >= 12) {
    Hour -= 12;
    AMPM = "PM";
  } else {
    Hour = Hour == 0 ? 12 : Hour;
    Hour;
  }
  mainClock.innerHTML = `${Hour} : ${Minutes} : ${second} ${AMPM} `;
  checkAlarm(Hour, Minutes, AMPM, second);
}

function checkAlarm(Hour, Minutes, AMPM, second) {
  arrAlarm = arrAlarm.filter((alarm) => {
    if (
      alarm.Hour == Hour &&
      alarm.Minutes == Minutes &&
      alarm.AMPM == AMPM &&
      second == 0
    ) {
      audio.play();
      audio.loop = true;
      btnStop.removeAttribute("id");
      btnSnooze.removeAttribute("id");
    } else {
      return alarm;
    }
  });
  renderAlarm();
}

btnSnooze.onclick = () => {
  audio.pause();
  btnStop.setAttribute("id", "hide");
  btnSnooze.setAttribute("id", "hide");
  let newalr = new Date().toLocaleTimeString().split(":");
  arrAlarm.push({
    Hour: Number(newalr[0]) > 12 ? Number(newalr[0]) - 12 : newalr[0],
    Minutes: Number(newalr[1]) + 5,
    AMPM: Number(newalr[0]) > 12 ? "PM" : "AM",
  });
};

btnStop.onclick = () => {
  audio.pause();
  btnStop.setAttribute("id", "hide");
  btnSnooze.setAttribute("id", "hide");
};
btnAlarm.onclick = () => {
  getInput();
};

function renderAlarm() {
  alarmsContainer.innerHTML = "";
  if (arrAlarm.length != 0) {
    arrAlarm.map((Alarm) => {
      const element2 = `<div class="alarm">
        <h3>${Alarm.Hour} : ${Alarm.Minutes} ${Alarm.AMPM}</h3>
      </div>`;
      alarmsContainer.innerHTML += element2;
    });
  } else {
  }
}

function getInput() {
  let Hour, Minutes, AMPM;
  if (
    inputHour.value.length < 3 &&
    inputHour.value.length != 0 &&
    inputHour.value <= 12
  ) {
    Hour = inputHour.value;
  } else {
    alert("Enter valid Hour");
  }
  if (
    inputMinutes.value.length < 3 &&
    inputMinutes.value.length != 0 &&
    inputMinutes.value <= 60
  ) {
    Minutes = inputMinutes.value;
  } else {
    alert("Enter valid Minutes");
  }
  if (inputAMPM.value) {
    AMPM = inputAMPM.value;
  } else {
    alert("Enter Peride");
  }

  if (Hour && Minutes && AMPM != undefined) {
    dateAlarm = { Hour: Hour, Minutes: Minutes, AMPM: AMPM };
    arrAlarm.push(dateAlarm);
    renderAlarm();
    return arrAlarm;
  }
}
