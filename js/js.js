const mainClock = document.querySelector("#mainClock");
const inputHour = document.querySelector("#Hour");
const inputMinutes = document.querySelector("#Minutes");
const inputAMPM = document.querySelector("#AMPM");
const btnAlarm = document.querySelector(".setAlarm");
const btnStop = document.querySelector(".Stop");
const btnSnooze = document.querySelector(".Snooze");
const alarmsContainer = document.querySelector(".alarmsContainer");
let audio = new Audio(
  "https://cdn.pixabay.com/audio/2021/08/09/audio_a4637e27f0.mp3"
);
// استخدمت في البداية صوت موجود ف مجلد الصوت لكن للاسف جتهب كانت مشكلة فيه وما شغل الصوت ف استخدمت رابط خارجي
let arrAlarm = [];
let dateAlarm, AMPM;

setInterval(() => {
  let date = new Date();
  let AMPM = date.toLocaleString("en-US");
  let time = date.toLocaleTimeString().split(":");
  AMPM = AMPM.slice(AMPM.length - 2);
  renderClock(...time, AMPM);
}, 1000);

function renderClock(Hour, Minutes, second, AMPM) {
  Hour = Hour > 12 ? Hour - 12 : Hour;
  Hour = Hour == 0 ? 12 : Hour;
  Hour = Hour.toString().padStart(2, "0");
  mainClock.innerHTML = `${Hour} : ${Minutes} : ${second.slice(0, 2)} ${AMPM} `;
  checkAlarm(Hour, Minutes, AMPM, second);
}

function checkAlarm(Hour, Minutes, AMPM, second) {
  arrAlarm = arrAlarm.filter((alarm) => {
    if (
      Number(alarm.Hour) == Number(Hour) &&
      Number(alarm.Minutes) == Number(Minutes) &&
      alarm.AMPM == AMPM &&
      second.slice(0, 2) == 0
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
  let newalr = new Date();
  Hour = newalr.getHours();
  Hour = Hour == 0 ? 12 : Hour;
  Minutes = newalr.getMinutes();
  let AP = newalr.toLocaleString("en-US");
  AP = AP.slice(AP.length - 2);
  if (Minutes > 55 && Hour < 12) {
    arrAlarm.push({
      Hour: Hour + 1,
      Minutes: 59 - Minutes,
      AMPM: AP,
    });
  } else if (Hour >= 12 && AP == "PM") {
    Hour = Hour - 12 == 0 ? 12 : Hour - 12;
    arrAlarm.push({
      Hour: Hour,
      Minutes: Minutes + 5,
      AMPM: AP,
    });
  } else {
    arrAlarm.push({
      Hour: Hour,
      Minutes: Minutes + 5,
      AMPM: AP,
    });
  }
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

    if (
      !arrAlarm.find(
        (el) =>
          el.Hour == dateAlarm.Hour &&
          el.Minutes == dateAlarm.Minutes &&
          el.AMPM == dateAlarm.AMPM
      )
    ) {
      arrAlarm.push(dateAlarm);
    } else {
      alert("The Alarm is add");
    }

    renderAlarm();
    return arrAlarm;
  }
}
