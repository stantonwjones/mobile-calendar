//  Requires xui.js
x$(document).on('DOMContentLoaded', function() {
  initMobCal();
});
var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function insertCalendar() {
  var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  x$('body').bottom(''+
    "<div id='mobileCalendarWrapper'>"+
      "<div id='mobileCalendar:headerWrapper'>"+
        "<div id='mobileCalendar:buttonsWrapper-earlier'>"+
          "<span id='mobileCalendar:button-yearEarlier'>"+
            "&laquo"+
          "</span>"+
          "<span id='mobileCalendar:button-monthEarlier'>"+
            "<"+
          "</span>"+
        "</div>"+
        "<div id='mobileCalendar:monthYearWrapper'>"+
          "<span id='mobileCalendar:monthWrapper'>"+
          "</span>"+
          "<span id='mobileCalendar:yearWrapper'>"+
          "</span>"+
        "</div>"+
        "<div id='mobileCalendar:buttonsWrapper-later'>"+
          "<span id='mobileCalendar:button-monthLater'>"+
            ">"+
          "</span>"+
          "<span id='mobileCalendar:button-yearLater'>"+
            "&raquo"+
          "</span>"+
        "</div>"+
        "<div id='moileCalendar:closeButtonWrapper'>"+
          "<span id='mobileCalendar:button-close'>"+
          "X"+
          "</span>"+
        "</div>"+
      "</div>"+
      "<div id='mobileCalendar:bodyWrapper'>"+
        "<div id='mobileCalendar:days-header'>"+
        "</div>"+
        "<div id='mobileCalendar:days-row-1'>"+
        "</div>"+
        "<div id='mobileCalendar:days-row-2'>"+
        "</div>"+
        "<div id='mobileCalendar:days-row-3'>"+
        "</div>"+
        "<div id='mobileCalendar:days-row-4'>"+
        "</div>"+
        "<div id='mobileCalendar:days-row-5'>"+
        "</div>"+
        "<div id='mobileCalendar:days-row-6'>"+
        "</div>"+
      "</div>"+
    "</div>"+
  "");

  function insertDayHeaders() {
    for(day in days) {
      x$('#mobileCalendar\\:days-header').bottom("<span class='" + days[day] + "-header mobileCalendar:dayHeaderCell'>" + days[day][0] + "</span>");
    }
  }
  insertDayHeaders();
}

function initMobCal(reset) {
  var now = new Date();
  var calDate = new Date();
  calDate.setDate(1);
  var maxDays = [31, 28, 31, 30, 31, 30, 31, 30, 31, 31, 30, 31];
  window.mobCal = {'now':now, 'calDate':calDate, 'maxDays':maxDays};
  populateCalendar();
  setButtons();
  console.log(reset);
  if (!Boolean(reset)) {
    insertCalendar();
  }
}

function formatNumberLength(num) {
  var length=2;
  var r = "" + num;
  while (r.length < length) {
    r = "0" + r;
  }
  return r;
}

function incrementYear() {
  window.mobCal.calDate.setFullYear(parseInt(window.mobCal.calDate.getFullYear()) + 1);
  populateCalendar();
}
function decrementYear() {
  window.mobCal.calDate.setFullYear(parseInt(window.mobCal.calDate.getFullYear()) - 1);
  populateCalendar();
}
function incrementMonth() {
  if (window.mobCal.calDate.getMonth() < 11) {
    window.mobCal.calDate.setMonth(window.mobCal.calDate.getMonth() + 1);
    populateCalendar();
  } else {
    window.mobCal.calDate.setMonth(0);
    incrementYear();
  }
}
function decrementMonth() {
  if (window.mobCal.calDate.getMonth() > 0) {
    window.mobCal.calDate.setMonth(window.mobCal.calDate.getMonth() - 1);
    populateCalendar();
  } else {
    window.mobCal.calDate.setMonth(11);
    decrementYear();
  }
}

function populateCalendar() {
  var offset = window.mobCal.calDate.getDay();
  function insertDays(element, index, xui) {
    for(day in days) {
      element.innerHTML+=("<span class='" + days[day] + " mobileCalendar:dayCell'>" + (1 + parseInt(index)*7 + parseInt(day)) + "</span>");
    }
  }
  x$('[id|="mobileCalendar:days-row"]').inner('');
  x$('[id|="mobileCalendar:days-row"]').each(insertDays);
  function setDay(element, index, xui) {
    var dayOfMonth = parseInt(element.innerHTML);
    console.log(dayOfMonth);
    dayOfMonth-=offset;
    console.log(dayOfMonth);
    if (dayOfMonth < 1 || dayOfMonth > window.mobCal.maxDays[window.mobCal.calDate.getMonth()]) {
      element.innerHTML='';
    } else {
      element.innerHTML=dayOfMonth;
    }
  }
  x$('[class*="mobileCalendar:dayCell"]').each(setDay);
  x$('[id="mobileCalendar:monthWrapper"]').each(function(element, index, xui){element.innerHTML=months[window.mobCal.calDate.getMonth()];});
  x$('[id="mobileCalendar:yearWrapper"]').each(function(element, index, xui){element.innerHTML=window.mobCal.calDate.getFullYear();});
}

function setButtons() {
  x$('#mobileCalendar\\:button-yearEarlier').click(decrementYear);
  x$('#mobileCalendar\\:button-yearLater').click(incrementYear);
  x$('#mobileCalendar\\:button-monthEarlier').click(decrementMonth);
  x$('#mobileCalendar\\:button-monthLater').click(incrementMonth);
  x$('#mobileCalendar\\:button-close').click(closeCalendar);
  x$('.mobileCalendar\\:dayCell').click(setInputValue);
  x$('[data-ur-mobileCalendarInput="true"]').each(openCalendar);
}

function closeCalendar() {
  //reset values and set display to none
}

function setInputValue() {
  var inp = window.mobCal.selectedInput;
  inp.setAttribute('value', getDateString(this));
  closeCalendar();
}

function openCalendar(element, index, xui) {
  window.mobCal.selectedInput = element;
  resetCalendar();
  //show Calendar, enable input field if it is disabled
}

function resetCalendar() {
  initMobCal(true);
}

function getDateString(dayCell) {
  var dayNum = parseInt(dayCell.innerHTML);
  return (formatNumberLength(dayNum) + '/' + formatNumberLength(window.mobCal.calDate.getMonth() + 1) + '/' + window.mobCal.calDate.getFullYear());
}
