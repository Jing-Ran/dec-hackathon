var backTopBtn = document.getElementById("jr-back-top");
var backTopTimer;

function backToTop() {
  // document.documentElement for FireFox
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    window.scrollBy(0, -40);
    backTopTimer = window.setTimeout('backToTop()', 10);
  } else {
    window.clearTimeout(backTopTimer);
  }
  return false;
}

function fadeInOut() {
  // scrollTop is equal to or greater than 200px
  if (document.body.scrollTop >= 200 || document.documentElement.scrollTop >= 200) {
    backTopBtn.style.visibility = 'visible';
    backTopBtn.className = 'jr-fade-in';
  } else { // scrollTop is less than 200px
    backTopBtn.className = 'jr-fade-out';
  }
}


backTopBtn.onclick = function () {
  backToTop();
  return false; // prevent browser default behaviors
};

window.onscroll = function () {
  fadeInOut();
  return false; // prevent browser default behaviors
};