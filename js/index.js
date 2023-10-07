const submitButton = document.querySelector(".button-submit");
const floorInput = document.querySelector("#floor");
const liftInput = document.querySelector("#lift");

const MOBILE_SCREEN_SIZE = 768;
const IPAD_SCREEN_SIZE = 1024;
const DESKTOP_SCREEN_SIZE = 1440;

const MAX_LIFTS_MOBILE = 3;
const MAX_LIFTS_IPAD = 6;
const MAX_LIFTS_DESKTOP = 11;

function checkScreenWidth() {
  let maxLifts;
  if (window.innerWidth <= MOBILE_SCREEN_SIZE) {
    liftInput.placeholder = `Max ${MAX_LIFTS_MOBILE} on mobile screens`;
    maxLifts = MAX_LIFTS_MOBILE;
  } else if (window.innerWidth <= IPAD_SCREEN_SIZE) {
    liftInput.placeholder = `Max ${MAX_LIFTS_IPAD} on iPad screens`;
    maxLifts = MAX_LIFTS_IPAD;
  } else {
    liftInput.placeholder = `Max ${MAX_LIFTS_DESKTOP} on desktop screens`;
    maxLifts = MAX_LIFTS_DESKTOP;
  }
  liftInput.setAttribute("max", maxLifts);
}

checkScreenWidth();

window.addEventListener("resize", checkScreenWidth);

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  let numberOfFloors = parseInt(floorInput.value);
  let numberOfLifts = parseInt(liftInput.value);
  
  if (numberOfFloors <= 0 || numberOfLifts <= 0) {
    alert("Please enter positive values for both fields.");
  } else if (numberOfLifts > numberOfFloors) {
    alert("The number of lifts should be less than or equal to the number of floors.");
  } else {
    localStorage.setItem("numberOfFloors", numberOfFloors);
    localStorage.setItem("numberOfLifts", numberOfLifts);
    floorInput.value = "";
    liftInput.value = "";
    window.location.replace("lift_simulation.html");
    console.log("Data saved in local storage.");
  }
});