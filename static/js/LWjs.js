var sw = {
  // (A) PROPERTIES
  etime: null, // html time display
  erst: null, // html reset button
  ego: null, // html start/stop button
  timer: null, // timer object
  now: 0, // current elapsed time

  // (B) INITIALIZE
  init: () => {
    // (B1) GET HTML ELEMENTS
    sw.etime = document.getElementById("sw-time");
    sw.erst = document.getElementById("sw-rst");
    sw.ego = document.getElementById("sw-go");

    // (B2) ENABLE BUTTON CONTROLS
    sw.erst.onclick = sw.reset;
    sw.ego.onclick = sw.start;
    sw.erst.disabled = false;
    sw.ego.disabled = false;
  },

  // (C) START!
  start: () => {
    sw.timer = setInterval(sw.tick, 1000);
    sw.ego.value = "Stop";
    sw.ego.style.backgroundColor = "#e74c3c";
    sw.ego.onclick = sw.stop;
  },

  // (D) STOP
  stop: () => {
    clearInterval(sw.timer);
    sw.timer = null;
    sw.ego.value = "Start";
    sw.ego.style.backgroundColor = "#2ecc71";
    sw.ego.onclick = sw.start;
  },

  // (E) TIMER ACTION
  tick: () => {
    // (E1) CALCULATE HOURS, MINS, SECONDS
    sw.now++;
    let hours = 0,
      mins = 0,
      secs = 0,
      remain = sw.now;
    hours = Math.floor(remain / 3600);
    remain -= hours * 3600;
    mins = Math.floor(remain / 60);
    remain -= mins * 60;
    secs = remain;

    // (E2) UPDATE THE DISPLAY TIMER
    if (hours < 10) { hours = "0" + hours; }
    if (mins < 10) { mins = "0" + mins; }
    if (secs < 10) { secs = "0" + secs; }
    sw.etime.innerHTML = hours + ":" + mins + ":" + secs;
  },

  // (F) RESET
  reset: () => {
    if (sw.timer != null) { sw.stop(); }
    sw.now = -1;
    sw.tick();
  }
};

// (G) VARIABLES
var totalTimeSpent = 0; // Total time spent in seconds

// (H) INITIALIZE
function init() {
  // Initialize the stopwatch
  sw.init();

  // Retrieve total time spent for today from localStorage
  retrieveTotalTime();

  // Start updating total time every second
  setInterval(updateTotalTime, 1000);
}

// (I) UPDATE TOTAL TIME
function updateTotalTime() {
  // Get the current time from the stopwatch
  var currentTime = sw.now;

  // Update the total time spent only if the stopwatch is running
  if (sw.timer !== null) {
    totalTimeSpent += 1; // Increment total time every second
  }

  // Convert total time to hours, minutes, and seconds
  var hours = Math.floor(totalTimeSpent / 3600);
  var minutes = Math.floor((totalTimeSpent % 3600) / 60);
  var seconds = totalTimeSpent % 60;

  // Format the total time
  var formattedTotalTime = hours.toString().padStart(2, '0') + ':' +
    minutes.toString().padStart(2, '0') + ':' +
    seconds.toString().padStart(2, '0');

  // Get today's date
  var currentDate = new Date().toLocaleDateString();

  // Display the formatted total time and current date
  document.getElementById('totalTime').innerText = "Total Time Spent: " + formattedTotalTime + " |  Date: " + currentDate;

  // Store total time spent for today in localStorage
  storeTotalTime(currentDate, totalTimeSpent);
}

// (J) STORE TOTAL TIME IN LOCAL STORAGE FOR EACH DAY
function storeTotalTime(date, totalTime) {
  // Retrieve stored data from local storage
  var storedData = localStorage.getItem('totalTimeData');

  // If no data exists, initialize an empty object
  var data = storedData ? JSON.parse(storedData) : {};

  // Store or update total time spent for the given date
  data[date] = totalTime;

  // Store updated data back to local storage
  localStorage.setItem('totalTimeData', JSON.stringify(data));
}

