import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import storeState from '.src/js/plantPower.js';
// import stateControl from './js/plantPower.js';
// import changeState from './js/plantPower.js';


// business logic

// This function stores our state.
const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};

const stateControl = storeState();

// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.
const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    });
  };
};

// We create four functions using our function factory. We could easily create many more.
const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);
const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);
const directSun = changeState("sun")(5);
const shadedArea = changeState("sun")(1);
const bugs = changeState("bug")(3);

// UI logic

window.addEventListener("load", function () {

  let stateArr = [];

  // This function has side effects because we are manipulating the DOM. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.
  document.getElementById('feed').onclick = function () {
    const x = document.querySelectorAll('#soil-value');
    for (var i = 0; i < x.length; i++) {
      const newState = stateArr[i](blueFood);
      x[i].innerText = `Soil: ${newState.soil}`;
    }
  };

  document.getElementById('sun').onclick = function () {
    const x = document.querySelectorAll('#sun-value');
    for (var i = 0; i < x.length; i++) {
      const newState = stateArr[i](directSun);
      x[i].innerText = `Sun: ${newState.sun}`;
    }
  };

  document.getElementById('bug').onclick = function () {
    const x = document.querySelectorAll('#bug-value');
    for (var i = 0; i < x.length; i++) {
      const newState = stateArr[i](bugs);
      x[i].innerText = `Food: ${newState.bug}`;
    }
  };

  document.getElementById('water').onclick = function () {
    const x = document.querySelectorAll(`#water-value`)
    for (var i = 0; i < x.length; i++) {
      const newState = stateArr[i](superWater); // we reference the specific iteration of storeState in the array by using the index value which corresponds to the index value of the element collection from in the DOM. The way we reference a function in an array is arr.[position](argument).
      x[i].innerText = `Water: ${newState.water}`;
    }
  };
  const baseValues = (name)=> {
    return (`<h1>Your ${name || "plant"}'s Values:</h1>
    <h3><div id="soil-value">0</div></h3>
    <h3><div id="water-value">0</div></h3>`);
  };

  document.getElementById('new-plant').onclick = function () {
    let x = document.createElement("p");
    x.innerHTML = baseValues();
    stateArr.push(storeState()); // upon creation of a new plant html element, push a new iteration of storeState to the array. While each element in the array is named the same and does the same thing, javascript is tracking which one is matched to which plant. In this way, javascript will be able to independently track each plant whenever we click the feed or water buttons. We do not need to reference the DOM to check the current state, we are able to have javascript track it for us.
    document.querySelector('body').append(x);
  };

  document.getElementById('sun-plant').onclick = function () {
    let x = document.createElement("p");
    x.innerHTML = baseValues("Sunflower") + `<h3><div id="sun-value">0</div></h3>`;
    stateArr.push(storeState()); 
    document.querySelector('body').append(x);
  };

  document.getElementById('fly-trap').onclick = function () {
    let x = document.createElement("p");
    x.innerHTML = `<h1>Your Venus Fly Trap's Values:</h1>
    <h3><div id="bug-value">0</div></h3>` + baseValues();
    stateArr.push(storeState()); 
    document.querySelector('body').append(x);
  };
  
  // This function doesn't actually do anything useful in this application — it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.
  document.getElementById('show-state').onclick = function () {
    // We just need to call stateControl() without arguments to see our current state.
    const currentState = stateControl(); // in order to use this for every plant, we would need to update this block to use a loop which will get the state of each plant from the state array and then update each plant on the page accordingly. Currently it only checks and updates one plant (the first);
    document.getElementById('soil-value').innerText = `Soil: ${currentState.soil}`;
    document.getElementById('water-value').innerText = `Water: ${currentState.water}`;
  };
});



{/* <h1>Your Plant's Values</h1>
<h3><div id="soil-value" name="soil-value" >0</div></h3>
<h3><div id="water-value">0</div></h3> */}