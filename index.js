"use strict";


// Scroll problem
// Scroll problem
// Scroll problem
window.addEventListener('scroll', () => {
  localStorage.scrollX = window.scrollX;
  localStorage.scrollY = window.scrollY;
})

window.addEventListener('load', () => {
  window.scrollTo(localStorage.scrollX || 0, localStorage.scrollY || 0);
})

window.onunload = () => {
  localStorage.clear();
};



// Constants
// Constants
// Constants
const sideMenuElem = document.querySelector('.side_menu');
const menuBarsElem = document.querySelector('.menu-bars');
const pageElem = document.querySelector('.page');
const navElem = document.querySelector('nav');
const headerElem = document.querySelector('header');
const placeholderElem = document.querySelector('.placeholder');
const mainSectionElem = document.querySelector('.main');
const mainElem = document.querySelector('main');
const clientsElem = document.querySelector('.clients');
const footerElem = document.querySelector('footer');
const repliesElem = document.querySelector('.replies');
const statisticsElem = document.querySelector('.statistics');



// Appear animation
// Appear animation
// Appear animation
const APPEAR_ANIMATION_START = 0.8;
let offsetAnimation = window.innerHeight * APPEAR_ANIMATION_START;

let mainAnimated = false;
let clientsAnimated = false;
let featuresAnimated = false;
let designAnimated = false;
let repliesAnimated = false;
let statisticsAnimated = false;
let questionsAnimated = false;

function appearAnimation() {
  offsetAnimation = window.innerHeight * APPEAR_ANIMATION_START;
  if (!mainAnimated && window.scrollY >= mainElem.offsetTop - offsetAnimation) {
    mainElem.classList.add('animated');
    mainElem.classList.remove('to_animate');
    mainAnimated = true;
  }
  if (!clientsAnimated && window.scrollY >= clientsElem.offsetTop - offsetAnimation) {
    clientsElem.classList.add('animated');
    clientsElem.classList.remove('to_animate');
    clientsAnimated = true;
  }
  if (!featuresAnimated && window.scrollY >= featuresElem.offsetTop - offsetAnimation) {
    featuresElem.classList.add('animated');
    featuresElem.classList.remove('to_animate');
    featuresAnimated = true;
  }
  if (!designAnimated && window.scrollY >= designElem.offsetTop - offsetAnimation) {
    designElem.classList.add('animated');
    designElem.classList.remove('to_animate');
    designAnimated = true;
  }
  if (!repliesAnimated && window.scrollY >= repliesElem.offsetTop - offsetAnimation) {
    repliesElem.classList.add('animated');
    repliesElem.classList.remove('to_animate');
    repliesAnimated = true;
  }
  if (!statisticsAnimated && window.scrollY >= statisticsElem.offsetTop - offsetAnimation) {
    statisticsElem.classList.add('animated');
    statisticsElem.classList.remove('to_animate');
    statisticsAnimated = true;
  }
  if (!questionsAnimated && window.scrollY >= questionsElem.offsetTop - offsetAnimation) {
    questionsElem.classList.add('animated');
    questionsElem.classList.remove('to_animate');
    questionsAnimated = true;
  }
}

window.addEventListener('load', appearAnimation);
window.addEventListener('scroll', appearAnimation);


// Navbar
// Navbar
// Navbar
function sideMenuToggle() {
  sideMenuElem.classList.toggle('active');
  menuBarsElem.classList.toggle('active');
  pageElem.classList.toggle('active');
  footerElem.classList.toggle('active');
  if (headerElem.classList.contains('fixed')) {
    headerElem.classList.toggle('active');
  }
}

function closeSideMenu() {
  sideMenuElem.classList.remove('active');
  menuBarsElem.classList.remove('active');
  pageElem.classList.remove('active');
  footerElem.classList.remove('active');
  if (headerElem.classList.contains('fixed')) {
    headerElem.classList.remove('active');
  }
}

const homeElem = document.getElementById('home');
const featuresElem = document.getElementById('features');
const designElem = document.getElementById('design');
const testimoniesElem = document.getElementById('testimonies');
const questionsElem = document.getElementById('questions');

function goToSection() {
  const endpoints = [
    homeElem,
    featuresElem,
    designElem,
    testimoniesElem,
    questionsElem
  ];
  let endpoint;
  for (let elem of endpoints) {
    if (elem.id === this.attributes.href.textContent.slice(1)) {
      endpoint = elem;
      break;
    }
  }
  window.scrollTo({
    top: endpoint.offsetTop,
    left: 0,
    behavior: 'smooth'
  });
}

