// data Set

const monthDay = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

const monthDayLeap = {
  1: 31,
  2: 29,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

const daysEng = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const monthEng = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

// Current Time

const date = new Date();

let currentYear = Number(date.toLocaleDateString().slice(0, 4));
let currentMonth = Number(date.toLocaleDateString().slice(5, 7));
let currentDay = Number(date.toLocaleDateString().slice(8, 11));

// Declare

let stdDay = 0;
let stdYear = monthDay;
let firstDayOfMonth = getDay(currentMonth);
let today = (currentDay - 1 + getDay(currentMonth)) % 7;
let colorDay = currentDay - 1 + getDay(currentMonth);
let dayArr = [];

// HTML 연결

const dayEngElement = document.querySelector('.dayEng');
const dayNumElement = document.querySelector('.dayNum');
const thElement = document.getElementsByTagName('th');
const leftElement = document.getElementsByClassName('left');
const rightElement = document.getElementsByClassName('right');
const monthElement = document.querySelector('.day-Small-Month');
const yearElement = document.querySelector('.day-Small-Year');
const tableElement = document.querySelector('table');
const thList = Array.from(tableElement.querySelectorAll('th'));

// function

function clear() {
  for (let i = 7; i < 48; i++) {
    thElement[i].textContent = '';
  }
}

function getDay(targetMonth) {
  if (currentYear % 4 === 0) {
    stdYear = monthDayLeap;
  } else {
    stdYear = monthDay;
  }
  let sumOfMonth = 0;
  for (let i = 1; i < targetMonth; i++) {
    sumOfMonth += stdYear[i];
  }
  return (sumOfMonth + stdDay) % 7;
}

function reset() {
  firstDayOfMonth = firstDayOfMonth + 7;
  for (let i = 1; i <= stdYear[currentMonth]; i++) {
    dayArr.push(firstDayOfMonth);
    thElement[firstDayOfMonth].textContent = i;
    firstDayOfMonth++;
  }

  dayEngElement.textContent = daysEng[today];
  dayNumElement.textContent = currentDay;
}

function getMonthYear() {
  monthElement.textContent = monthEng[currentMonth - 1];
  yearElement.textContent = currentYear;
}

function emphasisDay(day) {
  thElement[day + 7].style.color = 'red';
  thElement[day + 7].style.fontWeight = '800';
}

function clearDay() {
  for (let j = 7; j <= 48; j++) {
    thElement[j].style.color = 'black';
  }
}

function changeDay() {
  firstDayOfMonth = getDay(currentMonth) + 7;

  for (let i = 1; i <= stdYear[currentMonth]; i++) {
    thElement[firstDayOfMonth + i - 1].addEventListener(
      'click',
      function showDay(evemt) {
        let index = thList.indexOf(evemt.target);
        if (dayArr.includes(index)) {
          dayEngElement.textContent = daysEng[index % 7];
          dayNumElement.textContent = i;
          for (let j = 7; j <= 48; j++) {
            thElement[j].style.color = 'black';
          }
        }
        sunisGrey();
        thElement[index].style.color = 'red';
      }
    );
  }
}

function sunisGrey() {
  for (let i = 7; i < 49; i++) {
    if (i % 7 === 0) {
      thElement[i].style.color = 'grey';
    }
  }
  thElement[0].style.color = 'grey';
}

function openPage() {
  reset();
  getMonthYear();
  changeDay();
  emphasisDay(colorDay);
  sunisGrey();
}

function clickDayMonth() {
  getMonthYear();
  clear();
  reset();
  changeDay();
  clearDay(colorDay);
  sunisGrey();
}

// Interaction

leftElement[0].addEventListener('click', function prevMonth() {
  dayArr = [];
  if (currentYear % 4 === 1 && currentMonth === 1) {
    currentMonth = 12;
    currentYear--;
    if (stdDay === 0) {
      stdDay = 5;
    } else {
      stdDay = Math.abs(stdDay - 2);
    }
  } else if (currentMonth === 1) {
    currentMonth = 12;
    currentYear--;
    if (stdDay === 0) {
      stdDay = 6;
    } else {
      stdDay--;
    }
  } else {
    currentMonth--;
  }
  firstDayOfMonth = getDay(currentMonth);
  clickDayMonth();
  dayEngElement.textContent = daysEng[getDay(currentMonth)];
  dayNumElement.textContent = 1;
});

rightElement[0].addEventListener('click', function nextMonth() {
  dayArr = [];
  if (stdYear === monthDayLeap && currentMonth === 12) {
    currentMonth = 1;
    currentYear++;
    if (stdDay === 0) {
      stdDay = 2;
    } else {
      stdDay = (stdDay + 2) % 7;
    }
  } else if (currentMonth === 12) {
    currentMonth = 1;
    currentYear++;
    if (stdDay === 6) {
      stdDay = 1;
    } else {
      stdDay++;
    }
  } else {
    currentMonth++;
  }
  firstDayOfMonth = getDay(currentMonth);
  clickDayMonth();
  dayEngElement.textContent = daysEng[getDay(currentMonth)];
  dayNumElement.textContent = 1;
});

openPage();
