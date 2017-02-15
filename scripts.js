const nav = document.querySelector('#menu');
const topOfNav = nav.offsetTop;
const links = document.querySelectorAll('a[data-number]');
const maxLinks = links.length;
const contents = document.querySelectorAll('.content');

function fixNav(){
  if(window.scrollY >= topOfNav) {
    document.body.classList.add('fixed-nav');
    document.body.style.paddingTop = `${nav.offsetHeight}px`;
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}

function clickLink(e){
  e.preventDefault();
  contentNumber = parseInt(this.dataset.number);
  const activeContent = document.querySelector(`.content-${contentNumber}`);
  currentClassList = Array.from(activeContent.classList);
  if (!currentClassList.includes('off-left')) return // do nothing if current link is clicked
  scrollToTop();
  const offLeft = range(maxLinks + 1);
  offLeft.forEach(number => sendToLeft(number));
  activeContent.classList.remove('off-left');
  activeContent.classList.remove('off-right');
  links.forEach(link => link.classList.remove('active'));
  this.classList.add('active');
}

function sendToLeft(number) {
  const inactiveContent = document.querySelector(`.content-${number}`);
  inactiveContent.classList.add(`off-left`);
}

function range(start, edge, step) {
  // If only one number was passed in make it the edge and 0 the start.
  if (arguments.length == 1) {
    edge = start;
    start = 1;
  }

  // Validate the edge and step numbers.
  edge = edge || 1;
  step = step || 1;

  // Create the array of numbers, stopping before the edge.
  for (var ret = []; (edge - start) * step > 0; start += step) {
    ret.push(start);
  }
  return ret;
}

var timeOut;
function scrollToTop() {
  if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
    window.scrollBy(0,-100);
    timeOut=setTimeout('scrollToTop()',2);
  }
  else clearTimeout(timeOut);
}

window.addEventListener('scroll', fixNav);
links.forEach(link => link.addEventListener('click', clickLink));

// Menu click should
// 1. Stop default event
// 2. Translate X off left or right
// 3. Set display none
// 4. Set display on
// 5. Translate X back to 0
