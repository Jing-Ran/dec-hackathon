var qrBtns = document.querySelectorAll(".jt-article-preview__more");
var closeBtns = document.querySelectorAll(".jt-article-preview__btn-close");
var backTopBtn = document.getElementById("jr-back-top");
var backTopTimer;
var ceiling = 0;


for (var i = 0; i < qrBtns.length; i++) {
  qrBtns[i].addEventListener('click', function () {
    expandQR();
  });
}

for (var k = 0; k < closeBtns.length; k++) {
  closeBtns[k].addEventListener('click', function() {
    closeQR();
  });
}


function expandQR() {
  ceiling = window.scrollY;
  console.log("scrollTopPos " + ceiling);

  fadeInOut();
}

function closeQR() {
  ceiling = 0;
  fadeInOut();
  console.log('call fadeinout in close');
}


function backToTop() {
  // document.documentElement for FireFox
  console.log('scroll to position in backtotop ' + ceiling);
  if (document.body.scrollTop > ceiling || document.documentElement.scrollTop > ceiling) {
    console.log("back to top" + document.body.scrollTop);
    window.scrollBy(0, -40);
    backTopTimer = window.setTimeout('backToTop()', 10);
  } else {
    window.clearTimeout(backTopTimer);
  }
  return false;
}

function fadeInOut() {
  // scrollTop is equal to or greater than 200px
  if (document.body.scrollTop >= ceiling + 200 || document.documentElement.scrollTop >= ceiling + 200) {
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