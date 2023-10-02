const submitButton = document.querySelector(".button-submit");
const floorInput = document.querySelector("#floor");
const liftInput = document.querySelector("#lift");

const MOBILE_SCREEN_SIZE = 768;
const IPAD_SCREEN_SIZE = 1024;
const DESKTOP_SCREEN_SIZE = 1440;

const MAX_LIFTS_MOBILE = 1;
const MAX_LIFTS_IPAD = 3;
const MAX_LIFTS_DESKTOP = 6;

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

  let numberOfFloors = floorInput.value;
  let numberOfLifts = liftInput.value;

  if (parseInt(liftInput.value) > parseInt(liftInput.max)) {
    alert(`Exceeds maximum lift count. The maximum number of lifts for your screen size is ${liftInput.max}.`);
  } else {
    if (numberOfFloors && numberOfLifts) {
      localStorage.setItem("numberOfFloors", numberOfFloors);
      localStorage.setItem("numberOfLifts", numberOfLifts);
      floorInput.value = "";
      liftInput.value = "";
      window.location.href = "lift_simulation.html";
      console.log("Data saved in local storage.");
    } else {
      console.log("Please fill in both fields before submitting.");
    }
  }
});