// (K) RETRIEVE TOTAL TIME FROM LOCAL STORAGE FOR THE GIVEN DATE
function retrieveTotalTime() {
  // Get today's date
  var currentDate = new Date().toLocaleDateString();

  // Retrieve stored data from local storage
  var storedData = localStorage.getItem('totalTimeData');

  // If total time is stored for the given date, update totalTimeSpent
  if (storedData !== null) {
    var data = JSON.parse(storedData);
    if (data[currentDate] !== undefined) {
      totalTimeSpent = parseInt(data[currentDate]);
    }
  }
}

// (L) RESET TOTAL TIME
function resetTotalTime() {
  // Reset total time spent to zero
  totalTimeSpent = 0;

  // Update displayed total time
  updateTotalTime();
}

// Initialize the functionality once the DOM content is loaded
document.addEventListener('DOMContentLoaded', init);



























// var sw = {
//     etime: null,
//     erst: null,
//     ego: null,
//     timer: null,
//     now: 0,

//     init: function () {
//       sw.etime = document.getElementById("sw-time");
//       sw.erst = document.getElementById("sw-rst");
//       sw.ego = document.getElementById("sw-go");
//       sw.erst.addEventListener("click", sw.reset);
//       sw.ego.addEventListener("click", sw.start);
//       sw.erst.disabled = false;
//       sw.ego.disabled = false;
//     },

//     start: function () {
//       sw.timer = setInterval(sw.tick, 1000);
//       sw.ego.value = "Stop";
//       sw.ego.style.backgroundColor = "#e74c3c";
//       sw.ego.removeEventListener("click", sw.start);
//       sw.ego.addEventListener("click", sw.stop);
//     },

//     stop: function () {
//       clearInterval(sw.timer);
//       sw.timer = null;
//       sw.ego.value = "Start";
//       sw.ego.style.backgroundColor = "#2ecc71";
//       sw.ego.removeEventListener("click", sw.stop);
//       sw.ego.addEventListener("click", sw.start);
//     },

//     tick: function () {
//       sw.now++;
//       let hours = 0, mins = 0, secs = 0,
//         remain = sw.now;
//       hours = Math.floor(remain / 3600);
//       remain -= hours * 3600;
//       mins = Math.floor(remain / 60);
//       remain -= mins * 60;
//       secs = remain;
//       if (hours < 10) {
//         hours = "0" + hours;
//       }
//       if (mins < 10) {
//         mins = "0" + mins;
//       }
//       if (secs < 10) {
//         secs = "0" + secs;
//       }
//       sw.etime.innerHTML = hours + ":" + mins + ":" + secs;
//     },

//     reset: function () {
//       if (sw.timer != null) {
//         sw.stop();
//       }
//       sw.now = -1;
//       sw.tick();
//     }
//   };
//   window.addEventListener("load", sw.init);

//   var totalTimeSpent = 0;
//   var interval;

//   function init() {
//     retrieveTotalTime();
//     updateTotalTime();
//     interval = setInterval(updateTotalTime, 1000);
//   }

//   function updateTotalTime() {
//     var storedData = localStorage.getItem('totalTimeData');
//     var totalTimeData = storedData ? JSON.parse(storedData) : {};

//     var today = new Date().toISOString().split('T')[0];

//     if (totalTimeData.date !== today) {
//       if (totalTimeData.date) {
//         totalTimeData[totalTimeData.date] = totalTimeSpent;
//       }
//       totalTimeSpent = 0;
//       totalTimeData.date = today;
//     }

//     if (sw.timer !== null) {
//       totalTimeSpent++;
//     }

//     var hours = Math.floor(totalTimeSpent / 3600);
//     var minutes = Math.floor((totalTimeSpent % 3600) / 60);
//     var seconds = totalTimeSpent % 60;

//     var formattedTotalTime = hours.toString().padStart(2, '0') + ':' +
//       minutes.toString().padStart(2, '0') + ':' +
//       seconds.toString().padStart(2, '0');

//     document.getElementById('totalTime').innerText = "Date: " + today + ", Time spent: " + formattedTotalTime;

//     localStorage.setItem('totalTimeData', JSON.stringify(totalTimeData));
//   }

//   function retrieveTotalTime() {
//     var storedData = localStorage.getItem('totalTimeData');
//     var totalTimeData = storedData ? JSON.parse(storedData) : {};