navElem.addEventListener('click', sideMenuToggle);
for (let item of sideMenuElem.querySelectorAll('a')) {
  item.addEventListener('click', function(event) {
    event.preventDefault();
  });
  item.addEventListener('click', closeSideMenu);
  item.addEventListener('click', goToSection.bind(item));
}



// Header
// Header
// Header
function headerDisplay() {
  if (scrollY >= mainElem.offsetTop + 400) {
    if (mainSectionElem.children[1] === headerElem) {
      mainSectionElem.removeChild(headerElem);
    }
    if (!(document.body.children[1] === headerElem)) {
      document.body.insertBefore(headerElem, document.body.children[1])
    }
    headerElem.classList.add('fixed');
    sideMenuElem.classList.add('fixed');
    placeholderElem.classList.add('showed');
  } else {
    if (document.body.children[1] === headerElem) {
      document.body.removeChild(headerElem);
    }
    if (!(mainSectionElem.children[1] === headerElem)) {
      mainSectionElem.insertBefore(headerElem, mainSectionElem.children[1])
    }
    headerElem.classList.remove('fixed');
    sideMenuElem.classList.remove('fixed');
    placeholderElem.classList.remove('showed');
  }

  if (scrollY >= clientsElem.offsetTop + headerElem.offsetHeight) {
    headerElem.classList.add('showed');
  } else {
    headerElem.classList.remove('showed');
  }
}

function closeSideMenuOnScroll() {
  if (scrollY < clientsElem.offsetTop) {
    return;
  }
  sideMenuElem.classList.remove('active');
  menuBarsElem.classList.remove('active');
  pageElem.classList.remove('active');
  footerElem.classList.remove('active');
  headerElem.classList.remove('active');
}

document.addEventListener('scroll', headerDisplay);
document.addEventListener('scroll', closeSideMenuOnScroll);



// Replies
// Replies
// Replies
const contentContainerElem = document.querySelector('.replies .content_container');
const arrowLeftElem = document.querySelector('.replies .arrow.left');
const arrowRightElem = document.querySelector('.replies .arrow.right');
const circleMenuElem = document.querySelector('.replies .replies_menu');
const REPLIES_ANIMATION_DURATION = 500;

// Main switch implementation
function switchReplies(toRight = true, initialPosX = 0, animFunc = 'cubic-bezier(0.39, 0.58, 0.5, 1)') {
  let tempReply = contentContainerElem.children[toRight ? 1 : 3];
  contentContainerElem.children[2].classList.remove('active');
  contentContainerElem.children[toRight ? 3 : 1].classList.add('active');
  contentContainerElem.removeChild(tempReply);
  contentContainerElem.insertBefore(tempReply, contentContainerElem.children[toRight ? 3 : 1]);
  for (let item of contentContainerElem.querySelectorAll('.item')) {
    item.animate([{
      transform: `translateX(${toRight ? initialPosX + 'px' : `calc(-200% ${initialPosX >= 0 ? '+ '+initialPosX : initialPosX}px)`})`
    }, {
      transform: 'translateX(-100%)'
    }], {
      duration: animFunc !== 'cubic-bezier(0.39, 0.58, 0.5, 1)' ? REPLIES_ANIMATION_DURATION / 2 : REPLIES_ANIMATION_DURATION,
      easing: animFunc
    });
  }
}

// Auto switch implementation
let switchInterval;

function suspendIntervalSwitching(func, ...rest) {
  return function() {
    clearInterval(switchInterval);
    if (rest) {
      func(rest[0]);
    } else {
      func();
    }
    switchInterval = setInterval(switchReplies, 3e3);
  }
}

let switched = false;
window.addEventListener('scroll', () => {
  if (window.scrollY >= contentContainerElem.parentElement.offsetTop - offsetAnimation && !switched) {
    switchInterval = setInterval(switchReplies, 5e3);
    switched = true;
  }
});

// Changing color of the circles on changing items
function circleMenuActivation() {
  for (let circle of circleMenuElem.children) {
    circle.classList.remove('active');
  }
  circleMenuElem.querySelector('#circle' + document.querySelector('.replies .item.active').id.slice(5)).classList.add('active');
}

circleMenuActivation();

var observer = new MutationObserver(function() {
  circleMenuActivation();
});

observer.observe(contentContainerElem, {
  childList: true,
});

