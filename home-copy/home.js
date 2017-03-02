var readmore = document.querySelectorAll(".jt-article-preview__more");
var readMoreArray = [].slice.call(readmore);

var gotoBtn = document.querySelectorAll(".jt-article-preview__goto");

var compress = document.querySelectorAll(".jt-article-preview__btn-compress");
var compressArray = [].slice.call(compress);

var close = document.querySelectorAll(".jt-article-preview__btn-close");
var closeArray = [].slice.call(close);

var content = document.querySelectorAll(".jt-article-preview__content");
var contentWrap = document.querySelectorAll(".jt-article-preview__content-wrap");
var blurbContainer = document.querySelectorAll('.jt-article-preview');
var bg = document.querySelectorAll('.jt-article-preview__bg-wrap');
var pagination = document.querySelector('.jt-pagination');

var header = document.querySelector('header');
var footer = document.querySelector('footer');
var search = document.querySelector('.search-wrap');

for (var i = 0; i < readmore.length; i++) {
  addExpandClickHandler(readmore[i]);
}

function addExpandClickHandler(button) {
  //Get the index of the current button
  var index = readMoreArray.indexOf(button);

  button.addEventListener('click', function() {
    expandArticle(index)
  });
}

for (var j = 0; j < compress.length; j++) {
  addCompressClickHandler(compress[j]);
}

function addCompressClickHandler(button) {
  //Get the index of the current button
  var index = compressArray.indexOf(button);

  button.addEventListener('click', function() {
    closeArticle(index);
  })
}

for (var k = 0; k < close.length; k++) {
  addCloseClickHandler(close[k]);
}

function addCloseClickHandler(button) {
  //Get the index of the current button
  var index = closeArray.indexOf(button);

  button.addEventListener('click', function() {
    closeArticle(index);
  })
}


function hideRest(index) {
  TweenMax.to(header, 0.2, {
    opacity: 0,
  })
  TweenMax.to(footer, 0.2, {
    opacity: 0,
  })
  TweenMax.to(search, 0.2, {
    opacity: 0,
  })
  TweenMax.to(pagination, 0.2, {
    opacity: 0,
  })

  for (var i = 0; i < readMoreArray.length; i++) {
    if (index !== i) {
      TweenMax.to(blurbContainer[i], 0.2, {
        opacity: 0,
      })
    }
  }
}

function displayAll(index) {

  TweenMax.to(header, 0.2, {
    opacity: 1,
    delay: 0.5
  })
  TweenMax.to(footer, 0.2, {
    opacity: 1,
    delay: 0.5
  })
  TweenMax.to(search, 0.2, {
    opacity: 1,
    delay: 0.5
  })
  TweenMax.to(pagination, 0.2, {
    opacity: 1,
    delay: 0.5
  })

  for (var i = 0; i < readMoreArray.length; i++) {
    if (index !== i) {
      TweenMax.to(blurbContainer[i], 0.2, {
        opacity: 1,
        delay: 0.5
      })
    }
  }
}

var scrollTopPos = 0;
var scrollBottomPos = 0;
var timer = false;

function limitScroll() {
  if (window.scrollY < scrollTopPos) {
    window.scrollTo(0, scrollTopPos);
  }
  else if (window.scrollY > scrollBottomPos && timer === true) {
    window.scrollTo(0, scrollBottomPos);
  }
}

function expandArticle(index) {
  //Hide all other elements
  hideRest(index);
  //reset timer
  timer = false;

  var bgTop = bg[index].getBoundingClientRect().top;
  //Scale background image
  TweenMax.set(bg[index], {
    transformOrigin: "50% 50% 0",
    scale: 1
  });

  TweenMax.to(bg[index], 1, {
    scale: 1.26,
    top: -bgTop - 150,
    ease: Expo.easeOut,
  });

  //Bring selected article to front
  TweenMax.set(blurbContainer[index], {
    css: {
      'z-index': '300',
    }
  });

  var contentTop = contentWrap[index].getBoundingClientRect().top;
  //Bring content up a bit
  TweenMax.to(contentWrap[index], 1, {
    top: 100 - contentTop,
    ease: Expo.easeOut,
  });

  //Expand content
  content[index].style.height = "auto";

  TweenMax.from(content[index], 0.7, {
    height: 350,
    ease: Expo.easeOut,
    delay: 0.3,
  });

  //Hide readmore button
  TweenMax.to(readmore[index], 0.2, {
    css: {
      opacity: 0
    }
  });
  setTimeout(function() {
    readmore[index].style.visibility = 'hidden';
  }, 500);

  TweenMax.to(gotoBtn[index], 0.2, {
    css: {
      opacity: 0
    }
  });
  setTimeout(function() {
    gotoBtn[index].style.visibility = 'hidden';
  }, 500);

  //Reveal close article button
  TweenMax.to(close[index], 0.5, {
    css: {
      opacity: 1
    }
  });

  //Add limit to scroll
  scrollTopPos = window.scrollY;
  setTimeout(function() {scrollBottomPos = scrollTopPos + content[index].getBoundingClientRect().height - window.innerHeight + 300}, 1000);
  setTimeout(function() {timer = true}, 1000);

  document.addEventListener("scroll", limitScroll);

  //JR: add code for back-to-top btn
  fadeInOut();
}


function closeArticle(index) {
  //Hide all other elements
  displayAll(index);

  //Scale background image
  TweenMax.to(bg[index], 0.8, {
    scale: 1,
    top: 0,
    ease: Expo.easeOut
  });

  //Reset z-index
  TweenMax.set(blurbContainer, {
    css: {
      'z-index': '0'
    }
  });

  //Bring content down a bit
  TweenMax.to(contentWrap[index], 0.8, {
    top: 0,
    ease: Expo.easeOut
  });

  //Compress content
  TweenMax.to(content[index], 0.5, {
    height: 354,
    ease: Expo.easeOut
  });

  //Show readmore button
  TweenMax.to(readmore[index], 0.5, {
    css: {
      opacity: 1
    }
  });
  readmore[index].style.visibility = 'visible';

  TweenMax.to(gotoBtn[index], 0.5, {
    css: {
      opacity: 1
    }
  });
  gotoBtn[index].style.visibility = 'visible';

  //Hide compress article button
  compress[index].style.display = 'none';
  //Hide close article button
  TweenMax.to(close[index], 0.5, {
    css: {
      opacity: 0
    }
  });

  //Remove limit on scroll
  document.removeEventListener("scroll", limitScroll);

  //JR: add code for back-to-top btn
  scrollTopPos = 0;
  fadeInOut();
}


// JR - Back-to-top for pages have "quick read"
var backTopBtn = document.getElementById("jr-back-top");
var backTopTimer;

function backToTop() {
  console.log("enter back to top");
  // document.documentElement for FireFox
  console.log('scroll to position in backtotop ' + scrollTopPos);
  if (document.body.scrollTop > scrollTopPos || document.documentElement.scrollTop > scrollTopPos) {
    window.scrollBy(0, -40);
    backTopTimer = window.setTimeout('backToTop()', 10);
  } else {
    window.clearTimeout(backTopTimer);
  }
  return false;
}

function fadeInOut() {
  // scrollTop is equal to or greater than 200px
  if (document.body.scrollTop >= scrollTopPos + 200 || document.documentElement.scrollTop >= scrollTopPos + 200) {
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