//  Requires xui.js
//x$(document).on('DOMContentLoaded') {
//}

function insertCalendar() {
  var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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
      "</div>"+
    "</div>"+
  "");

  function insertDays(element, index, xui) {
    console.log(days);
    for(day in days) {
      element.innerHTML+="<span class='" + days[day] + " mobileCalendar:dayCell'></span>";
    }
  }
  function insertDayHeaders() {
    for(day in days) {
      x$('#mobileCalendar\\:days-header').bottom("<span class='" + days[day] + "-header mobileCalendar:dayHeaderCell'>" + days[day] + "</span>");
    }
  }
  x$('[id|="mobileCalendar:days-row"]').each(insertDays);
  insertDayHeaders();
}