// Circles controllable implementation
function circleMenuSwitch() {
  let idNumber = +this.id.slice(6);
  let idDifference = +document.querySelector('.replies .item.active').id.slice(5) - idNumber;
  let toRight = idDifference < 0 ? true : false;
  if (Math.abs(idDifference) > 1) {
    switchReplies(toRight, 0, 'ease-in');
    let inv = setInterval(() => {
      switchReplies(toRight, 0, 'ease-out');
      clearInterval(inv);
    }, REPLIES_ANIMATION_DURATION / 2);
  } else if (Math.abs(idDifference) === 1) {
    switchReplies(toRight);
  }
}

for (let circleContainerElem of circleMenuElem.children) {
  circleContainerElem.addEventListener('click',
    suspendIntervalSwitching(circleMenuSwitch.bind(circleContainerElem)));
}

// Make arrows controllable
arrowLeftElem.addEventListener('click', suspendIntervalSwitching(switchReplies, false));
arrowRightElem.addEventListener('click', suspendIntervalSwitching(switchReplies));

// Drag controllable implementation
function dragX(element) {
  function dragMouseDown(e) {
    clearInterval(switchInterval);
    e = e || window.event;
    e.preventDefault();
    posX = e.clientX;
    element.style.cursor = 'grab';
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    newPosX = e.clientX - posX;
    for (let child of element.parentElement.querySelectorAll('.item')) {
      child.style.transform = `translateX(-100%) translateX(${newPosX}px)`;
    }
    if (newPosX < -150) {
      switchReplies(true, newPosX);
      closeDragElement();
    } else if (newPosX > 150) {
      switchReplies(false, newPosX);
      closeDragElement();
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    element.style.cursor = 'default';
    for (let child of element.parentElement.querySelectorAll('.item')) {
      child.style.transform = `translateX(-100%)`;
    }
    switchInterval = setInterval(switchReplies, 3e3);
  }
  let posX = 0,
    newPosX = 0;
  element.addEventListener('mousedown', dragMouseDown);
}

for (let item of contentContainerElem.querySelectorAll('.item')) {
  dragX(item);
}



// Statistics
// Statistics
// Statistics
const statisticsElems = document.querySelectorAll('.statistics .container div');
let statsShown = false;

function animatedCounter(value) {
  let text = this.querySelector('p:first-child');
  let counter = 0;
  let timeout = 5000 / value;
  let addedValue = 1;
  if (value > 5000) {
    timeout = 100;
    // Tried to create a formula, but it didn't work out
    addedValue = Math.round(Math.pow(value / 1300, 2));
  }
  let inv = setInterval(() => {
    if (counter < value) {
      counter += addedValue;
      text.innerHTML = counter;
    } else {
      text.innerHTML = value;
      clearInterval(inv);
    }
  }, timeout);
}

function statsShow() {
  if (scrollY > statisticsElems[0].parentElement.offsetTop - offsetAnimation && !statsShown) {
    statisticsElems.forEach((item, i) => {
      animatedCounter.call(item, Number(item.firstElementChild.innerHTML))
    });
    statsShown = true;
  }
}

window.addEventListener('scroll', statsShow);



// Questions
// Questions
// Questions

// TODO: animated resizing

function preventDefault(event) {
  event.preventDefault();
}

const keys = {
  37: 1,
  38: 1,
  39: 1,
  40: 1
};

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

let supportsPassive = false;
try {
  window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  }));
} catch (e) {}
let wheelOpt = supportsPassive ? {
  passive: false
} : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

const questionContainerElems = document.querySelectorAll('.question_container');

function questionShow() {
  if (!this.classList.contains('active')) {
    for (let item of questionContainerElems) {
      item.classList.remove('active');
    }
    this.classList.add('active');
    window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.addEventListener(wheelEvent, preventDefault, wheelOpt);
    window.addEventListener('touchmove', preventDefault, wheelOpt);
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    new Promise(r => {
      let interval = setInterval(() => {
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.scrollTo({
          top: this.offsetTop - headerElem.offsetHeight - 10,
          left: 0,
          behavior: 'smooth'
        });
        clearInterval(interval);
        interval = setInterval(() => {
          clearInterval(interval);
          r();
        }, 300);
      }, 300);
    }).then(() => {
      window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
      window.removeEventListener('touchmove', preventDefault, wheelOpt);
      window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    });
  } else {
    this.classList.remove('active');
  }
}

questionContainerElems.forEach((item, i, arr) => {
  item.querySelector('.question_block').addEventListener('click', questionShow.bind(item))
});
