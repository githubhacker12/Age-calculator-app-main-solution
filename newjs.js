// let btn = document.querySelector(".arrow");
// let inputs = document.querySelectorAll("input");
// let presDate = new Date();

// let predate = presDate.getDate();
// let premonth = presDate.getMonth();
// let preyear = presDate.getFullYear();

// let date;
// let month;
// let year;

// // slicking the input
// function restrictInputLength(input, maxLength) {
//   input.addEventListener("input", function () {
//     if (this.value.length > maxLength) {
//       this.value = this.value.slice(0, maxLength);
//     }
//   });
// }

// inputs.forEach(function (item) {
//   if (item.name === "year") {
//     restrictInputLength(item, 4);
//   } else {
//     restrictInputLength(item, 2);
//   }
// });

// // checking weather the input is correct;
// function validateField(selector, errorMessage, condition) {
//   const errorElement = document.querySelector(selector);
//   if (condition) {
//     errorElement.classList.add("animate");
//     errorElement.innerHTML = errorMessage;
//   } else {
//     errorElement.classList.remove("animate");
//     errorElement.innerHTML = "";
//     return true;
//   }
// }

// btn.addEventListener("click", () => {
//   date = document.querySelector(".day").value;
//   month = document.querySelector(".month").value;
//   year = document.querySelector(".year").value;

//   // Checking year
//   let checkYear = validateField(
//     `.year-details .error`,
//     year === "" ? "This field is required" : "Must be a valid year",
//     year > presDate.getFullYear() || year === ""
//   );

//   // Checking month
//   let checkMonth = validateField(
//     `.month-details .error`,
//     month === "" ? "This field is required" : "Must be a valid month",
//     month > 12 || month === ""
//   );

//   // Checking day
//   let checkDay = validateField(
//     `.day-details .error`,
//     date === "" ? "This field is required" : "Must be a valid day",
//     date === "" || date > new Date(year, month, 0).getDate()
//   );

//   let checkInputs =
//     checkDay === true && checkMonth === true && checkYear == true;

//   if (checkInputs) {
//     calculateage();
//   } else {
//     document.querySelector(".output-year").innerHTML = "--";
//     document.querySelector(".output-month").innerHTML = "--";
//     document.querySelector(".output-date").innerHTML = "--";
//   }
// });

// function calculateage() {
//   //days in  prev month
//   let prevMonth = new Date();
//   prevMonth.setDate(0);
//   let prevMonthDays = prevMonth.getDate();

//   let output_day = 0;
//   let output_month = 0;
//   let output_year = 0;

//   predate < date
//     ? ((output_day = predate + prevMonthDays - date), (output_month = -1))
//     : (output_day = predate - date);

//   premonth < month
//     ? ((output_month = premonth + 12 - month), (output_year = -1))
//     : (output_month = premonth + 1 - month);

//   output_year = preyear + output_year - year;

//   // dom
//   document.querySelector(".output-year").innerHTML = output_year;
//   document.querySelector(".output-month").innerHTML = output_month;
//   document.querySelector(".output-date").innerHTML = output_day;
// }

let btn = document.querySelector(".arrow");
let inputs = document.querySelectorAll("input");
let presDate = new Date();

let predate = presDate.getDate();
let premonth = presDate.getMonth();
let preyear = presDate.getFullYear();

// slicking
function restrictInputLength(input, maxLength) {
  input.addEventListener("input", function () {
    this.value = this.value.slice(0, maxLength);
  });
}

inputs.forEach(function (item) {
  restrictInputLength(item, item.name === "year" ? 4 : 2);
});

function validateField(selector, errorClass, errorMessage, condition) {
  const errorElement = document
    .querySelector(selector)
    .querySelector(errorClass);
  if (condition) {
    errorElement.classList.add("animate");
    document.querySelector(selector + " " + "label").style.color = "red";
    document.querySelector(selector + " " + "input").style.borderColor = "red";
    errorElement.textContent = errorMessage;
    return false;
  } else {
    errorElement.classList.remove("animate");
    document.querySelector(selector + " " + "label").style.color = "";
    document.querySelector(selector + " " + "input").style.borderColor = "";
    errorElement.textContent = "";
    return true;
  }
}

btn.addEventListener("click", () => {
  let date = document.querySelector(".day").value;
  let month = document.querySelector(".month").value;
  let year = document.querySelector(".year").value;

  let checkYear = validateField(
    ".year-details",
    ".error",
    year === "" ? "This field is required" : "Must be a valid year",
    year > presDate.getFullYear() || year === ""
  );

  let checkMonth = validateField(
    ".month-details",
    ".error",
    month === "" ? "This field is required" : "Must be a valid month",
    month > 12 || month === ""
  );

  let checkDay = validateField(
    ".day-details",
    ".error",
    date === "" ? "This field is required" : "Must be a valid day",
    date === "" || date > new Date(year, month, 0).getDate()
  );

  if (checkDay && checkMonth && checkYear) {
    calculateage(date, month, year);
  } else {
    document
      .querySelectorAll(".output-year, .output-month, .output-date")
      .forEach((elem) => (elem.textContent = "--"));
  }
});

function calculateage(date, month, year) {
  let prevMonth = new Date(preyear, premonth, 0);
  let prevMonthDays = prevMonth.getDate();

  let output_day =
    predate < date ? predate + prevMonthDays - date : predate - date;
  let output_month =
    premonth < month ? premonth + 12 - month : premonth - month;
  let output_year = preyear + (premonth < month ? -1 : 0) - year;

  document.querySelector(".output-year").textContent = output_year;
  document.querySelector(".output-month").textContent = output_month;
  document.querySelector(".output-date").textContent = output_day;
}
