const btn = document.querySelector(".arrow");
const inputs = document.querySelectorAll("input");
const presDate = new Date();
const predate = presDate.getDate();
const premonth = presDate.getMonth();
const preyear = presDate.getFullYear();

function restrictInputLength(input, maxLength) {
  input.addEventListener("input", () => {
    input.value = input.value.slice(0, maxLength);
  });
}

inputs.forEach((item) =>
  restrictInputLength(item, item.name === "year" ? 4 : 2)
);

function validateField(selector, errorClass, errorMessage, condition) {
  const errorElement = document.querySelector(`${selector} ${errorClass}`);
  const fieldLabel = document.querySelector(`${selector} label`);
  const fieldInput = document.querySelector(`${selector} input`);

  if (condition) {
    errorElement.classList.add("animate");
    fieldLabel.style.color = fieldInput.style.borderColor = "red";
    errorElement.textContent = errorMessage;
    return false;
  } else {
    errorElement.classList.remove("animate");
    fieldLabel.style.color = "";
    fieldInput.style.borderColor = "";
    errorElement.textContent = "";
    return true;
  }
}

btn.addEventListener("click", () => {
  // getting input values
  const date = document.querySelector(".day").value;
  const month = document.querySelector(".month").value;
  const year = document.querySelector(".year").value;

  // calling function to display error message if there is a error

  // Years error function call
  const checkYear = validateField(
    ".year-details",
    ".error",
    year === "" ? "This field is required" : "Must be a valid year",
    year > presDate.getFullYear() || year === ""
  );

  // Months error function call
  const checkMonth = validateField(
    ".month-details",
    ".error",
    month === "" ? "This field is required" : "Must be a valid month",
    month > 12 || month === ""
  );

  // Days error function call
  const checkDay = validateField(
    ".day-details",
    ".error",
    date === "" ? "This field is required" : "Must be a valid day",
    date === "" || date > new Date(year, month, 0).getDate()
  );

  // if all the inputs are true calling function to display answer
  if (checkDay && checkMonth && checkYear) {
    calculateAge(date, month, year);
  } else {
    document
      .querySelectorAll(".output-year, .output-month, .output-date")
      .forEach((elem) => (elem.textContent = "--"));
  }
});

function calculateAge(date, month, year) {
  // getting no of days in prev month
  const prevMonth = new Date(preyear, premonth, 0);
  const prevMonthDays = prevMonth.getDate();

  const outputDay =
    predate < date ? predate + prevMonthDays - date : predate - date;
  const outputMonth =
    premonth < month ? premonth + 12 - month : premonth - month;
  const outputYear = preyear + (premonth < month ? -1 : 0) - year;

  // displaying output
  document.querySelector(".output-year").textContent = outputYear;
  document.querySelector(".output-month").textContent = outputMonth;
  document.querySelector(".output-date").textContent = outputDay;
}
