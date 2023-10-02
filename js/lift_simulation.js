const floorsContainer = document.querySelector(".floors-container");

const DOOR_OPEN_TIME = 2500;
const DOOR_CLOSE_TIME = 2500;
const CURRENT_FLOOR = 1;

class Lift {
  constructor(id) {
    this.id = id;
    this.currentFloor = CURRENT_FLOOR;
    this.busy = false;
  }
}

let lifts = [];

function createFloorsAndLifts() {
  let floorCounts = localStorage.getItem("numberOfFloors");
  let liftCounts = localStorage.getItem("numberOfLifts");

  for (let floor = floorCounts; floor > 0; floor--) {
    let floorContainer = document.createElement("div");
    floorContainer.classList.add("floor-container");
    floorContainer.setAttribute("id", `floor-${floor}`);

    let floorController = document.createElement("div");
    floorController.classList.add("floor-controller");
    floorContainer.appendChild(floorController);

    let floorNumber = document.createElement("div");
    floorNumber.classList.add("floor-number");
    floorNumber.innerText = `Floor ${floor}`;

    let floorButton = document.createElement("div");
    floorButton.classList.add("floor-button");
    floorButton.setAttribute("id", `floor-button-${floor}`);

    let floorButtonUp = document.createElement("button");
    floorButtonUp.classList.add("button-up");
    floorButtonUp.setAttribute("id", `button-up-${floor}`);
    let buttonUpIcon = document.createElement("i");
    buttonUpIcon.classList.add("fas", "fa-arrow-up");
    floorButtonUp.addEventListener("click", () => {
      for (let lift of lifts) {
        if (!lift.busy) {
          moveLift(lift, floor);
          break;
        }
      }
    });
    floorButtonUp.appendChild(buttonUpIcon);

    let floorButtonDown = document.createElement("button");
    floorButtonDown.classList.add("button-down");
    floorButtonDown.setAttribute("id", `button-down-${floor}`);
    let buttonDownIcon = document.createElement("i");
    buttonDownIcon.classList.add("fas", "fa-arrow-down");
    floorButtonDown.addEventListener("click", () => {
      for (let lift of lifts) {
        if (!lift.busy) {
          moveLift(lift, floor);
          break;
        }
      }
    });
    floorButtonDown.appendChild(buttonDownIcon);

    if (floor == floorCounts) {
      floorButton.appendChild(floorButtonDown);
    } else if (floor == 1) {
      floorButton.appendChild(floorButtonUp);
    } else {
      floorButton.appendChild(floorButtonUp);
      floorButton.appendChild(floorButtonDown);
    }

    floorController.appendChild(floorNumber);
    floorController.appendChild(floorButton);

    floorsContainer.appendChild(floorContainer);
  }

  let firstFloor = document.querySelector("#floor-1");
  let liftsContainer = document.createElement("div");
  liftsContainer.classList.add("lifts");

  for (let lift = 0; lift < liftCounts; lift++) {
    let liftContainer = document.createElement("div");
    liftContainer.classList.add("lift");
    liftContainer.setAttribute("id", `lift-${lift + 1}`);

    let leftDoor = document.createElement("div");
    leftDoor.classList.add("left-door");

    let rightDoor = document.createElement("div");
    rightDoor.classList.add("right-door");

    liftContainer.appendChild(leftDoor);
    liftContainer.appendChild(rightDoor);

    liftsContainer.appendChild(liftContainer);
    lifts.push(new Lift(lift + 1));
  }
  firstFloor.appendChild(liftsContainer);
}

createFloorsAndLifts();

function moveLift(lift, floor) {
  lift.busy = true;
  let time = Math.abs(lift.currentFloor - floor) * 2000;

  let liftContainer = document.querySelector(`#lift-${lift.id}`);
  liftContainer.style.transition = `all ${time}ms ease-in-out`;
  liftContainer.style.transform = `translateY(-${(floor - 1) * 170}px)`;

  setTimeout(() => {
    openDoors(lift);
    setTimeout(() => {
      closeDoors(lift);
      lift.busy = false;
      lift.currentFloor = floor;
    }, DOOR_CLOSE_TIME);
  }, DOOR_OPEN_TIME + time);
}

function openDoors(lift) {
  let liftContainer = document.querySelector(`#lift-${lift.id}`);
  let leftDoor = liftContainer.querySelector(".left-door");
  let rightDoor = liftContainer.querySelector(".right-door");

  leftDoor.style.transform = "translateX(-100%)";
  rightDoor.style.transform = "translateX(100%)";
}

function closeDoors(lift) {
  let liftContainer = document.querySelector(`#lift-${lift.id}`);
  let leftDoor = liftContainer.querySelector(".left-door");
  let rightDoor = liftContainer.querySelector(".right-door");

  leftDoor.style.transform = "translateX(0)";
  rightDoor.style.transform = "translateX(0)";
}