//     var today = new Date().toISOString().split('T')[0];

//     if (totalTimeData.date === today) {
//         totalTimeSpent = totalTimeData[today] || 0; // Use today's date as key
//     } else {
//         totalTimeSpent = 0; // If no data found for today, reset totalTimeSpent
//     }
// }


//   function resetTotalTime() {
//     var today = new Date().toISOString().split('T')[0];
//     var storedData = localStorage.getItem('totalTimeData');
//     var totalTimeData = storedData ? JSON.parse(storedData) : {};

//     totalTimeData[today] = totalTimeSpent;

//     localStorage.setItem('totalTimeData', JSON.stringify(totalTimeData));

//     totalTimeSpent = 0;

//     updateTotalTime();
//   }

//   document.addEventListener('DOMContentLoaded', init);

  var slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
  }

//   // (H) VARIABLES
// var totalTimeSpent = 0; // Total time spent in seconds
// var interval; // Interval for updating total time

// // (I) INITIALIZE FUNCTION
// // (I) INITIALIZE FUNCTION
// function init() {
//   retrieveTotalTime(); // Retrieve total time data
//   updateTotalTime(); // Update total time display
//   interval = setInterval(updateTotalTime, 1000); // Start updating total time every second
//   sw.init(); // Initialize the stopwatch
// }

// // (J) UPDATE TOTAL TIME
// // (J) UPDATE TOTAL TIME
// function updateTotalTime() {
//   var storedData = localStorage.getItem('totalTimeData');
//   var totalTimeData = storedData ? JSON.parse(storedData) : {};

//   var today = new Date().toISOString().split('T')[0]; // Get today's date
//   var formattedTotalTime = '';

//   // Sort stored data in descending order by date
//   var sortedData = Object.entries(totalTimeData).sort((a, b) => {
//     return new Date(b[0]) - new Date(a[0]);
//   });

//   // Display all stored data
//   var totalTimeDisplay = document.getElementById('totalTimeDisplay');
//   totalTimeDisplay.innerHTML = '';
//   sortedData.forEach(([date, totalTimeSpent]) => {
//     var dateObj = new Date(date);
//     var hours = Math.floor(totalTimeSpent / 3600);
//     var minutes = Math.floor((totalTimeSpent % 3600) / 60);
//     var seconds = totalTimeSpent % 60;
//     formattedTotalTime = hours.toString().padStart(2, '0') + ':' +
//                           minutes.toString().padStart(2, '0') + ':' +
//                           seconds.toString().padStart(2, '0');
//     totalTimeDisplay.innerHTML += '<p>Date: ' + dateObj.toLocaleDateString() + ', Time spent: ' + formattedTotalTime + '</p>';
//   });

//   // Store the total time spent for today
//   if (sw.timer !== null) {
//     totalTimeSpent++;
//   }
//   totalTimeData[today] = totalTimeSpent;
//   localStorage.setItem('totalTimeData', JSON.stringify(totalTimeData));
// }

// // (K) RETRIEVE TOTAL TIME FROM LOCAL STORAGE
// function retrieveTotalTime() {
//   var storedData = localStorage.getItem('totalTimeData');
//   var totalTimeData = storedData ? JSON.parse(storedData) : {};

//   var today = new Date().toISOString().split('T')[0]; // Get today's date

//   if (totalTimeData.date === today) {
//     // Retrieve total time spent for today
//     totalTimeSpent = totalTimeData[totalTimeData.date] || 0;
//   }
// }



// // (L) RESET TOTAL TIME
// function resetTotalTime() {
//   var today = new Date().toISOString().split('T')[0]; // Get today's date
//   var storedData = localStorage.getItem('totalTimeData');
//   var totalTimeData = storedData ? JSON.parse(storedData) : {};

//   // Update total time spent for today
//   totalTimeData[today] = totalTimeSpent;

//   // Store updated total time data in localStorage
//   localStorage.setItem('totalTimeData', JSON.stringify(totalTimeData));

//   // Reset total time spent to zero
//   totalTimeSpent = 0;

//   // Update displayed total time
//   updateTotalTime();
// }
// // Initialize the functionality once the DOM content is loaded
// document.addEventListener('DOMContentLoaded', init);
