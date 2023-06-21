const submitButton = document.querySelector(".button-submit");
const floorInput = document.querySelector("#floor");
const liftInput = document.querySelector("#lift");

function checkScreenWidth() {
  let maxLifts;
  if (window.innerWidth <= 768) {
    liftInput.placeholder = "Max 1 on mobile screens";
    maxLifts = 1;
  } else if (window.innerWidth <= 1024) {
    liftInput.placeholder = "Max 3 on iPad screens";
    maxLifts = 3;
  } else {
    liftInput.placeholder = "Max 5 on desktop screens";
    maxLifts = 5;
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
