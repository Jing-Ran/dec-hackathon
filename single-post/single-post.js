var readmore = document.querySelector(".jt-article-preview__more");

var gotoBtn = document.querySelector(".jt-article-preview__goto");

var compress = document.querySelector(".jt-article-preview__btn-compress");

var close = document.querySelector(".jt-article-preview__btn-close");

var content = document.querySelector(".jt-article-preview__content");
var contentWrap = document.querySelector(".jt-article-preview__content-wrap");
var blurbContainer = document.querySelector('.jt-article-preview');
var bgContainer = document.querySelectorAll('.bg-content-wrap')[1];
var bg = document.querySelectorAll('.bg-background-image')[1];

var header = document.querySelector('header');
var footer = document.querySelector('footer');

addExpandClickHandler(readmore);

function addExpandClickHandler(button) {
  button.addEventListener('click', function() {
    expandArticle()
  });
}

addCompressClickHandler(compress);

function addCompressClickHandler(button) {;
  button.addEventListener('click', function() {
    closeArticle();
  })
}

addCloseClickHandler(close);

function addCloseClickHandler(button) {
  button.addEventListener('click', function() {
    closeArticle();
  })
}


function hideRest(index) {
  TweenMax.to(header, 0.2, {
    opacity: 0,
  })
  TweenMax.to(footer, 0.2, {
    opacity: 0,
  })
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

  var bgTop = bg.getBoundingClientRect().top;

  TweenMax.to(bg, 1, {
    top: -bgTop - 150,
    ease: Expo.easeOut,
  });

  //Bring selected article to front
  TweenMax.set(blurbContainer, {
    css: {
      'z-index': '300',
    }
  });

  var contentTop = contentWrap.getBoundingClientRect().top;
  //Bring content up a bit
  TweenMax.to(bgContainer, 1, {
    top: 100 - contentTop,
    ease: Expo.easeOut,
  });

  //Expand content
  content.style.height = "auto";

  TweenMax.from(content, 0.7, {
    height: 350,
    ease: Expo.easeOut,
    delay: 0.3,
  });

  //Hide readmore button
  TweenMax.to(readmore, 0.2, {
    css: {
      opacity: 0
    }
  });
  setTimeout(function() {
    readmore.style.visibility = 'hidden';
  }, 500);

  TweenMax.to(gotoBtn, 0.2, {
    css: {
      opacity: 0
    }
  });
  setTimeout(function() {
    gotoBtn.style.visibility = 'hidden';
  }, 500);

  //Reveal close article button
  TweenMax.to(close, 0.5, {
    css: {
      opacity: 1
    }
  });

  //Add limit to scroll
  scrollTopPos = window.scrollY;
  setTimeout(function() {scrollBottomPos = scrollTopPos + content.getBoundingClientRect().height - window.innerHeight + 300}, 1000);
  setTimeout(function() {timer = true}, 1000);

  document.addEventListener("scroll", limitScroll);
}


function closeArticle(index) {
  //Hide all other elements
  displayAll();

  // Scale background image
  TweenMax.to(bg, 0.8, {
    // scale: 1,
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
  TweenMax.to(bgContainer, 0.8, {
    top: 0,
    ease: Expo.easeOut
  });

  //Compress content
  TweenMax.to(content, 0.5, {
    height: 350,
    ease: Expo.easeOut
  });

  //Show readmore button
  TweenMax.to(readmore, 0.5, {
    css: {
      opacity: 1
    }
  });
  readmore.style.visibility = 'visible';

  TweenMax.to(gotoBtn, 0.5, {
    css: {
      opacity: 1
    }
  });
  gotoBtn.style.visibility = 'visible';

  //Hide compress article button
  compress.style.display = 'none';
  //Hide close article button
  TweenMax.to(close, 0.5, {
    css: {
      opacity: 0
    }
  });

  //Remove limit on scroll
  document.removeEventListener("scroll", limitScroll);
}


//Set padding for fullwidth image


function setFullwidthPadding() {
  var fullwidthHeight = document.querySelector('.fullwidth-image-position').getBoundingClientRect().height + 50;
  var fullwidthPaddingElement = document.querySelector('.fullwidth-image-bottom-padding');
  fullwidthPaddingElement.style.padding = '0 0 ' + Math.floor(fullwidthHeight) + 'px 0';
}

setFullwidthPadding();

window.addEventListener('resize', function() {
  setFullwidthPadding();
})